import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { GetContext } from './get.user.context';
import { GoogleStrategy } from './strategy/google.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports:[UserModule,PassportModule, JwtModule.register({})],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy, GoogleStrategy, GetContext],
  controllers:[AuthController],
  exports: [GetContext]
})
export class AuthModule {}
