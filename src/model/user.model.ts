import User from "src/users/user.entity";
import { EntitySchema } from "typeorm";

export const UserSchema = new EntitySchema<User>({
	name: "User",
	target: User,
	columns: {
		id: {
			type: Number,
			primary: true,
			generated: true
		},
		first_name: {
			type: String
		},
		last_name: {
			type: String,
		},
		password: {
			type: String
		},
		email: {
			type: String
		},
		nick_name: {
			type: String
		},
		phone_number: {
			type: String
		},
		description: {
			type: String
		},
		position: {
			type: String
		}
	}

})