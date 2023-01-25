import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import User from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { Role } from 'src/common/decorators/roles/role.enum';
import { Request, UseGuards } from '@nestjs/common/decorators';
import JwtAuthGuard from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import UpdateUserDto from './dto/update-user.dto';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { UsersService } from './users.service';
import { Patch } from '@nestjs/common/decorators/http/request-mapping.decorator';

@Controller('users')
export class UsersController {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
		private usersService: UsersService,
		private dataSource: DataSource
	) { }
	// find all users(admin role)
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.Admin)
	@Get("/find")
	async users(): Promise<User[]> {
		const users = await this.userRepository.find();

		return users;
	}


	//create user(register)
	@Post("/create")
	async create(@Body() userDto: CreateUserDto): Promise<User> {
		const user = new User(
			userDto.email, userDto.password,
			userDto.first_name, userDto.last_name,
			userDto.nick_name, userDto.description,
			userDto.phone_number, userDto.position
		);

		return await this.dataSource.transaction(async (manager: EntityManager) => await manager.save(user));
	}

	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.Admin)
	// @Patch("/admin/edit-user/::id")
	@Patch("/admin/edit-user/:id")
	async changeUser(
		@Body() userDto: UpdateUserDto, 
		@Param("id") id: string,
		@Request() req
	): Promise<User> {
		const user: User = await this.usersService.findOne(+id);

		return await this.usersService.update(user, userDto);
		return user;
	}

	// test method
	@Get("/admin")
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.Admin)
	getAdminRole(@Request() req) {
		console.log(req.user.roles);
	}
}
