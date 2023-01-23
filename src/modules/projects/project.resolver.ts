import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Param } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateProjectInput,
  UpdateProjectInput,
  Project,
  ProjectQueryInput,
  QueryProjectInput,
} from './project.model';
import { Project as ProjectSchema } from './project.schema';

import { ProjectService } from './project.service';

@Resolver((of) => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService, @InjectMapper() private readonly classMapper: Mapper) {}

  @Mutation((returns) => Project, { name: 'createProject' })
  public async create(@Args('project') project: CreateProjectInput): Promise<Project> {
    const queryMap = await this.classMapper.mapAsync(project, CreateProjectInput, ProjectSchema);
    return this.classMapper.mapAsync(await this.projectService.create(queryMap), ProjectSchema, Project);
    //BEFORE MAPPING: return (await this.projectService.create(project as any)) as any;
  }

  @Mutation((returns) => Boolean, { name: 'updateProject' })
  public async update(
    @Args('_id') _id: string,
    @Args('project') project: QueryProjectInput,
    //BEFORE MAPPING: @Args('project') project: UpdateProjectInput,
  ): Promise<boolean> {
    const queryMap = await this.classMapper.mapAsync(project, QueryProjectInput, ProjectSchema)
    await this.projectService.updateOne(_id, queryMap);
    //BEFORE MAPPING: await this.projectService.updateOne(_id, project as any);
    return true;
  }

  @Query((returns) => Project, { name: 'findOneProject' })
  //BEFORE MAPPING: public async findOne(@Args('query') query: ProjectQueryInput): Promise<Project> {
  public async findOne(@Args('query') query: QueryProjectInput): Promise<Project> {
    //const queryMap = await this.classMapper.mapAsync(query, QueryProjectInput, ProjectSchema);
    return this.classMapper.mapAsync(await this.projectService.findOne(query as unknown), ProjectSchema, Project);
    //BEFORE MAPPING: return (await this.projectService.findOne(query as any)) as any;
  }

  @Query((returns) => [Project], { name: 'findProjects' })
  //BEFORE MAPPING: public async find(@Args('query') query: ProjectQueryInput): Promise<Project[]> {
  public async find(@Args('query') query: QueryProjectInput): Promise<Project[]> {
    return this.classMapper.mapArrayAsync(await this.projectService.find(query), ProjectSchema, Project);
    //BEFORE MAPPING: return (await this.projectService.find(query as any)) as any;
  }

  @Query((returns) => Boolean, { name: 'deleteProject' })
  public async delete(@Args('_id') _id: string): Promise<true> {
    await this.projectService.delete(_id);
    return true;
  }
}
