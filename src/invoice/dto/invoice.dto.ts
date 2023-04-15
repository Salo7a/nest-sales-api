import { IsString, IsNotEmpty, IsNumber, Min, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { InvoiceStatus } from '../enum/inovice.enum';
import { InvoiceItemDto } from './invoice-item.dto';

export class InvoiceDto {
  @Expose()
  @ApiProperty({
    description: 'Invoice id',
    example: 1,
  })
  @IsString()
  readonly id: number;

  @Expose()
  @ApiProperty({
    description: 'User id',
    example: 1,
  })
  @IsString()
  readonly userId: number;

  @Expose()
  @ApiProperty({
    description: 'Invoice status',
    example: InvoiceStatus.PLACED,
  })
  @Expose()
  @IsEnum(InvoiceStatus)
  readonly status: string;

  @Expose()
  @ApiProperty({
    description: 'Total price',
    example: 250,
  })
  readonly total: number;

  @Expose()
  @ApiProperty({
    description: 'Invoice placement date',
    type: Date,
  })
  readonly date: Date;

  @ApiProperty({
    description: 'Ordered items',
    type: [InvoiceItemDto],
  })
  @Expose()
  items?: InvoiceItemDto[] = [];
}
