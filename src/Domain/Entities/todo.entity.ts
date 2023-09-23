import { v4 as uuidv4 } from "uuid";

export class Todo {
	id: string;
	title: string;
	description: string;
	status: string;

	constructor(
		title: string,
		description: string,
		status: string,
		id?: string
	) {
		this.id = id || uuidv4();
		this.title = title;
		this.description = description;
		this.status = status;
	}
}
