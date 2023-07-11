import { Query, Resolver, Subscription } from '@nestjs/graphql';
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
    resolve: (payload) => {
      return payload;
    },
  })
  logAdded() {
    return pubSub.asyncIterator(LOG_ADDED);
  }
}
