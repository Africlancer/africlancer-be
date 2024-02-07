import { Injectable } from '@nestjs/common';
import { ProjectRepository } from './project.repository';
import { PageParams, PageResult, Project } from './project.schema';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';
import { Types } from 'mongoose';
import { FileUploadService } from '../upload/upload.service';

@Injectable()
export class ProjectService {
  constructor(
    private readonly ProjectRepo: ProjectRepository, 
    private readonly userService:UserService,
    private readonly fileUploadService:FileUploadService
  ) {}

  public create(project: Project): Promise<Project> {
    var digits = Math.floor(Math.random() * 9000000000) + 1;
    project.projectId = digits

    return this.ProjectRepo.create(project);
  }

  public async updateOne(_id: string, project: Partial<Project>): Promise<void> {
    const currentProject = await this.findOne({_id: new Types.ObjectId(_id)});
    if(project.files){
      project.files = [...currentProject.files, ...project.files];
    }
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

  async deleteFile(projectId: string, fileId: string, publicId: string):Promise<boolean>{
    const project = await this.findOne({_id: new Types.ObjectId(projectId)});
    project.files = project.files.filter(e=>e._id.toString() !== fileId);
    await this.fileUploadService.deleteFiles(publicId, project.files[fileId].resource_type);
    await this.ProjectRepo.updateOne(projectId, {files: project.files});
    return true;
  }

  async page(project: Partial<Project>, fullSearch:Boolean, page: PageParams): Promise<PageResult<Project>>{
    return this.ProjectRepo.page(project, fullSearch, page);
  }
    
}

