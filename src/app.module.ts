import { BookmarkModule } from './modules/bookmark/bookmark.module';
import { PubSubModule } from './modules/pubsub/pubsub.module';
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
import { NotificationModule } from './modules/notification/notification.module';
import { FileUploadModule } from './modules/upload/upload.module';

@Module({
  imports: [
    BookmarkModule, 
    PubSubModule,
    //MessagesModule,
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
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    MongooseModule.forRoot(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`),
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    UserModule,
    ProjectModule,
    ProfileModule,
    PortfolioModule,
    AuthModule,
    MailModule,
    BidModule,
    NotificationModule,
    FileUploadModule
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: GqlRolesGuard }],
})
export class AppModule {}
