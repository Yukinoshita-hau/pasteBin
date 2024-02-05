export interface IUserSchema extends Document {
	id: string;
	name: string;
	email: string;
	password: string;
}
