import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ItemDto {
  @ApiProperty({
    description: "Item's id",
    example: 1,
  })
  @Expose()
  readonly id: number;

  @ApiProperty({
    description: "Item's name",
    example: 'Mercedes',
  })
  @Expose()
  readonly name: string;

  @ApiProperty({
    description: "Item's price",
    example: 'Mercedes',
  })
  @Expose()
  readonly price: number;

  @ApiProperty({
    description: 'Available stock',
    example: 5000,
  })
  @Expose()
  readonly stock: number;
}
