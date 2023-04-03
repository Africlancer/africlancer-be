import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Message } from './chat.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Resolver(() => Message)
export class MessageResolver {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}

  @Query(() => [Message])
  async messages(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }

  @Mutation(() => Message)
  async createMessage(@Args('user') user: string, @Args('message') message: string): Promise<Message> {
    const createdMessage = new this.messageModel({ user, message });
    return createdMessage.save();
  }

  @Query(() => Message)
  async message(@Args('id', { type: () => ID }) id: string): Promise<Message> {
    return this.messageModel.findById(id).exec();
  }

  @Mutation(() => Message)
  async updateMessage(@Args('id', { type: () => ID }) id: string, @Args('user') user: string, @Args('message') message: string): Promise<Message> {
    return this.messageModel.findByIdAndUpdate(id, { user, message }, { new: true }).exec();
  }

  @Mutation(() => Boolean)
  async deleteMessage(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    const result = await this.messageModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }
}
