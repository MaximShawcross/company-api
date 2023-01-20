export class Company { 
	id: number;
	name: string;
	adress: string;
	serviceOfActivity: string;
	numberOfEmployees: number;
	description: string;
	type: string;

	constructor(
		name: string, adress: string, 
		serviceOfActivity: string, numberOfEmployees: number,
		description: string, type: string
	) {
		this.name = name;
		this.adress = adress;
		this.serviceOfActivity = serviceOfActivity;
		this.numberOfEmployees = numberOfEmployees;
		this.description = description;
		this.type = type;
	}

}
