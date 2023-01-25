import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { SessionSerializer } from './session.serializer';

@Module({
  imports:[UserModule,PassportModule.register({session: true}), JwtModule.register({})],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy, SessionSerializer]
})
export class AuthModule {}
