import { Injectable } from '@nestjs/common';
import { Message } from './common/response/message';

@Injectable()
export class AppService {
  getHello(): Message<void> {
    return new Message('Sales Api v1.0');
  }
}
