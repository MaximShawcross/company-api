import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSchema } from 'src/models/user.model';
import { DataSource, EntityManager, Repository } from 'typeorm';
import User from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
	constructor(
		@InjectRepository(UserSchema) private userRepository: Repository<User>,
		private dataSource: DataSource
	) { }

	@Get("/find")
	async users(): Promise<User[]> {
		const users = await this.userRepository.find();

		return users;
	}

	@Post("/create")
	async create(@Body() userDto: CreateUserDto) {
		const user = new User(
			userDto.email, userDto.password, 
			userDto.first_name, userDto.last_name,
			userDto.nick_name, userDto.description,
			userDto.phone_number, userDto.position
		);

		return await this.dataSource.transaction(async (manager: EntityManager) => await manager.save(user));
	}
}
