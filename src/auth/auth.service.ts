import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import User from 'src/users/user.entity';
import { IUser } from 'src/users/interfaces/user.interface';
import { IUserPayload } from '../users/interfaces/user.payload.interface';

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private jwtService: JwtService
	) { }

	async validateUser(email: string, password: string): Promise<IUser | null> {
		const userWithPass = await this.userService.findOne(email);

		if (userWithPass && userWithPass.password === password) {
			const { password, ...user } = userWithPass;

			return user;
		}

		return null;
	}

	async login(user: User) {
		const payload: IUserPayload = {
			id: user.id,
			email: user.email,	
			nick_name: user.nick_name,
			roles: user.roles
		}

		return {
			access_token: this.jwtService.sign(payload)
		}
	}
}
