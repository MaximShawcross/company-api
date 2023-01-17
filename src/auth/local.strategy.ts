import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import User from "src/users/user.entity";

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
	constructor( private authService: AuthService ) {
		super();
	}

	async validate(nickName: string, password: string): Promise<User> {
		const user = await this.authService.validateUser(nickName, password);

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}

};
