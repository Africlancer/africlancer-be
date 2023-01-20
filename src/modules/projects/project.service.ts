import { Injectable } from '@nestjs/common';
import { ProjectRepository } from './project.repository';
import { Project } from './project.schema';

@Injectable()
export class ProjectService {
  constructor(private readonly ProjectRepo: ProjectRepository) {}

  public create(project: Project): Promise<Project> {
    return this.ProjectRepo.create(project);
  }

  public async updateOne(_id: string, project: Partial<Project>): Promise<void> {
    this.ProjectRepo.updateOne(_id, project);
  }

  public async findOne(project: Project): Promise<Project> {
    return this.ProjectRepo.findOne(project);
  }

  public async find(project: Project): Promise<Project[]> {
    return this.ProjectRepo.find(project);
  }

  public async delete(_id: string): Promise<void> {
    await this.ProjectRepo.delete(_id);
  }
}
