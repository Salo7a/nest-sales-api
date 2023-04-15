import {
  IsString,
  IsEmail,
  Length,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: "User's Full Name",
    example: 'John Doe',
  })
  @IsOptional()
  @IsString({ message: 'Invalid name' })
  @Length(3, 30)
  @IsNotEmpty()
  readonly name?: string;

  @ApiProperty({
    description: "User's Unique Email",
    example: 'test@example.com',
  })
  @IsOptional()
  @Length(3, 55)
  @IsEmail({}, { message: 'Invalid email' })
  readonly email?: string;

  @ApiProperty({
    description: "User's Password",
    example: 'password',
  })
  @IsOptional()
  @IsString()
  @Length(6, 30, { message: 'Password must be between 6 and 30 characters' })
  @IsNotEmpty()
  readonly password?: string;
}
