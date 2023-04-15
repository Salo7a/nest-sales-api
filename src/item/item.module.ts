import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { ItemMapper } from './mapper/ItemMapper';

@Module({
  imports: [TypeOrmModule.forFeature([Item])],
  providers: [ItemService, ItemMapper],
  exports: [ItemService],
  controllers: [ItemController],
})
export class ItemModule {}
