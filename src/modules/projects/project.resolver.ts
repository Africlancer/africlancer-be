import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Param, UseGuards, Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { GqlCurrentUser } from '../auth/decorators/gql.user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlJwtGuard } from '../auth/guards/gql.jwt.guard';
import { Role } from '../auth/roles.enum';
import { PUB_SUB } from '../pubsub/pubsub.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import {
  CommonProjectInput,
  CreateProjectInput,
  Project,
  QueryProjectInput,
} from './project.model';
import { Project as ProjectSchema } from './project.schema';

import { ProjectService } from './project.service';

enum SUBSCRIPTION_EVENTS{
  newProject = 'newProject',
}
// }export class MyClass {
//   allSubscribers: Subscription;
// }
@Resolver((of) => Project)
export class ProjectResolver {
  constructor(@Inject(PUB_SUB) private readonly pubSub: RedisPubSub, private readonly projectService: ProjectService, @InjectMapper() private readonly classMapper: Mapper) {}



  // @Resolver()
  // export class ProjectResolver {
    allSubscribers: Project[] = []
    // constructor (@inject(PUB_SUB) private readonly pubSub: RedisPubSub){}
  // @Mutation()
  
  //   CreateProjectInput(@Args("project") project: Project){

      
  //     return project
  // }

  @Subscription(returns => Project)
  newProject(){
    return this.pubSub.asyncIterator(SUBSCRIPTION_EVENTS.newProject)
  }


  @Mutation((returns) => Project, { name: 'createProject' })
  // @UseGuards(GqlJwtGuard)
  // @Roles(Role.USER)
  public async create(@GqlCurrentUser() user:any, @Args('project') project: CreateProjectInput): Promise<Project> {
    // project.userId = user.sub;
    const queryMap = await this.classMapper.mapAsync(project, CreateProjectInput, ProjectSchema);
    // // edit next line to any if it doesnt run - azeezSaid
    this.allSubscribers.push(new Project)
    this.pubSub.publish(SUBSCRIPTION_EVENTS.newProject, {newProject: project})
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

  @Query((returns) => [Project], { name: 'findProjectsFilter' })
  public async findFilter(@Args('query') query: QueryProjectInput, @Args('fullSearch') fullSearch: Boolean ): Promise<Project[]> {
    return this.classMapper.mapArrayAsync(await this.projectService.findFilter(query as unknown, fullSearch), ProjectSchema, Project);
  }

  @Query((returns) => [Project], { name: 'findProjects' })
  @UseGuards(GqlJwtGuard)
  @Roles(Role.USER)
  public async find(@GqlCurrentUser() user:any, @Args('query') query: QueryProjectInput): Promise<Project[]> {
    query.userId = user.sub
    return this.classMapper.mapArrayAsync(await this.projectService.find(query as unknown), ProjectSchema, Project);
  }

  @Query((returns) => Boolean, { name: 'deleteProject' })
  @UseGuards(GqlJwtGuard)
  @Roles(Role.USER)
  public async delete(@GqlCurrentUser() user:any): Promise<true> {
    await this.projectService.delete(user.sub);
    return true;
  }
}
