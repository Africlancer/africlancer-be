import { MailerModule } from "@nestjs-modules/mailer";
import { Global, Module } from "@nestjs/common";
import { join } from "path";
import { MailService } from "./mail.service";
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { JwtModule } from "@nestjs/jwt";

const host = process.env.SMTP_HOST
const user = process.env.SMTP_USER
const pass = process.env.SMTP_PASSWORD
const from = process.env.SMTP_FROM

@Global()
@Module({
    imports:[
        JwtModule,
        MailerModule.forRoot({
            transport: {
                host,
                secure: true,
                port: 465,
                auth: {
                  user,
                  pass,
                },
            },
            //preview:true,
            defaults: {
                from,
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