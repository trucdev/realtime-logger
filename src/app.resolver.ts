import { Args, Query, Resolver, Subscription } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { LOG_ADDED, pubSub } from './pubsub';

@Resolver()
export class AppResolver {
  @Query(() => GraphQLJSON)
  async sayHello() {
    return {
      data: 'Hello',
    };
  }

  @Subscription(() => GraphQLJSON, {
    resolve: (payload: any) => {
      delete payload.__channel__;

      // add log time to show in client
      payload.__logTime__ =
        payload.__logTime__ || Math.round(Date.now() / 1000);

      return payload;
    },
    filter: (payload, variables) => {
      return payload.__channel__ === variables.key;
    },
  })
  logAdded(@Args('key') key: string) {
    return pubSub.asyncIterator(LOG_ADDED);
  }
}
