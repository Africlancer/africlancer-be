import { ForbiddenException, Injectable } from "@nestjs/common";
import { SaveProjectNotificationRepository } from "./save.repository";
import { ProjectNotificationService } from "../project.service";
import { SaveProjectNotification } from "./save.schema";


@Injectable()
export class SaveProjectNotificationService{
    constructor(private notificationRepository: SaveProjectNotificationRepository, private notificationService:ProjectNotificationService){}
    
    public async create(save: SaveProjectNotification): Promise<SaveProjectNotification> {
        const notification = await this.notificationService.findOne({_id: save.notificationId});
        if(!notification){
            throw new ForbiddenException("Cannot save notification, not found.");
        }
        return this.notificationRepository.create(save);
    }

    public async updateOne(_id: string, save: Partial<SaveProjectNotification>): Promise<void> {
        await this.notificationRepository.updateOne(_id, save);
    }

    public async findOne(save: Partial<SaveProjectNotification>): Promise<SaveProjectNotification> {
        return this.notificationRepository.findOne(save);
    }

    public async find(save: Partial<SaveProjectNotification>): Promise<SaveProjectNotification[]> {
        return this.notificationRepository.find(save);
    }

    public async delete(_id: string): Promise<void> {
        await this.notificationRepository.delete(_id);
    }
}