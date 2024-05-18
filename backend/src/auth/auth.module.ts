import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { ConfigService } from '@nestjs/config';
import { jwtConstants } from './jwt.strategy/constants';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      global: true,
    }),
  ],
  providers: [AuthService, JwtService, PrismaService, ConfigService],
  exports: [JwtService, AuthService],
})
export class AuthModule {}
