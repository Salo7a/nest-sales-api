import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (!user) throw new BadRequestException('This email is not registered');

    if (!(await bcrypt.compare(password, user?.password)))
      throw new UnauthorizedException('Incorrect Password');

    return user;
  }

  async generateToken(user) {
    return {
      token: this.jwtService.sign({
        id: user.id,
        name: user.name,
        email: user.email,
      }),
    };
  }

  async createUser(newUserData: RegisterUserDto) {
    return await this.userService.create(newUserData);
  }
}
