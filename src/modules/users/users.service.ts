import { CreateUserDto } from './dto/create-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import User from './user.entity';
import UpdateUserDto from './dto/update-user.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private usersRepository: Repository<User>,
		private dataSource: DataSource
	) { }

	/// method can find user by id or nick_name
	async findOne(id: number): Promise<User | undefined>
	async findOne(email: string): Promise<User | undefined> 
	async findOne(idOrNick: string | number): Promise<User | undefined> {
		if( typeof idOrNick === "string" ) {
			return this.usersRepository.findOne({ 
				where: { email: idOrNick },
				relations: ['companies']
			})
		} else {
			return this.usersRepository.findOne({ 
				where: { id: idOrNick },
				relations: ['companies']
			})
		} 
	}
	
	//admin meth for update choosen user
	async update(user: User, userDto: UpdateUserDto): Promise<User> {
		if (!user) {
			throw new NotFoundException();
		}

		for (let key in user) {
			for (let keyDto in userDto) {
				if (key === keyDto) {
					user[key] = userDto[keyDto];
				}
			}
		}

		return await this.dataSource.transaction(async (manager: EntityManager) => await manager.save(user));
	}

	//register
	async register(userDto: CreateUserDto): Promise<User> {
		const user = new User(
			userDto.email, userDto.password,
			userDto.first_name, userDto.last_name,
			userDto.nick_name, userDto.description,
			userDto.phone_number, userDto.position
		);
		
		console.log("user created!");

		return await this.dataSource.transaction(async (manager: EntityManager) => await manager.save(user));
	}

}
