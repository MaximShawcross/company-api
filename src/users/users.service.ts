import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import User from './user.entity';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private usersRepository: Repository<User>
	) { }

	/// method can find user by id or nick_name
	async findOne(id: number): Promise<User | undefined>
	async findOne(nickName: string): Promise<User | undefined> 
	async findOne(idOrNick: string | number): Promise<User | undefined> {
		if( typeof idOrNick === "string" ) {
			return this.usersRepository.findOne({ 
				where: { nick_name: idOrNick },
				relations: ['companies']
			})
		} else {
			return this.usersRepository.findOne({ 
				where: { id: idOrNick },
				relations: ['companies']
			})
		} 
	}

}
