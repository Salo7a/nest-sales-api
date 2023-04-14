import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { isPublic } from '../common/decorator/isPublic';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { Message } from '../common/response/message';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @isPublic()
  @Post('register')
  @ApiCreatedResponse({
    description: 'Created user object as response',
    type: User,
  })
  @ApiBadRequestResponse({ description: 'User cannot dto. Try again!' })
  async registerUser(@Body() newUserData: RegisterUserDto): Promise<Message> {
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
