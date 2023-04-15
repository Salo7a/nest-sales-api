import { IsString, Length, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../common/enum/role';

export class UpdateUserRoleDto {
  @ApiProperty({
    description: "User's Role",
    example: 'user',
  })
  @IsNotEmpty()
  @IsEnum(Role)
  readonly role?: Role;
}
