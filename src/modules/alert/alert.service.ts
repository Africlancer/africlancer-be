import { Injectable } from "@nestjs/common";
import { AlertRepository } from "./alert.repository";
import { PageParams, PageResult, Alert } from "./alert.schema";

@Injectable()
export class AlertService {
  constructor(private readonly alertRepo: AlertRepository) {}

  public async create(
    model: Alert,
  ): Promise<Alert> {
    return this.alertRepo.create({ ...model, userId: null });
  }

  public async updateStatus(id: string, status: string): Promise<Boolean> {
    await this.alertRepo.updateStatus(id, status);
    return true;
  }

  public async page(page: PageParams): Promise<PageResult<Alert>> {
    return await this.alertRepo.page(page);
  }

  public async count(query: Partial<Alert>){
    console.log(query)
    return this.alertRepo.count(query);
  }
}
