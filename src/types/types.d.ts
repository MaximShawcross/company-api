import { Request } from "express";
import { IUserPayload } from "src/modules/users/interfaces/user.payload.interface";

export interface UserRequest extends Request {
	user: IUserPayload
}