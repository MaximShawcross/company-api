import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import User from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { Role } from 'src/common/decorators/roles/role.enum';
import { Request, UseGuards } from '@nestjs/common/decorators';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import JwtAuthGuard from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('users')
export class UsersController {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
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

	@Get("/admin")
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.Admin)
	getAdminRole(@Request() req) {
		console.log(req.user.roles);
	}
}
