import { TodoService } from "../../Application/Services/todo.service";
import { Container } from "inversify";
import { TodoRepository } from "../Repositories/TodoRepository/todo.repository";

export const container = new Container({
	autoBindInjectable: true,
	defaultScope: "Singleton",
});

container.bind<TodoService>("TodoService").to(TodoService);
container.bind<TodoRepository>("TodoRepository").to(TodoRepository);
