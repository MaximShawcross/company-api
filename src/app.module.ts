import { Module, Post, Request, UseGuards } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthGuard } from '@nestjs/passport/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
	imports: [
		AuthModule, 
		UsersModule,
		TypeOrmModule.forRoot(typeOrmConfig)
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule { 
	
}
