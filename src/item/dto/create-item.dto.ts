import {
  IsString,
  Length,
  IsNotEmpty,
  Min,
  IsInt,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({
    description: "Item's Name",
    example: 'Mercedes',
  })
  @IsString({ message: 'Invalid name' })
  @IsNotEmpty()
  @Length(3, 30)
  readonly name: string;

  @ApiProperty({
    description: "Item's price",
    example: 5000,
  })
  @IsNumber()
  @Min(0)
  readonly price: number;

  @ApiProperty({
    description: 'Available stock',
    example: 5000,
  })
  @IsInt()
  @Min(0)
  readonly stock: number;
}
