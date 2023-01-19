export interface IUser {
	id: number;
	email: string;
	first_name: string;
	last_name: string;
	nick_name: string;
	phone_number: string;
	description: string;
	position: string;
}

export interface IUserWithPass extends IUser{
	password: string;
}