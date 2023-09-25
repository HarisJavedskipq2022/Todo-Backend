import { TodoService } from "../../Application/Services/todo.service";
import { Container } from "inversify";
import { TodoRepository } from "../Repositories/TodoRepository/todo.repository";

export const container = new Container({
	autoBindInjectable: true,
	defaultScope: "Singleton",
});

container.bind<TodoService>("ITodoService").to(TodoService);
container.bind<TodoRepository>("ITodoRepository").to(TodoRepository);
