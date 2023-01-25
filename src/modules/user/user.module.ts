import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { UserRepository } from './user.respository';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserResolver, UserService, UserRepository],
  exports:[UserService, UserRepository]
})
export class UserModule {}
