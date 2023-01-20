import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Project, ProjectDocument } from './project.schema';

@Injectable()
export class ProjectRepository {
  constructor(@InjectModel(Project.name) private projectModel: Model<ProjectDocument>) {}

  public create(project: Project): Promise<Project> {
    const createProject = new this.projectModel(project);
    return createProject.save();
  }

  public async updateOne(_id: string, project: Partial<Project>): Promise<void> {
    delete project._id;
    await this.projectModel.updateOne({ _id: new Types.ObjectId(_id)},project);
  }

  public async findOne(project: Project): Promise<Project> {
    if (project._id) project._id = new Types.ObjectId(project._id);
    return await this.projectModel.findOne(project);
  }

  public async find(project: Project): Promise<Project[]> {

    return await this.projectModel.find(project);
  }

  public async delete(_id: string): Promise<void> {
    await this.projectModel.deleteOne({ _id: new Types.ObjectId(_id) });
  }

}
