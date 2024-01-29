import { Injectable } from '@nestjs/common';
import { ProjectRepository } from './project.repository';
import { Project } from './project.schema';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';
import { Types } from 'mongoose';

@Injectable()
export class ProjectService {
  constructor(private readonly ProjectRepo: ProjectRepository, private readonly userService:UserService) {}

  public create(project: Project): Promise<Project> {
    var digits = Math.floor(Math.random() * 9000000000) + 1;
    project.projectId = digits

    return this.ProjectRepo.create(project);
  }

  public async updateOne(_id: string, project: Partial<Project>): Promise<void> {
    this.ProjectRepo.updateOne(_id, project);
  }

  public async findOne(project: Partial<Project>): Promise<Project> {
    return this.ProjectRepo.findOne(project);
  }

  public async findFilter(project: Partial<Project>, fullSearch:Boolean): Promise<Project[]> {
    return this.ProjectRepo.findFilter(project, fullSearch);
  }

  public async find(project: Partial<Project>): Promise<Project[]> {
    return this.ProjectRepo.find(project);
  }

  public async delete(_id: string): Promise<void> {
    await this.ProjectRepo.delete(_id);
  }

  async finduser(userId:string):Promise<User>{
    return this.userService.findOne({_id: new Types.ObjectId(userId)});
}
    
}

