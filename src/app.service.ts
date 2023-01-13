import { Injectable } from '@nestjs/common';
import { UserService } from './modules/user/user.service';

@Injectable()
export class AppService {


  /**
   *
   */
  constructor() {
    
  }

  getHello(): string {
    return 'Hello World!';
  }
}
