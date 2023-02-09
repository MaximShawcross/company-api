import { Body, Controller, Get, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import User from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { Role } from 'src/common/decorators/roles/role.enum';
import { Request, UseGuards } from '@nestjs/common/decorators';
import JwtAuthGuard from '../auth/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import UpdateUserDto from './dto/update-user.dto';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { UsersService } from './users.service';
import { Patch } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { UserRequest } from 'src/types/types';

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
	
	// register new user endpoint
	@Post("/create")
	async create(@Body() userDto: CreateUserDto): Promise<User> {
		const user = this.usersService.register(userDto);
		
		return user;
	}

	// update any user by admin endpoint 
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Roles(Role.Admin)
	@Patch("/admin/edit-user/:id")
	async changeUser(
		@Body() userDto: UpdateUserDto,
		@Param("id") id: string,
		@Request() req: UserRequest
	): Promise<User> {
		const user: User = await this.usersService.findOne(+id);

		return await this.usersService.update(user, userDto);
	}
	
	//get user self informatiom
	@UseGuards(JwtAuthGuard)
	@Get('/profile')
	async getProfile(@Request() req: UserRequest): Promise<User> {
		const userId = req.user.id;

		return await this.usersService.findOne(userId);
	}

}
