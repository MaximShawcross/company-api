import { Entity } from "typeorm";
import { IUser, IUserWithPass } from "./interfaces/user.interface";

@Entity()
export default class User implements IUserWithPass {
	constructor(
		email: string, password: string,
		first_name: string, last_name: string,
		nick_name: string, phone_number: string,
		description: string, position: string
	) {
		this.email = email;
		this.password = password;
		this.first_name = first_name;
		this.last_name = last_name;
		this.nick_name = nick_name;
		this.description = description;
		this.phone_number = phone_number
		this.position = position;
	}

	id: number;

	email: string;

	password: string;

	first_name: string;

	last_name: string;

	nick_name: string;

	phone_number: string;

	description: string;

	position: string;
};
