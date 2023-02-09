import { IsString, IsEmail } from "class-validator";

export class CreateUserDto  {
	@IsString()
	first_name: string;

	@IsString()
	password: string;

	@IsString()
	last_name: string;

	@IsEmail()
	email: string;

	@IsString()
	nick_name: string;

	@IsString()
	phone_number: string;

	@IsString()
	description: string;

	@IsString()
	position: string;
};