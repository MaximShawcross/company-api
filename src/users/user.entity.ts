import { Entity } from "typeorm";

@Entity()
export default class User {
	constructor(name: string, lastName: string, isActive: boolean) {
		this.name = name;
		this.lastName = lastName;
		this.isActive = isActive;
	}

	id: number;

	name: string;

	lastName: string;

	isActive: boolean;
};
