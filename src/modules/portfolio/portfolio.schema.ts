import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PortfolioDocument = HydratedDocument<Portfolio>;

@Schema()
export class Portfolio {
  @AutoMap()
  _id: Types.ObjectId;

  @AutoMap()
  @Prop({ required: true })
  title: string;

  @AutoMap()
  @Prop({ required: true })
  summary: number;

  @AutoMap()
  @Prop({ required: true })
  url: string;

  @AutoMap()
  @Prop({ required: true })
  stack: string;

}


export const PortfolioSchema = SchemaFactory.createForClass(Portfolio);