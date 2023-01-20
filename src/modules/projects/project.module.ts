import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectController } from './project.controller';
import { ProjectResolver } from './project.resolver';
import { ProjectRepository } from './project.repository';
import { Project, ProjectSchema } from './project.schema';
import { ProjectService } from './project.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
  ],
  controllers: [ProjectController],
  providers: [ProjectResolver, ProjectService, ProjectRepository],
})
export class ProjectModule {}
