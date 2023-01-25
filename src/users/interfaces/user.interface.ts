import { Role } from "src/common/decorators/roles/role.enum";
import { Company } from "src/companies/company.entity";

export interface IUser {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	nick_name: string;
	phone_number: string;
	description: string;
	position: string;
	companies: Company[],
	roles: Role[]
}

export interface IUserWithPass extends IUser{
	password: string;
}