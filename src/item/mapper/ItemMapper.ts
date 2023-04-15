import { Mapper, Mappings } from 'ts-mapstruct';
import { ItemDto } from '../dto/item.dto';
import { Item } from '../item.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
@Mapper()
export class ItemMapper {
  @Mappings()
  entityToDto(_itemEntity: Item): ItemDto {
    return new ItemDto();
  }

  entitiesToDto(itemsEntity: Item[]): ItemDto[] {
    return itemsEntity.map((itemDto) => this.entityToDto(itemDto));
  }
}
