import { Injectable } from '@nestjs/common';
import { Message } from './common/response/message';

@Injectable()
export class AppService {
  getHello(): Message<void> {
    return new Message('Welcome to Sales Api v1.0!, visit /api for docs');
  }
}
