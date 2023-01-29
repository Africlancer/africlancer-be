import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

//TODO: Add Mapping 
@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true})
  firstName: string;

  @Prop({ required: true})
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({required:true})
  password: string;

  @Prop()
  refreshToken: Array<String>;

  @Prop()
  roles: Array<String>;
}

export const UserSchema = SchemaFactory.createForClass(User);
