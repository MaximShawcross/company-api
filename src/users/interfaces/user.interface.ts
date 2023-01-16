export interface IUser {
	userId: number,
	username: string,
}

export interface IUserWithPass extends IUser {
	password: string	
}