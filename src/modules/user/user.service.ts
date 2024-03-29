import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.respository';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  public create(user: User): Promise<User> {
    return this.userRepo.create(user);
  }

  public async update(_id: string, user: Partial<User>): Promise<void> {
    this.userRepo.update(_id, user);
  }

  public async findOne(user: Partial<User>): Promise<User> {
    return this.userRepo.findOne(user);
  }

  public async findOneAuth(user: Partial<User>): Promise<User> {
    return this.userRepo.findOneAuth(user);
  }

  public async find(user: Partial<User>): Promise<User[]> {
    return this.userRepo.find(user);
  }

  public async delete(_id: string): Promise<void> {
    await this.userRepo.delete(_id);
  }
}
