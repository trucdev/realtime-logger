import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import GraphQLJSON from 'graphql-type-json';
import { AppResolver } from './app.resolver';
import { ConfigModule } from '@nestjs/config';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      resolvers: { JSON: GraphQLJSON },
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      sortSchema: true,
      // subscription
      // installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true,
      },
      // Apollo Sandbox
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
  ],
  controllers: [AppController],
  providers: [AppResolver],
})
export class AppModule {}
