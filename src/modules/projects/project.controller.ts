import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { get } from 'http';
import { Project } from './project.schema';
import { ProjectService } from './project.service';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Controller('/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  // @Post()
  // public create(@Body() project: Project): Promise<Project> {
  //   return this.projectService.create(project);
  // }
  @Post()
  public async create(@Body() project: Project): Promise<Project> {
    const newProject = await this.projectService.create(project);
    await pubSub.publish('projectCreated', { projectCreated: newProject });
    return newProject;
  }


  @Put()
  public async updateOne(_id: string, project: Project): Promise<void> {
    this.projectService.updateOne(_id, project);
  }

  @Get('retrieve/:id')
  public async findOne(@Param() id: string): Promise<Project> {
    return this.projectService.findOne({ _id: id } as any);
  }

  @Get('/all')
  public async find(): Promise<Project[]> {
    return this.projectService.find({} as any);
  }

  @Delete(':id')
  public async delete(@Param() id: string): Promise<void> {
    await this.projectService.delete(id);
  }
}
