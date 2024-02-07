import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Param, UseGuards, Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription, Parent, ResolveField  } from '@nestjs/graphql';
import { GqlCurrentUser } from '../auth/decorators/gql.user.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlJwtGuard } from '../auth/guards/gql.jwt.guard';
import { Role } from '../auth/roles.enum';
import {
  CommonProjectInput,
  CreateProjectInput,
  Project,
  ProjectPageInput,
  ProjectPageResult,
  QueryProjectInput,
} from './project.model';
import { Project as ProjectSchema } from './project.schema';
import { ProjectService } from './project.service';
import { User } from '../user/user.model';
import { FileUploadService } from '../upload/upload.service';
import { Types } from 'mongoose';

@Resolver((of) => Project)
export class ProjectResolver {
  constructor(
    private readonly projectService: ProjectService, 
    @InjectMapper() private readonly classMapper: Mapper,
    private readonly fileUploadService: FileUploadService, 
  ) {}

  @Mutation((returns) => Project, { name: 'createProject' })
  @UseGuards(GqlJwtGuard)
  @Roles(Role.USER)
  public async create(@GqlCurrentUser() user:any, @Args('project') project: CreateProjectInput): Promise<Project> {
    //const queryMap = await this.classMapper.mapAsync(project, CreateProjectInput, ProjectSchema);
    //return this.classMapper.mapAsync(await this.projectService.create(queryMap), ProjectSchema, Project);
    if(project.files){
      let filePayload = [] as any;
      filePayload = await this.fileUploadService.uploadFiles(project.files);
      for(let file in filePayload){
        console.log(filePayload[file])
        filePayload[file]._id = new Types.ObjectId();
      }
      project.files = filePayload;
    }
    return this.projectService.create(project as any) as any;
  }
    

  @Mutation((returns) => Boolean, { name: 'updateProject' })
  @UseGuards(GqlJwtGuard)
  @Roles(Role.USER)
  public async update(
    @GqlCurrentUser() user:any,
    @Args('id') id:string,
    @Args('project') project: QueryProjectInput,
  ): Promise<boolean> {
    //const queryMap = await this.classMapper.mapAsync(project, QueryProjectInput, ProjectSchema)
    if(project.files.length > 0){
      let filePayload = [] as any;
      filePayload = await this.fileUploadService.uploadFiles(project.files);
      for(let file in filePayload){
        filePayload[file]._id = new Types.ObjectId();
      }
      project.files = filePayload;
    }
    await this.projectService.updateOne(id, project as any);
    return true;
  }

  @Query((returns) => Project, { name: 'findOneProject' })
  public async findOne(@Args('query') query: QueryProjectInput): Promise<Project> {
    //return this.classMapper.mapAsync(await this.projectService.findOne(query as unknown), ProjectSchema, Project);
    return this.projectService.findOne(query as unknown) as any;
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
  public async delete(@GqlCurrentUser() user:any): Promise<boolean> {
    await this.projectService.delete(user.sub);
    return true;
  }

  @Query((returns) => Boolean, { name: 'deleteProjectFile' })
  @UseGuards(GqlJwtGuard)
  @Roles(Role.USER)
  public async deleteFile(@Args("projectId") projectId: string, @Args("fileId") fileId: string, @Args("publicId") publicId: string): Promise<boolean> {
    return this.projectService.deleteFile(projectId, fileId, publicId);
  }

  @Query((returns) => ProjectPageResult, { name: 'projectPage' })
  @UseGuards(GqlJwtGuard)
  @Roles(Role.USER)
  public async page(@Args('query') query: QueryProjectInput, @Args('fullSearch') fullSearch: Boolean, @Args("page") page: ProjectPageInput) {
    return this.projectService.page(query as any, fullSearch, page);
  }

  @ResolveField(returns => User)
  async user(@Parent() project:Project):Promise<any>{
      return this.projectService.finduser(project.userId);
  }
}
