import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './invoice.entity';
import { ItemToInvoice } from './itemToInvoice.entity';
import { InvoiceMapper } from './mapper/InvoiceMapper';
import { InvoiceDto } from './dto';
import { Role } from '../common/enum/role';
import { InvoiceStatus } from './enum/inovice.enum';
import { Message } from '../common/response/message';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { ItemService } from '../item/item.service';
import { User } from '../user/user.entity';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(ItemToInvoice)
    private readonly itemToInvoiceRepository: Repository<ItemToInvoice>,
    private readonly itemService: ItemService,
    private readonly invoiceMapper: InvoiceMapper,
  ) {}

  async findById(id: number): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOne({
      where: { id },
      relations: {
        itemToInvoice: true,
        user: true,
      },
    });
    if (!invoice) throw new NotFoundException('Invoice not found');
    return invoice;
  }

  async findByUserId(id: number): Promise<Invoice[]> {
    const invoices = await this.invoiceRepository.findBy({ userId: id });
    return invoices;
  }

  async findAll(): Promise<InvoiceDto[]> {
    const invoices = await this.invoiceRepository.find({
      relations: {
        itemToInvoice: true,
        user: true,
      },
    });
    return this.invoiceMapper.entitiesToDto(invoices);
  }

  async create(
    user: User,
    totalPrice: number,
    invoiceItems: ItemToInvoice[],
  ): Promise<Invoice> {
    const invoice = new Invoice();
    invoice.user = user;
    invoice.total = totalPrice;
    const newInvoice = await this.invoiceRepository.save(invoice);
    invoiceItems.forEach((item) => (item.invoice = newInvoice));
    await this.itemToInvoiceRepository.save(invoiceItems);
    return newInvoice;
  }

  async getCurrentInvoices(id: number) {
    const invoices = await this.findByUserId(id);
    if (!invoices)
      throw new NotFoundException("The current user doesn't have any invoices");
    return this.invoiceMapper.entitiesToDto(invoices);
  }

  async getAllInvoices() {
    return await this.findAll();
  }

  async getInvoice(invoiceId, currentUser) {
    const invoice = await this.findById(invoiceId);
    if (invoice.userId !== currentUser.id && currentUser.role !== Role.ADMIN)
      throw new ForbiddenException("You're not allowed to view this invoice");
    return this.invoiceMapper.entityToDto(invoice);
  }

  async patchInvoiceStatus(invoiceId, currentUser, newStatus: InvoiceStatus) {
    const invoice = await this.findById(invoiceId);
    if (invoice.userId !== currentUser.id && currentUser.role !== Role.ADMIN)
      throw new ForbiddenException("You're not allowed to edit this invoice");
    // Conditions to determine if this update is valid
    // No one can update a canceled or delivered invoice
    if (
      invoice.status === InvoiceStatus.CANCELLED ||
      invoice.status === InvoiceStatus.DELIVERED
    ) {
      const errorMessage =
        newStatus === InvoiceStatus.CANCELLED
          ? `This invoice is already ${invoice.status}`
          : `You can't update a ${invoice.status} invoice to a different status`;
      throw new BadRequestException(errorMessage);
    }
    // Only an admin can set an invoice as delivered
    if (newStatus === InvoiceStatus.DELIVERED) {
      if (currentUser.role === Role.USER)
        throw new ForbiddenException(
          "A user can't set an invoice as delivered",
        );
    }
    invoice.status = newStatus;
    const newInvoice = await this.invoiceRepository.save(invoice);
    return new Message<InvoiceDto>(
      'Invoice status was successfully updated',
      this.invoiceMapper.entityToDto(invoice),
    );
  }

  async postInvoice(user, newInvoiceItems: CreateInvoiceDto) {
    // Sort by id
    const newItemsData = newInvoiceItems.items.sort((a, b) => a.id - b.id);

    // Get ids in a separate array
    const itemsIds = newItemsData.map((item) => item.id);

    // Check if duplicate items exist
    const uniqueItemsIds = Array.from(new Set(itemsIds));
    if (itemsIds.length !== uniqueItemsIds.length)
      throw new ForbiddenException(
        'Duplicate items found!, please remove all duplicates and try again.',
      );

    // Get Items
    const itemsEntities = await this.itemService.findAllByIds(uniqueItemsIds);

    if (itemsEntities.length !== newItemsData.length)
      throw new BadRequestException('Item(s) with incorrect ids where found');

    //  Calculate total  price and generate invoice
    let totalPrice = 0,
      itemTotalPrice = 0;
    const invoiceItems = [];
    for (let i = 0; i < itemsEntities.length; i++) {
      const requiredQuantity = newItemsData[i].quantity;
      const availableQuantity = itemsEntities[i].stock;
      if (requiredQuantity > availableQuantity)
        throw new BadRequestException(
          `Insufficient stock of item #${itemsEntities[i].id}`,
        );
      itemsEntities[i].stock = availableQuantity - requiredQuantity;
      itemTotalPrice = requiredQuantity * itemsEntities[i].price;
      totalPrice += itemTotalPrice;
      const newInvoiceItem = new ItemToInvoice();
      newInvoiceItem.item = itemsEntities[i];
      newInvoiceItem.totalPrice = itemTotalPrice;
      newInvoiceItem.quantity = requiredQuantity;
      invoiceItems.push(newInvoiceItem);
    }
    const invoice = await this.create(user, totalPrice, invoiceItems);
    await this.itemService.updateAll(itemsEntities);
    return this.invoiceMapper.entityToDto(invoice);
  }
}
