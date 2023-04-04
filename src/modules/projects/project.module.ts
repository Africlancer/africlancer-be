import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectController } from './project.controller';
import { ProjectResolver } from './project.resolver';
import { ProjectRepository } from './project.repository';
import { Project, ProjectSchema } from './project.schema';
import { ProjectService } from './project.service';
import { ProjectMapper } from './project.mapper';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    UserModule
  ],
  controllers: [ProjectController],
  providers: [ProjectResolver, ProjectService, ProjectRepository, ProjectMapper],
  exports:[ProjectService, ProjectRepository]
})
export class ProjectModule {}
