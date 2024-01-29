import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { SaveProjectNotificationDocument, SaveProjectNotification } from "./save.schema";

@Injectable()
export class SaveProjectNotificationRepository{
    constructor(@InjectModel(SaveProjectNotification.name) private notificationModel: Model<SaveProjectNotificationDocument>){}

    public async create(notification: SaveProjectNotification): Promise<SaveProjectNotification> {
        const createNotification = new this.notificationModel(this.mapIds(notification));
        return createNotification.save();
    }

    public async updateOne(_id: string, notification: Partial<SaveProjectNotification>): Promise<void> {
        delete notification._id;
        await this.notificationModel.updateOne({ _id: new Types.ObjectId(_id)},this.mapIds(notification));
    }

    public async findOne(notification: Partial<SaveProjectNotification>): Promise<SaveProjectNotification> {
        return await this.notificationModel.findOne(this.mapIds(notification));
    }

    public async find(notification: Partial<SaveProjectNotification>): Promise<SaveProjectNotification[]> {
        return await this.notificationModel.find(this.mapIds(notification));
    }

    public async delete(_id: string): Promise<void> {
        await this.notificationModel.deleteOne({ _id: new Types.ObjectId(_id) });
    }

    private mapIds(model: Partial<SaveProjectNotification>):  Partial<SaveProjectNotification>{
        if(model._id) model._id = new Types.ObjectId(model._id);
        if(model.userId) model.userId = new Types.ObjectId(model.userId);
        if(model.notificationId) model.notificationId = new Types.ObjectId(model.notificationId);

        return model;
    }

}