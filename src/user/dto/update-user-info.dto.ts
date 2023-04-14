import { IsString, IsEmail, Length, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserInfoDto {
  @ApiProperty({
    description: "User's Full Name",
    example: 'John Doe',
  })
  @IsString({ message: 'Invalid name' })
  @Length(3, 30)
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: "User's Unique Email",
    example: 'test@example.com',
  })
  @Length(3, 55)
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;
}
