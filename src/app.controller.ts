import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Message } from './common/response/message';
import { isPublic } from './common/decorator/isPublic';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @isPublic()
  getHello(): Message {
    return this.appService.getHello();
  }
}
