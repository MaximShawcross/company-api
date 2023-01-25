import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IUser, IUserWithPass } from "./interfaces/user.interface";
import { Company } from "src/companies/company.entity";
import { Role } from "src/common/decorators/roles/role.enum";

@Entity()
export default class User implements IUserWithPass {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	first_name: string;

	@Column()
	last_name: string;

	@Column()
	nick_name: string;

	@Column()
	phone_number: string;

	@Column()
	description: string;

	@Column()
	position: string;
	
	@OneToMany(type => Company, company => company.user)
	companies: Company[];

	@Column({
		type: "enum",
		enum: Role,
		array: true,
		nullable: true,
		default: [Role.User],
	})
	roles: Role[]

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

};
