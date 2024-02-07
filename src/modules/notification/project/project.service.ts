import { ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { ProjectNotificationRepository } from "./project.repository";
import { PageParams, PageResult, ProjectNotification } from "./project.schema";
import { ProjectService } from "src/modules/projects/project.service";
import { PUB_SUB } from "src/modules/pubsub/pubsub.module";
import { PubSub } from "graphql-subscriptions";

@Injectable()
export class ProjectNotificationService{
    constructor(
        private notificationRepository: ProjectNotificationRepository, 
        private projectService:ProjectService, 
        @Inject(PUB_SUB) private pubSub: PubSub
    ){}
    
    public async create(notification: ProjectNotification): Promise<ProjectNotification> {
        const project = await this.projectService.findOne({_id: notification.projectId});
        if(!project){
            throw new ForbiddenException("Cannot create notification, no project found.");
        }
        const notification1 = await this.notificationRepository.create({...notification, createdAt: Date.now()});
        this.pubSub.publish('projectAdded', notification1);
        return notification1;
    }

    public async updateOne(_id: string, notification: Partial<ProjectNotification>): Promise<void> {
        await this.notificationRepository.updateOne(_id, notification);
    }

    public async findOne(notification: Partial<ProjectNotification>): Promise<ProjectNotification> {
        return this.notificationRepository.findOne(notification);
    }

    public async find(notification: Partial<ProjectNotification>): Promise<ProjectNotification[]> {
        return this.notificationRepository.find(notification);
    }

    public async delete(projectId: string): Promise<void> {
        await this.notificationRepository.delete(projectId);
    }
    
    async page(project: Partial<ProjectNotification>, page: PageParams): Promise<PageResult<ProjectNotification>>{
        return this.notificationRepository.page(project, page);
    }
}