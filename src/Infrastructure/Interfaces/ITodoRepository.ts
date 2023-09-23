import { Document } from "mongoose";
import { Todo } from "../../Domain/Entities/todo.entity";

export interface ITodoDocument extends Document {
	title: string;
	description: string;
	status: string;
}

export interface PaginationOptions {
	skip: number;
	limit: number;
}

export interface ITodoRepository {
	findById(id: string): Promise<ITodoDocument | null>;
	create(todo: Todo): Promise<ITodoDocument>;
	findAll(paginationOptions?: PaginationOptions): Promise<ITodoDocument[]>;
	update(id: string, updatedData: object): Promise<ITodoDocument | null>;
	deleteById(id: string): Promise<ITodoDocument | null>;
	findByCriteria(criteria: object): Promise<ITodoDocument[]>;
}
