import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSchema } from 'src/models/user.model';
import User from './user.entity';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(UserSchema) private usersRepository: Repository<User>
	) {
		
	}

	async findOne(nick_name: string): Promise<User | undefined> {
		return this.usersRepository.findOneBy({ nick_name })
	}

}
