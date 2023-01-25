import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtConstants } from "./constants";
import { IUser } from "../users/interfaces/user.interface";
import { IUserPayload } from "../users/interfaces/user.payload.interface";

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: jwtConstants.secret,
		});
	}

	async validate(payload: IUser): Promise<IUserPayload> {
		return {
			id: payload.id,
			email: payload.email,
			nick_name: payload.nick_name,
			roles: payload.roles
		}
	}

};
