import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { isPublic } from '../common/decorator/isPublic';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { Message } from '../common/response/message';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @isPublic()
  @Post('register')
  @ApiBadRequestResponse({ description: 'Invalid user data' })
  async registerUser(@Body() newUserData: RegisterUserDto): Promise<Message> {
    await this.authService.createUser(newUserData);
    return new Message('User registered successfully');
  }

  @isPublic()
  @Post('register/seller')
  @ApiBadRequestResponse({ description: 'Invalid user data' })
  async registerSeller(@Body() newUserData: RegisterUserDto): Promise<Message> {
    await this.authService.createUser(newUserData);
    return new Message('User registered successfully');
  }

  @isPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() userLogin: LoginDto) {
    return this.authService.generateToken({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
}
