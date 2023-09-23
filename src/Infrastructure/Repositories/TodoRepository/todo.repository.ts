import { injectable } from "inversify";
import { Todo } from "../../../Domain/Entities/todo.entity";
import { ITodoRepository } from "../../Interfaces/ITodoRepository";
import TodoModel from "../../Models/todo.model";

@injectable()
export class TodoRepository implements ITodoRepository {
	constructor() {}

	async findById(id: string) {
		try {
			return await TodoModel.findById(id);
		} catch (error) {
			throw error;
		}
	}

	async create(todo: Todo) {
		try {
			const newTodo = new TodoModel(todo);
			return await newTodo.save();
		} catch (error) {
			throw error;
		}
	}

	async findAll(paginationOptions = { skip: 0, limit: 10 }) {
		try {
			return await TodoModel.find()
				.skip(paginationOptions.skip)
				.limit(paginationOptions.limit);
		} catch (error) {
			throw error;
		}
	}

	async update(id: string, updatedData: object) {
		try {
			return await TodoModel.findByIdAndUpdate(id, updatedData, {
				new: true,
			});
		} catch (error) {
			throw error;
		}
	}

	async deleteById(id: string) {
		try {
			return await TodoModel.findByIdAndDelete(id);
		} catch (error) {
			throw error;
		}
	}

	async findByCriteria(criteria: object) {
		try {
			return await TodoModel.find(criteria);
		} catch (error) {
			throw error;
		}
	}
}
