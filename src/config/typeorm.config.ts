import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Company } from "src/companies/company.entity";
import User from "src/users/user.entity";


export const typeOrmConfig: TypeOrmModuleOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'admin',
	database: 'company',
	entities: [User, Company],
	synchronize: true
}
