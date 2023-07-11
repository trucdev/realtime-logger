import { Body, Controller, Param, Post } from '@nestjs/common';
import { LOG_ADDED, pubSub } from './pubsub';

@Controller()
export class AppController {
  @Post('/send-log/:channel')
  sendLog(@Body() body: any, @Param() params: { channel: string }) {
    // convert data and send
    const convertedData = typeof body === 'object' ? body : { data: body };
    convertedData.__channel__ = params.channel;

    // add log time to show in client
    convertedData.__logTime__ =
      convertedData.__logTime__ || Math.round(Date.now() / 1000);

    // publish to subscription
    pubSub.publish(LOG_ADDED, convertedData);

    return {
      status: 200,
      message: 'oke',
    };
  }
}
