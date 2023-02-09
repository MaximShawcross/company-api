import { IsNumber, IsString } from "class-validator";

export class CreateCompanyDto {
	@IsString()
	name: string;

	@IsString()
	adress: string;

	@IsString()
	serviceOfActivity: string

	@IsString()
	description: string;
	
	@IsString()
	type: string;
	
	@IsNumber()
	numberOfEmployees: number;

}
