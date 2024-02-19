import { Controller, Get, Param, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { WalletTransactionService } from "./transaction.service";

@Controller("api/wallettransaction")
export class WalletTransactionController {
  constructor(
    private readonly transSvc: WalletTransactionService,
  ) {}

  @Get("payment/:paymentId")
  async senangpay(
    @Res() res: Response,
    @Param("paymentId") paymentId: string,
    @Query("paymentMethodId") paymentMethodId?: string
  ): Promise<any> {

    return "TODO:Implement payment api"
  }
}
