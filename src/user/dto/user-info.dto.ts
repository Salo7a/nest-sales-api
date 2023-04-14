import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../common/enum/role';
import { Expose } from 'class-transformer';

export class UserInfoDto {
  @Expose()
  @ApiProperty({
    description: "User's Id",
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @Expose()
  @ApiProperty({
    description: "User's Full Name",
    example: 'John Doe',
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @Expose()
  @ApiProperty({
    description: "User's Email",
    example: 'test@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @Expose()
  @IsNotEmpty()
  @IsEnum(Role)
  readonly role?: Role;
}
