import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Role } from '../auth/roles.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @AutoMap()
  _id: Types.ObjectId;

  @AutoMap()
  @Prop()
  profileID: Types.ObjectId;

  @AutoMap()
  @Prop()
  firstName: string;

  @AutoMap()
  @Prop()
  lastName: string;
  
  @AutoMap()
  @Prop({ required: true, unique: true })
  email: string;

  @AutoMap()
  @Prop({ required: true, unique: true })
  username: string;

  @AutoMap()
  @Prop()
  password: string;

  @Prop()
  refreshToken: Array<String>;

  @Prop({required:true, default:[Role.USER]})
  roles: Array<String>;

  @Prop({required:true, default:false})
  isEmailConfirmed: boolean

}

export const UserSchema = SchemaFactory.createForClass(User);
