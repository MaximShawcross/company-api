import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "@users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/typeorm.config";
import { CompaniesModule } from "@companies/companies.module";

@Module({
	imports: [
		AuthModule, 
		UsersModule,
		CompaniesModule,
		
		TypeOrmModule.forRoot(typeOrmConfig)
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule { }
