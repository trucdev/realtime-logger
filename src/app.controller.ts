import { Body, Controller, Post } from '@nestjs/common';
import { LOG_ADDED, pubSub } from './pubsub';

@Controller()
export class AppController {
  @Post('/send-log')
  sendLog(@Body() body: any) {
    // convert data and send
    const convertedData = typeof body === 'object' ? body : { data: body };

    console.log(convertedData);
    pubSub.publish(LOG_ADDED, convertedData);

    return {
      status: 200,
      message: 'oke',
    };
  }
}
