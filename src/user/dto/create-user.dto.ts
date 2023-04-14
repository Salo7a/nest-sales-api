import { IsString, IsEmail, Length, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: "User's Full Name",
    example: 'John Doe',
  })
  @IsString({ message: 'Invalid name' })
  @IsNotEmpty()
  @Length(3, 30)
  readonly name: string;

  @ApiProperty({
    description: "User's Unique Email",
    example: 'test@example.com',
  })
  @IsEmail({}, { message: 'Invalid email' })
  @Length(3, 50)
  readonly email: string;

  @ApiProperty({
    description: "User's Password",
    example: 'password',
  })
  @IsString()
  @Length(6, 30, { message: 'Password must be between 6 and 30 characters' })
  @IsNotEmpty()
  readonly password: string;
}
