import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './modules/auth/local-auth.guard'; 
import { AuthService } from './modules/auth/auth.service'; 
import { UserRequest } from './types/types';

@Controller()
export class AppController {
	constructor(private authService: AuthService) { }

	@UseGuards(LocalAuthGuard)
	@Post("auth/login")
	async login(@Request() req: UserRequest) {

		return this.authService.login(req.user);
	}

}
