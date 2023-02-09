import { Role } from "src/common/decorators/roles/role.enum";

export interface IUserPayload {
	id: number;
	email: string;
	nick_name: string;
	roles: Role[]
}