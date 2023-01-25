import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import LocalStrategy from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import JwtStrategy from './jwt.strategy';

@Module({
	imports: [
		UsersModule,
		PassportModule, 
		JwtModule.register({
			secret: jwtConstants.secret,
			signOptions: { expiresIn: '100d' }
		})
	],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	exports: [AuthService],
	controllers: [AuthController]
})
export class AuthModule { }
