import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { UserRequest } from 'src/types/types';
import JwtAuthGuard from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController { 
	constructor(private authService: AuthService) { }

	@UseGuards(LocalAuthGuard)
	@Post("/login")
	async login(@Request() req: UserRequest) {

		return this.authService.login(req.user);
	}

}
