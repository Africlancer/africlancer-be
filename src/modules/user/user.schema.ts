import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

//TODO: Add Mapping 
@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop()
  firstName: string;

  @Prop()
  otherName: string;

  @Prop()
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ unique: true })
  username: string;

  @Prop({required:true})
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
