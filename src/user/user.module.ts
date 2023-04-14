import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserMapper } from './mapper/UserMapper';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserMapper],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
