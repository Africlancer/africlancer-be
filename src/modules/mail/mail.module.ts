import { MailerModule } from "@nestjs-modules/mailer";
import { Global, Module } from "@nestjs/common";
import { join } from "path";
import { MailService } from "./mail.service";
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { JwtModule } from "@nestjs/jwt";

@Global()
@Module({
    imports:[
        JwtModule,
        MailerModule.forRoot({
            transport: {
                host: 'smtp.gmail.com',
                secure: true,
                port: 465,
                auth: {
                  user: 'devafriclancer2023@gmail.com',
                  pass: 'eftjuwromidzdxmx',
                },
            },
            //preview:true,
            defaults: {
                from: '"Africlancer" <devafriclancer2023@gmail.com>',
            },
            template: {
                dir: join(process.cwd(), 'src/modules', 'mail/templates'),
                adapter: new EjsAdapter({inlineCssEnabled: true }),
                options: {
                strict: false,
                },
            },
        }),
    ],
    providers:[MailService],
    exports:[MailService]
})
export class MailModule{}