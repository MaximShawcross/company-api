import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Company } from "src/modules/companies/company.entity";
import User from "src/modules/users/user.entity";


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
