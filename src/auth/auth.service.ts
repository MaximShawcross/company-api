import { Injectable } from '@nestjs/common';
import { IUser, IUserWithPass } from "../users/interfaces/user.interface";
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private jwtService: JwtService		
	) { }

	async validateUser(username: string, password: string): Promise<IUser | null> {
		const userWithPass = await this.userService.findOne(username);

		if (userWithPass && userWithPass.password === password) {
			const {password, ...user} = userWithPass;

			return user;
		}

		return null;
	}

	async login(user: IUser) {
		const payload = {
			username: user.username,
			sub: user.userId
		}

		return {
			access_token: this.jwtService.sign(payload)
		}
	}
}
