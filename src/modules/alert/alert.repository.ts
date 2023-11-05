import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import {
  Alert,
  AlertDocument,
  handlePageFacet,
  handlePageResult,
  PageParams,
  PageResult,
} from "./alert.schema";

@Injectable()
export class AlertRepository {
  constructor(
    @InjectModel(Alert.name)
    private alertModel: Model<AlertDocument>
  ) {}

  public async create(model: Alert): Promise<Alert> {

    const createAlert = new this.alertModel({
      ...this.mapIds(model),
      createdAt: Date.now(),
    });
    return createAlert.save();
  }

  
  public async updateStatus(id: string, status: string): Promise<void> {

    await this.alertModel.updateOne(
      { _id: new Types.ObjectId(id) },
      { status, updatedAt: Date.now() }
    );
  }

  public async page(page: PageParams): Promise<PageResult<Alert>> {
    let query = {
      $match: {},
    } as any;

    if (page.userId) {
      query.$match.$and = query.$match.$and || [];
      query.$match.$and.unshift({
        userId: new Types.ObjectId(page.userId),
      });
    }
    if (page.refId) {
      query.$match.$and = query.$match.$and || [];
      query.$match.$and.unshift({
        refId: page.refId,
      });
    }

    return await this.alertModel
      .aggregate([query, { ...handlePageFacet(page) }])
      .then(handlePageResult)
      .then((rs) => {
        return rs;
      });
  }
  public async count(query: Partial<Alert>) {
    return this.alertModel.countDocuments(this.mapIds(query));
  }

  private mapIds(model: Partial<Alert>) : Partial<Alert>{
    if (model._id) 
      model._id = new Types.ObjectId(model._id);
 
    if (model.userId)
      model.userId = new Types.ObjectId(model.userId);

    if (model.refId)
      model.refId = new Types.ObjectId(model.refId);

    return model;
  }
}
