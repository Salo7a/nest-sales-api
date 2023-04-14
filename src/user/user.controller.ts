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
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserInfoDto } from './dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { Message } from '../common/response/message';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { HasRole } from '../common/decorator/hasRole';
import { Role } from '../common/enum/role';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getCurrentUser(@Request() req): Promise<UserInfoDto> {
    return this.userService.getUser(req.user.id);
  }

  @Put()
  async putCurrentUserInfo(
    @Request() req,
    @Body() userInfo: UpdateUserInfoDto,
  ): Promise<Message<UpdateUserInfoDto>> {
    return this.userService.putUserInfo(req.user.id, userInfo);
  }

  @Patch('/password')
  async patchCurrentUserPassword(
    @Request() req,
    @Body() newPassword: UpdateUserPasswordDto,
  ): Promise<Message> {
    return this.userService.patchUserPassword(
      req.user.id,
      newPassword.password,
    );
  }

  @Delete()
  async deleteCurrentUser(@Request() req): Promise<Message> {
    return this.userService.deleteUser(req.id);
  }

  @Get('/all')
  @HasRole(Role.ADMIN)
  async getAllUsers(): Promise<UserInfoDto[]> {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  @HasRole(Role.ADMIN)
  async getUser(@Param() params): Promise<UserInfoDto> {
    return this.userService.getUser(params.id);
  }

  @Delete('/:id')
  @HasRole(Role.ADMIN)
  async deleteUser(@Param() params): Promise<Message> {
    return this.userService.deleteUser(params.id);
  }

  @Put('/:id')
  @HasRole(Role.ADMIN)
  async putUserInfo(
    @Param() params,
    @Body() userInfo: UpdateUserInfoDto,
  ): Promise<Message<UpdateUserInfoDto>> {
    return this.userService.putUserInfo(params.id, userInfo);
  }

  @Patch('/:id/password')
  @HasRole(Role.ADMIN)
  async patchUserPassword(
    @Param() params,
    @Body() newPassword: UpdateUserPasswordDto,
  ): Promise<Message> {
    return this.userService.patchUserPassword(params.id, newPassword.password);
  }
}
