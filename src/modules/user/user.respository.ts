import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  public create(user: User): Promise<User> {
    const createUser = new this.userModel(user);
    return createUser.save();
  }

  public async update(_id: string, user: Partial<User>): Promise<void> {
    delete user._id;
    await this.userModel.updateOne({ _id: new Types.ObjectId(_id)}, user);
  }

  public async findOne(user: Partial<User>): Promise<User> {
    if (user._id) user._id = new Types.ObjectId(user._id);
    return await this.userModel.findOne(user);
  }

  public async findOneAuth(user: Partial<User>): Promise<User> {
    return await this.userModel.findOne({$or:[{username: user.username}, {email:user.email}]});
  }

  public async find(user: Partial<User>): Promise<User[]> {
    if (user._id) user._id = new Types.ObjectId(user._id);
    if (user.profileID) user.profileID = new Types.ObjectId(user.profileID);
    return await this.userModel.find(user);
  }

  public async delete(_id: string): Promise<void> {
    await this.userModel.deleteOne({ _id: new Types.ObjectId(_id) });
  }

}
