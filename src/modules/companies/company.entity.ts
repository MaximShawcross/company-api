import User from "../users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Company { 
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	adress: string;
	
	@Column()
	serviceOfActivity: string;
	
	@Column()
	numberOfEmployees: number;
	
	@Column()
	description: string;
	
	@Column()
	type: string;

	@ManyToOne((type) => User, (user) => user.companies)
	user: User;

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
