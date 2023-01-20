import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { get } from 'http';
import { Project } from './project.schema';
import { ProjectService } from './project.service';

@Controller('/project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  public create(@Body() project: Project): Promise<Project> {
    return this.projectService.create(project);
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
