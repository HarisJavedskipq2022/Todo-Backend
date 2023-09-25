import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { validateData } from "../../Utils/validation";
import { getTodoByIdDTO } from "../DTOs/TodoDtos/getById.dto";
import { updateTodoDTO } from "../DTOs/TodoDtos/update.dto";
import { TodoService } from "./../../Application/Services/todo.service";
import { createTodoDTO } from "./../DTOs/TodoDtos/create.dto";
import { deleteTodoDTO } from "../DTOs/TodoDtos/delete.dto";

@injectable()
export class TodoController {
	constructor(@inject("ITodoService") private todoService: TodoService) {}

	createTask = async (req: Request, res: Response) => {
		const data = validateData(req.body, createTodoDTO);
		const result = await this.todoService.createTodo(data);

		if (result.success) {
			res.status(201).json({
				message: result.message,
				data: result.data,
			});
		} else {
			res.status(400).json({ message: result.message });
		}
	};

	getTask = async (req: Request, res: Response) => {
		const data = validateData({ id: req.params.id }, getTodoByIdDTO);
		const result = await this.todoService.getTodoById(data.id);

		if (result.success) {
			res.status(200).json({
				message: result.message,
				data: result.data,
			});
		} else {
			res.status(404).json({ message: result.message });
		}
	};

	getAllTasks = async (req: Request, res: Response) => {
		const paginationOptions = {
			skip: Number(req.query.skip) || 0,
			limit: Number(req.query.limit) || 10,
		};

		const result = await this.todoService.getAllTodos(paginationOptions);

		if (result.success) {
			res.status(200).json({
				message: result.message,
				totalCount: result.totalCount,
				pagination: result.pagination,
				data: result.data,
			});
		} else {
			res.status(500).json({ message: result.message });
		}
	};

	updateTask = async (req: Request, res: Response) => {
		const validatedId = validateData({ id: req.params.id }, getTodoByIdDTO);
		const validatedData = validateData(req.body, updateTodoDTO);

		const todoToUpdate = {
			...validatedData,
			id: validatedId.id,
		};

		const result = await this.todoService.updateTodo(todoToUpdate);

		if (result.success) {
			res.status(200).json({
				message: result.message,
				data: result.data,
			});
		} else {
			res.status(404).json({ message: result.message });
		}
	};

	deleteTask = async (req: Request, res: Response) => {
		const validatedId = validateData({ id: req.params.id }, deleteTodoDTO);

		const result = await this.todoService.deleteTodo(validatedId.id);

		if (result.success) {
			res.status(200).json({
				message: result.message,
			});
		} else {
			res.status(404).json({ message: result.message });
		}
	};
}
