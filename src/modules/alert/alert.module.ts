import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "src/modules/auth/auth.module";
import { AlertRepository } from "./alert.repository";
import { AlertResolver } from "./alert.resolver";
import { AlertService } from "./alert.service";
import { Alert, AlertSchema } from "./alert.schema";


@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([
      { name: Alert.name, schema: AlertSchema },
    ]),
  ],
  providers: [AlertRepository, AlertService, AlertResolver],
  exports: [AlertService],
})
export class AlertModule {}
