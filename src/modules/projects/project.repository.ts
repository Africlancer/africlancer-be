import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProjectStatus } from './project.enum';
import { Project, ProjectDocument } from './project.schema';

@Injectable()
export class ProjectRepository {
  constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) {}

  public create(project: Project): Promise<Project> {
    project.userId = new Types.ObjectId(project.userId)
    return this.projectModel.create(project);
  }

  public async updateOne(_id: string, project: Partial<Project>): Promise<void> {
    delete project._id;
    await this.projectModel.updateOne({ _id: new Types.ObjectId(_id)},project);
  }

  public async findOne(project: Partial<Project>): Promise<Project> {
    if (project._id) project._id = new Types.ObjectId(project._id);
    return await this.projectModel.findOne(project);
  }

  public async findFilter(project: Partial<Project>, fullSearch:Boolean): Promise<Project[]> {
    if(project.userId) project.userId = new Types.ObjectId(project.userId);
    if(project.title && !fullSearch){
      const title = project.title.split(" ");
      delete project.title;
      for (let i in title){
        const query = await this.projectModel.find({"$and":[project, {status:ProjectStatus.BIDDING_OPEN}, {title: {"$regex":title[i], "$options":"i"}}]});
        if(query){
          return query;
        }
      }
    }
    return await this.projectModel.find({"$and":[project, {status:ProjectStatus.BIDDING_OPEN}]});
  }

  public async find(project: Partial<Project>): Promise<Project[]> {
    if(project.userId) project.userId = new Types.ObjectId(project.userId);
    return await this.projectModel.find(project);
  }

  public async delete(_id: string): Promise<void> {
    await this.projectModel.deleteOne({ _id: new Types.ObjectId(_id) });
  }

}
