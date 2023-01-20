import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import User from 'src/users/user.entity';
import { IUser } from 'src/users/interfaces/user.interface';

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private jwtService: JwtService
	) { }

	async validateUser(nick_name: string, password: string): Promise<IUser | null> {
		const userWithPass = await this.userService.findOne(nick_name);

		if (userWithPass && userWithPass.password === password) {
			const { password, ...user } = userWithPass;

			return user;
		}

		return null;
	}

	async login(user: User) {
		const payload: IUser = {
			id: user.id,
			email: user.email,
			first_name: user.first_name,
			last_name: user.last_name,
			nick_name: user.nick_name,
			phone_number: user.phone_number,
			description: user.description,
			position: user.position,
			companies: user.companies
		}

		return {
			access_token: this.jwtService.sign(payload)
		}
	}
}
