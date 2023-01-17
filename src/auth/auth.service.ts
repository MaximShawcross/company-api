import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import User from 'src/users/user.entity';

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private jwtService: JwtService		
	) { }

	async validateUser(nick_name: string, password: string): Promise<any | null> {
		const userWithPass = await this.userService.findOne(nick_name);

		if (userWithPass && userWithPass.password === password) {
			const {password, ...user} = userWithPass;

			return user;
		}

		return null;
	}

	async login(user: User) {
		const payload = {
			username: user.nick_name,
			sub: user.id
		}

		return {
			access_token: this.jwtService.sign(payload)
		}
	}
}
