import { IsString, Length, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserPasswordDto {
  @ApiProperty({
    description: "User's Password",
    example: 'password',
  })
  @IsString()
  @Length(6, 30, { message: 'Password must be between 6 and 30 characters' })
  @IsNotEmpty()
  readonly password: string;
}
