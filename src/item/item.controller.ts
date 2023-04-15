import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { ItemService } from './item.service';
import { ItemDto } from './dto/item.dto';
import { CreateItemDto } from './dto/create-item.dto';
import { Message } from '../common/response/message';
import { UpdateItemDto } from './dto/update-item.dto';
import { PageInfoInterceptor } from '../interceptors/page-info.interceptor';

@ApiBearerAuth('JWT Token')
@ApiTags('Item')
@Controller('item')
@UseInterceptors(PageInfoInterceptor)
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Get('/all')
  async getAllItems(): Promise<ItemDto[]> {
    return this.itemService.getAllItems();
  }

  @Post()
  async createItem(@Body() newItem: CreateItemDto): Promise<Message<ItemDto>> {
    return this.itemService.createItem(newItem);
  }

  @ApiParam({ name: 'id', description: "Item's id" })
  @Patch('/:id')
  async patchItem(
    @Param() params,
    @Body() newItem: UpdateItemDto,
  ): Promise<Message<ItemDto>> {
    return this.itemService.patchItem(params.id, newItem);
  }

  @ApiParam({ name: 'id', description: "Item's id" })
  @Put('/:id')
  async putItem(
    @Param() params,
    @Body() newItem: CreateItemDto,
  ): Promise<Message<ItemDto>> {
    return this.itemService.putItem(params.id, newItem);
  }

  @ApiParam({ name: 'id', description: "Item's id" })
  @Delete('/:id')
  async deleteItem(@Param() params): Promise<Message> {
    return this.itemService.deleteItem(params.id);
  }
}
