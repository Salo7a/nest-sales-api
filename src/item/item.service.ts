import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Item } from './item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ItemMapper } from './mapper/ItemMapper';
import { Message } from '../common/response/message';
import { ItemDto } from './dto/item.dto';
import { isObjectEmpty } from '../common/helpers';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
    private itemMapper: ItemMapper,
  ) {}

  async findById(id: number): Promise<Item> {
    const item = await this.itemRepository.findOneBy({ id });
    if (!item) throw new NotFoundException('Item not found');
    return item;
  }

  async findAll(): Promise<Item[]> {
    const items = await this.itemRepository.find();
    return items;
  }

  async findAllByIds(itemsIds: number[]): Promise<Item[]> {
    const items = await this.itemRepository.findBy({ id: In(itemsIds) });
    return items;
  }

  async create(newItemData: CreateItemDto): Promise<Item> {
    const item = this.itemRepository.create(newItemData);
    return this.itemRepository.save(item);
  }

  async updateItem(id, updatedItemInfo: UpdateItemDto | CreateItemDto) {
    const item = await this.findById(id);
    if (isObjectEmpty(updatedItemInfo))
      throw new BadRequestException('Invalid request');
    return this.itemRepository.save(Object.assign(item, updatedItemInfo));
  }

  async updateAll(items: Item[]) {
    return await this.itemRepository.save(items);
  }

  async deleteById(id) {
    const item = await this.findById(id);
    await this.itemRepository.remove(item);
  }

  async getAllItems(): Promise<ItemDto[]> {
    const items = await this.findAll();
    return this.itemMapper.entitiesToDto(items);
  }

  async createItem(newItemData: CreateItemDto): Promise<Message<ItemDto>> {
    const item = await this.create(newItemData);
    return new Message(
      'Item added successfully',
      this.itemMapper.entityToDto(item),
    );
  }

  async patchItem(
    id: number,
    itemData: UpdateItemDto,
  ): Promise<Message<ItemDto>> {
    const item = await this.updateItem(id, itemData);
    return new Message(
      `Item #${id} was successfully updated`,
      this.itemMapper.entityToDto(item),
    );
  }

  async deleteItem(id: number): Promise<Message<void>> {
    try {
      await this.deleteById(id);
      return new Message(`Item #${id} was successfully deleted`);
    } catch (e) {
      if (e.status === 404) throw new NotFoundException('Item Not Found');
      throw new BadRequestException(
        'Cannot delete an item with existing invoices.',
      );
    }
  }

  async putItem(id, itemData: CreateItemDto): Promise<Message<ItemDto>> {
    const item = await this.updateItem(id, itemData);
    return new Message(
      `Item #${id} was fully updated successfully`,
      this.itemMapper.entityToDto(item),
    );
  }
}
