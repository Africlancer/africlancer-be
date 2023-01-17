import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    MongooseModule.forRoot(process.env.mongodb_url),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}