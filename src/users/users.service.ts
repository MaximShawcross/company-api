import { Injectable } from '@nestjs/common';
import { IUser, IUserWithPass } from './interfaces/user.interface';

@Injectable()
export class UsersService {
	private users: IUserWithPass[] = [
		{
			userId: 1,
			username: "user_1",
			password: "password_1"
		},
		{
			userId: 2,
			username: "user_2",
			password: "password_2"
		}
	];

	async findOne(username: string): Promise<IUserWithPass | undefined> {
		return this.users.find((user: IUser) => user.username === username)
	}

}
