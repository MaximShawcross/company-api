import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { UserSchema } from "src/model/user.model";

export const typeOrmConfig: TypeOrmModuleOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: 'admin',
	database: 'company',
	entities: [UserSchema],
	synchronize: true
}
