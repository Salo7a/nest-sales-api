import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class InvoiceItemDto {
  @Expose()
  @ApiProperty({
    description: 'Item id',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @Expose()
  @ApiProperty({
    description: 'Item Name',
    example: 'Item 1',
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @Expose()
  @ApiProperty({
    description: 'Ordered Quantity',
    example: 2,
  })
  @IsNotEmpty()
  @Min(0)
  readonly quantity: number;

  @ApiProperty({
    description: 'Total price',
    example: 2,
  })
  @Expose()
  @IsNotEmpty()
  readonly totalPrice: number;
}
