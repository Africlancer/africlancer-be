import { PubsubModule } from './modules/pubsub/pubsub.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ProjectModule } from './modules/projects/project.module';
import { ProfileModule } from './modules/profile/profile.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { GqlRolesGuard } from './modules/auth/guards/gql.roles.guard';
import { MailModule } from './modules/mail/mail.module';
import { BidModule } from './modules/bid/bid.module';
import { MessagesModule } from './modules/messages/messages.module';

@Module({
  imports: [
    PubsubModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: false,
      playground: {
        settings: {
          'request.credentials': 'include',
        },
      },
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      cors: { origin: true, credentials: true },
      context: ({ req, res }) => ({ req, res }),
      //subcription
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    MongooseModule.forRoot(`mongodb://localhost/${process.env.DB_NAME}`),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    UserModule,
    ProjectModule,
    ProfileModule,
    PortfolioModule,
    AuthModule,
    MailModule,
    BidModule,
    PubsubModule,
    MessagesModule
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: GqlRolesGuard }],
})
export class AppModule {}
