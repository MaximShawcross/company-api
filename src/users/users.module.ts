import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from 'src/models/user.model';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			UserSchema
		])
	],
	providers: [UsersService],
	exports: [UsersService],
	controllers: [UsersController]
})
export class UsersModule { }
