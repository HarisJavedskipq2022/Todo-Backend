import { Todo } from "../../Domain/Entities/todo.entity";

export interface ITodoService {
	getTodoById(id: string): Promise<object>;
	createTodo(todo: Todo): Promise<object>;
	getAllTodos(): Promise<object>;
	updateTodo(todo: Todo): Promise<object>;
	deleteTodo(id: string): Promise<object>;
}
