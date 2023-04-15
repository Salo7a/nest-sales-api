import {
  IsString,
  IsEmail,
  Length,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  ArrayMaxSize,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateInvoiceItemDto } from './create-invoice-item.dto';
import { Type } from 'class-transformer';

export class CreateInvoiceDto {
  @ApiProperty({
    description: 'An array of unique items and their quantities',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceItemDto)
  @IsNotEmpty()
  @IsArray()
  readonly items: CreateInvoiceItemDto[];
}
