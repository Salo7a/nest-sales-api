import { Mapper, Mappings } from 'ts-mapstruct';
import { InvoiceItemDto } from '../dto';
import { ItemToInvoice } from '../itemToInvoice.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
@Mapper()
export class InvoiceItemMapper {
  @Mappings(
    { target: 'id', source: 'invoiceItemEntity.itemId' },
    { target: 'name', expression: 'getItemName(invoiceItemEntity)' },
  )
  entityToDto(_invoiceItemEntity: ItemToInvoice): InvoiceItemDto {
    return new InvoiceItemDto();
  }

  entitiesToDto(invoiceEntity: ItemToInvoice[]): InvoiceItemDto[] {
    return invoiceEntity.map((invoiceItemDto) =>
      this.entityToDto(invoiceItemDto),
    );
  }

  getItemName(invoiceItemEntity: ItemToInvoice): string {
    const name = invoiceItemEntity.item?.name;
    if (!name) return 'Deleted';
    return name;
  }
}
