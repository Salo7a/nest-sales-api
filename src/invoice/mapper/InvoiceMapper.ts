import { AfterMapping, Mapper, Mappings, MappingTarget } from 'ts-mapstruct';
import { InvoiceDto, InvoiceItemDto } from '../dto';
import { Invoice } from '../invoice.entity';
import { Injectable } from '@nestjs/common';
import { InvoiceItemMapper } from './InvoiceItemMapper';
import { ItemToInvoice } from '../itemToInvoice.entity';
import { isObjectEmpty } from '../../common/helpers';

@Injectable()
@Mapper()
export class InvoiceMapper {
  @Mappings(
    { target: 'date', source: 'invoiceEntity.createdAt' },
    { target: 'userId', source: 'invoiceEntity.userId' },
    {
      target: 'items',
      expression: 'mapInvoiceItems(invoiceEntity.itemToInvoice)',
    },
  )
  entityToDto(_invoiceEntity: Invoice): InvoiceDto {
    return new InvoiceDto();
  }

  entitiesToDto(invoiceEntity: Invoice[]): InvoiceDto[] {
    return invoiceEntity.map((invoiceDto) => this.entityToDto(invoiceDto));
  }

  mapInvoiceItems(invoiceItems: ItemToInvoice[]): InvoiceItemDto[] {
    const mapper = new InvoiceItemMapper();
    if (!invoiceItems) return [new InvoiceItemDto()];
    return mapper.entitiesToDto(invoiceItems);
  }

  @AfterMapping()
  removeEmptyItems(
    @MappingTarget(InvoiceDto) invoiceDto: InvoiceDto,
  ): InvoiceDto {
    if (isObjectEmpty(invoiceDto.items[0])) {
      delete invoiceDto.items;
    }
    return invoiceDto;
  }
}
