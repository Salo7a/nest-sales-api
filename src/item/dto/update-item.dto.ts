import {
  IsString,
  Length,
  IsNotEmpty,
  Min,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateItemDto {
  @ApiProperty({
    description: "Item's name",
    example: 'Mercedes',
  })
  @IsString({ message: 'Invalid name' })
  @IsNotEmpty()
  @Length(3, 30)
  @IsOptional()
  readonly name?: string;

  @ApiProperty({
    description: "Item's price",
    example: 5000,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  readonly price?: number;

  @ApiProperty({
    description: 'Available stock',
    example: 5000,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  readonly stock?: number;
}
