import { Module } from "@nestjs/common";
import { PaymentResolver } from "./payment.resolver";
import { PaymentService } from "./payment.service";
import { PaystackClientModule } from "./paystack/paystack.module";
import { PaymentController } from "./payment.controller";

@Module({
    imports:[PaystackClientModule],
    providers:[PaymentService, PaymentResolver],
    exports:[PaymentService],
    controllers:[PaymentController]
})
export class PaymentModule{}