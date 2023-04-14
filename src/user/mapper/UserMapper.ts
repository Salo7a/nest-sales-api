import { Mapper, Mappings } from 'ts-mapstruct';
import { UserInfoDto } from '../dto';
import { User } from '../user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
@Mapper()
export class UserMapper {
  @Mappings()
  entityToDto(_userEntity: User): UserInfoDto {
    return new UserInfoDto();
  }

  entitiesToDto(usersEntity: User[]): UserInfoDto[] {
    return usersEntity.map((userDto) => this.entityToDto(userDto));
  }
}
