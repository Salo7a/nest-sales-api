import { IsString, IsEmail, Length, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: "User's Email",
    example: 'test@example.com',
  })
  @IsEmail({}, { message: 'Invalid email' })
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
