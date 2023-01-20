import { Param } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateProjectInput,
  UpdateProjectInput,
  Project,
  ProjectQueryInput,
} from './project.model';

import { ProjectService } from './project.service';

@Resolver((of) => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Mutation((returns) => Project, { name: 'createProject' })
  public async create(@Args('project') project: CreateProjectInput): Promise<Project> {
    return (await this.projectService.create(project as any)) as any;
  }

  @Mutation((returns) => Boolean, { name: 'updateProject' })
  public async update(
    @Args('_id') _id: string,
    @Args('project') project: UpdateProjectInput,
  ): Promise<boolean> {
    await this.projectService.updateOne(_id, project as any);
    return true;
  }

  @Query((returns) => Project, { name: 'findOneProject' })
  public async findOne(@Args('query') query: ProjectQueryInput): Promise<Project> {
    return (await this.projectService.findOne(query as any)) as any;
  }

  @Query((returns) => [Project], { name: 'findProjects' })
  public async find(@Args('query') query: ProjectQueryInput): Promise<Project[]> {
    return (await this.projectService.find(query as any)) as any;
  }

  @Query((returns) => Boolean, { name: 'deleteProject' })
  public async delete(@Args('_id') _id: string): Promise<true> {
    await this.projectService.delete(_id);
    return true;
  }
}
