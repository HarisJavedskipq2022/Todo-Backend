import { inject, injectable } from "inversify";
import { Todo } from "../../Domain/Entities/todo.entity";
import { TodoRepository } from "../../Infrastructure/Repositories/TodoRepository/todo.repository";
import { ITodoService } from "../Interfaces/ITodoService";

@injectable()
export class TodoService implements ITodoService {
	constructor(
		@inject("ITodoRepository") private todoRepository: TodoRepository
	) {}

	async getTodoById(id: string) {
		try {
			const todoDoc = await this.todoRepository.findById(id);
			if (!todoDoc) return { success: false, message: "Todo not found." };

			const todo = new Todo(
				todoDoc.title,
				todoDoc.description,
				todoDoc.status,
				todoDoc._id.toString()
			);
			return {
				success: true,
				data: todo,
				message: "Todo retrieved successfully.",
			};
		} catch (error) {
			return { success: false, message: "Failed to retrieve the todo." };
		}
	}

	async createTodo(todo: Todo) {
		try {
			const existingTodo = await this.todoRepository.findByCriteria({
				title: todo.title,
				description: todo.description,
			});

			if (existingTodo && existingTodo.length > 0) {
				return {
					success: false,
					message:
						"A todo with the same title and description already exists.",
				};
			}

			const savedTodo = await this.todoRepository.create(todo);
			const createdTodo = new Todo(
				savedTodo.title,
				savedTodo.description,
				savedTodo.status,
				savedTodo._id.toString()
			);

			return {
				success: true,
				data: createdTodo,
				message: "Todo created successfully.",
			};
		} catch (error) {
			return { success: false, message: "Failed to create the todo." };
		}
	}

	async getAllTodos(paginationOptions = { skip: 0, limit: 10 }) {
		try {
			const todos = await this.todoRepository.findAll(paginationOptions);
			const transformedTodos = todos.map(
				(todoDoc) =>
					new Todo(
						todoDoc.title,
						todoDoc.description,
						todoDoc.status,
						todoDoc._id.toString()
					)
			);
			return {
				success: true,
				data: transformedTodos,
				message: "Todos retrieved successfully.",
				totalCount: transformedTodos.length,
				pagination: paginationOptions,
			};
		} catch (error) {
			return { success: false, message: "Failed to fetch all todos." };
		}
	}

	async updateTodo(todo: Todo) {
		try {
			const updatedTodo = await this.todoRepository.update(
				todo.id!,
				todo
			);
			if (!updatedTodo)
				return {
					success: false,
					message: "Todo not found for update.",
				};

			const transformedTodo = new Todo(
				updatedTodo.title,
				updatedTodo.description,
				updatedTodo.status,
				updatedTodo._id.toString()
			);
			return {
				success: true,
				data: transformedTodo,
				message: "Todo updated successfully.",
			};
		} catch (error) {
			return { success: false, message: "Failed to update the todo." };
		}
	}

	async deleteTodo(id: string) {
		try {
			const result = await this.todoRepository.deleteById(id);

			if (!result)
				return {
					success: false,
					message: "Todo not found for deletion.",
				};

			return { success: true, message: "Todo deleted successfully." };
		} catch (error) {
			return { success: false, message: "Failed to delete the todo." };
		}
	}
}
