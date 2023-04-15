import { IsString, IsEmail, Length, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInvoiceItemDto {
  @ApiProperty({
    description: "Item's Id",
    example: 1,
  })
  @IsInt({ message: 'Invalid id' })
  @IsNotEmpty()
  readonly id: number;

  @ApiProperty({
    description: 'Quantity required of the item ',
    example: 2,
  })
  @IsInt({ message: 'Invalid quantity' })
  @IsNotEmpty()
  readonly quantity: number;
}
