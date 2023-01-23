import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtConstants } from "./constants";
import { IUser } from "src/users/interfaces/user.interface";

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwtConstants.secret,
		});
	}

	async validate(payload: IUser): Promise<IUser> {
		return {
			id: payload.id,
			email: payload.email,
			first_name: payload.first_name,
			last_name: payload.last_name,
			nick_name: payload.nick_name,
			phone_number: payload.phone_number,
			description: payload.description,
			position: payload.position,
			companies: payload.companies,
			roles: payload.roles
		}
	}

};
