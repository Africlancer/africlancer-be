import { forwardRef, Inject } from "@nestjs/common";
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import {
  Alert,
  AlertPageResult,
  AlertPageInput,
  CreateAlertInput,
  AlertSummary,
  AlertQueryInput,
} from "./alert.dto";
import { AlertService } from "./alert.service";

@Resolver((of) => Alert)
export class AlertResolver {
  constructor(
    private readonly alertSvc: AlertService,
  ) {}

  @Query((returns) => AlertSummary, { name: "AlertSummary" })
  public async summary(
    @Args("query") query: AlertQueryInput
  ): Promise<AlertSummary> {
    const promise = await Promise.all([
      await this.alertSvc.count({
        ...query,
      } as any),
    ]);

    return {
      totalCount: promise[0],
    };
  }



  @Mutation((returns) => Alert, { name: "createAlert" })
  async create(
    @Args("alert") Alert: CreateAlertInput
  ) {
    const payload: any = { ...Alert };


    return await this.alertSvc.create({
      ...payload,
    } as any);
  }


  @Mutation((returns) => Boolean, { name: "updateAlertStatus" })
  public async updateStatus(
    @Args("alertId") AlertId: string,
    @Args("status") status: string,
  ) {
    return await this.alertSvc.updateStatus(AlertId, status);
  }

  


  @Query((returns) => AlertPageResult, { name: "AlertPage" })
  public async page(
    @Args("page") page: AlertPageInput
  ) {
    return this.alertSvc.page({ ...page });
  }
}
