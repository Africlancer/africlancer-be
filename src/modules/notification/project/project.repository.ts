import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { ProjectNotificationDocument, ProjectNotification } from "./project.schema";

@Injectable()
export class ProjectNotificationRepository{
    constructor(@InjectModel(ProjectNotification.name) private notificationModel: Model<ProjectNotificationDocument>){}

    public async create(notification: ProjectNotification): Promise<ProjectNotification> {
        const createNotification = new this.notificationModel(this.mapIds(notification));
        return createNotification.save();
    }

    public async updateOne(_id: string, notification: Partial<ProjectNotification>): Promise<void> {
        delete notification._id;
        await this.notificationModel.updateOne({ _id: new Types.ObjectId(_id)},this.mapIds(notification));
    }

    public async findOne(notification: Partial<ProjectNotification>): Promise<ProjectNotification> {
        return await this.notificationModel.findOne(this.mapIds(notification));
    }

    public async find(notification: Partial<ProjectNotification>): Promise<ProjectNotification[]> {
        return await this.notificationModel.find(this.mapIds(notification));
    }

    public async delete(projectId: string): Promise<void> {
        await this.notificationModel.deleteMany({ projectId: new Types.ObjectId(projectId) });
    }

    private mapIds(model: Partial<ProjectNotification>):  Partial<ProjectNotification>{
        if(model._id) model._id = new Types.ObjectId(model._id);
        if(model.projectId) model.projectId = new Types.ObjectId(model.projectId);

        return model;
    }

}