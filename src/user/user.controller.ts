import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserRoleDto, UserInfoDto } from './dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { Message } from '../common/response/message';
import { UpdateUserDto } from './dto/update-user.dto';
import { HasAnyRole } from '../common/decorator/hasAnyRole';
import { Role } from '../common/enum/role';

@ApiTags('User')
@ApiBearerAuth('JWT Token')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/current')
  async getCurrentUser(@Request() req): Promise<UserInfoDto> {
    return this.userService.getUser(req.user.id);
  }

  @Put('/current')
  async putCurrentUser(
    @Request() req,
    @Body() userInfo: CreateUserDto,
  ): Promise<Message<UpdateUserDto>> {
    return this.userService.updateUserInfo(req.user.id, userInfo);
  }

  @Patch('/current')
  async patchCurrentUser(
    @Request() req,
    @Body() userInfo: UpdateUserDto,
  ): Promise<Message<UpdateUserDto>> {
    return this.userService.updateUserInfo(req.user.id, userInfo);
  }

  @Patch('/current/password')
  async patchCurrentUserPassword(
    @Request() req,
    @Body() newPassword: UpdateUserPasswordDto,
  ): Promise<Message> {
    return this.userService.patchUserPassword(
      req.user.id,
      newPassword.password,
    );
  }

  @Delete('/current')
  async deleteCurrentUser(@Request() req): Promise<Message> {
    return this.userService.deleteUser(req.id);
  }

  @Get('/all')
  @HasAnyRole([Role.ADMIN])
  async getAllUsers(): Promise<UserInfoDto[]> {
    return this.userService.getAllUsers();
  }

  @ApiParam({ name: 'id', description: "User's id", example: 1 })
  @Get('/:id')
  @HasAnyRole([Role.ADMIN])
  async getUser(@Param() params): Promise<UserInfoDto> {
    return this.userService.getUser(params.id);
  }

  @ApiParam({ name: 'id', description: "User's id", example: 1 })
  @Delete('/:id')
  @HasAnyRole([Role.ADMIN])
  async deleteUser(@Param() params): Promise<Message> {
    return this.userService.deleteUser(params.id);
  }

  @ApiParam({ name: 'id', description: "User's id", example: 1 })
  @Patch('/:id')
  @HasAnyRole([Role.ADMIN])
  async putUserInfo(
    @Param() params,
    @Body() userInfo: UpdateUserDto,
  ): Promise<Message<UpdateUserDto>> {
    return this.userService.updateUserInfo(params.id, userInfo);
  }

  @ApiParam({ name: 'id', description: "User's id", example: 1 })
  @Patch('/:id/password')
  @HasAnyRole([Role.ADMIN])
  async patchUserPassword(
    @Param() params,
    @Body() newPassword: UpdateUserPasswordDto,
  ): Promise<Message> {
    return this.userService.patchUserPassword(params.id, newPassword.password);
  }

  @ApiParam({ name: 'id', description: "User's id", example: 1 })
  @ApiProperty({ name: 'role', enum: Role })
  @Patch('/:id/role')
  @HasAnyRole([Role.ADMIN])
  async patchUserRole(
    @Param() params,
    @Body() body: UpdateUserRoleDto,
  ): Promise<Message> {
    return this.userService.patchUserRole(params.id, body.role);
  }
}
