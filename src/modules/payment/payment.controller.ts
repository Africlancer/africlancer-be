import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { createHmac } from 'crypto';
import { PaystackClientService } from './paystack/paystack.service';
import { PaystackWebhookEvents } from './payment.interface';


@Controller("payment")
export class PaymentController {
  constructor(
    private paystackClientService: PaystackClientService
  ) {}

  @Post("paystack/webhook")
  handlePaystackEvent(@Body() payload, @Req() req, @Res() res) {
    const hash = createHmac('sha512', process.env.PAYSTACK_SECRET_KEY).update(JSON.stringify(req.body)).digest('hex');
    if (hash === req.headers['x-paystack-signature']) {
      const event = req.body;
      if(event.status === PaystackWebhookEvents.CHARGE_SUCCESS){
        // Do something with event  
      }
      return res.sendStatus(200);
    }else{
      return res.sendStatus(400);
    }
  }
}