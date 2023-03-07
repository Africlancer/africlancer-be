import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Param, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlCurrentUser } from '../auth/decorators/gql.user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlJwtGuard } from '../auth/guards/gql.jwt.guard';
import { Role } from '../auth/roles.enum';
import {
  CreateProjectInput,
  Project,
  QueryProjectInput,
} from './project.model';
import { Project as ProjectSchema } from './project.schema';

import { ProjectService } from './project.service';

@Resolver((of) => Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService, @InjectMapper() private readonly classMapper: Mapper) {}

  @Mutation((returns) => Project, { name: 'createProject' })
  @UseGuards(GqlJwtGuard)
  @Roles(Role.USER)
  public async create(@GqlCurrentUser() user:any, @Args('project') project: CreateProjectInput): Promise<Project> {
    project.userId = user.sub;
    const queryMap = await this.classMapper.mapAsync(project, CreateProjectInput, ProjectSchema);
    return this.classMapper.mapAsync(await this.projectService.create(queryMap), ProjectSchema, Project);
  }

  @Mutation((returns) => Boolean, { name: 'updateProject' })
  @UseGuards(GqlJwtGuard)
  @Roles(Role.USER)
  public async update(
    @GqlCurrentUser() user:any,
    @Args('project') project: QueryProjectInput,
  ): Promise<boolean> {
    const queryMap = await this.classMapper.mapAsync(project, QueryProjectInput, ProjectSchema)
    await this.projectService.updateOne(user.sub, queryMap);
    return true;
  }

  @Query((returns) => Project, { name: 'findOneProject' })
  public async findOne(@Args('query') query: QueryProjectInput): Promise<Project> {
    return this.classMapper.mapAsync(await this.projectService.findOne(query as unknown), ProjectSchema, Project);
  }

  @Query((returns) => [Project], { name: 'findProjects' })
  public async find(@Args('query') query: QueryProjectInput): Promise<Project[]> {
    return this.classMapper.mapArrayAsync(await this.projectService.find(query), ProjectSchema, Project);
  }

  @Query((returns) => Boolean, { name: 'deleteProject' })
  @UseGuards(GqlJwtGuard)
  @Roles(Role.USER)
  public async delete(@GqlCurrentUser() user:any): Promise<true> {
    await this.projectService.delete(user.sub);
    return true;
  }
}
