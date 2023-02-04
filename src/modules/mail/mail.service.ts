import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";


@Injectable()
export class MailService{
  constructor(private mailerService: MailerService) {}

  logo = "https://drive.google.com/uc?export=view&id=14cYY8wFaNr70E5ma-8vpxCtoiuaSOllU"

  async sendWelcomeEmail(name:string, email:string){
    await this.mailerService.sendMail({
        to: email,
        subject: 'Welcome to Africlancer!',
        template: './welcome.ejs',
        context: { 
          name,
          logo:this.logo
        },
    });
  }

  async sendResetPassword(url:string, name:string, email:string){
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset Your Password',
      template: './resetPassword.ejs',
      context: { 
        name,
        url,
        logo:this.logo
      },
    });
  }

  async sendConfirmEmail(url:string, email:string){
    await this.mailerService.sendMail({
      to: email,
      subject: 'Confirm Your Email Address',
      template: './confirmEmail.ejs',
      context: { 
        url,
        logo:this.logo
      },
    });
  }

}