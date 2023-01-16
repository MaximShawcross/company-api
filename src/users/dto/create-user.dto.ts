import { IsString, IsBoolean } from "class-validator";

export class CreateUserDto  {
	@IsString()
	name: string;

	@IsString()
	lastName: string;

	@IsBoolean()
	isActive: boolean
};
