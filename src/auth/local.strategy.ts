import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { IUser } from "../users/interfaces/user.interface";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
	constructor( private authService: AuthService ) {
		super();
	}

	async validate(username: string, password: string): Promise<IUser> {
		const user = await this.authService.validateUser(username, password);

		if (!user) {
			throw new UnauthorizedException();
		}

		return user;
	}

};
