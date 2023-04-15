import { IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { InvoiceStatus } from '../enum/inovice.enum';

export class UpdateInvoiceDto {
  @ApiProperty({
    description: 'New invoice status',
    example: InvoiceStatus.CANCELLED,
  })
  @IsEnum(InvoiceStatus)
  @IsNotEmpty()
  readonly status: InvoiceStatus;
}
