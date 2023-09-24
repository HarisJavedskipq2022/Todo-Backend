import "reflect-metadata";
import { TodoService } from "../src/Application/Services/todo.service";
import { Todo } from "../src/Domain/Entities/todo.entity";
import {
	ITodoRepository,
	ITodoDocument,
} from "../src/Infrastructure/Interfaces/ITodoRepository";
import { v4 as uuidv4 } from "uuid";

const mockTodoDoc: Partial<ITodoDocument> = {
	_id: uuidv4(),
	title: "Test Todo",
	description: "This is a test todo.",
	status: "Pending",
	save: jest.fn(),
};

const mockTodoRepository: jest.Mocked<ITodoRepository> = {
	findById: jest.fn().mockResolvedValue(mockTodoDoc as ITodoDocument),
	create: jest.fn().mockResolvedValue(mockTodoDoc as ITodoDocument),
	findAll: jest.fn().mockResolvedValue([mockTodoDoc as ITodoDocument]),
	update: jest.fn().mockResolvedValue(mockTodoDoc as ITodoDocument),
	deleteById: jest.fn().mockResolvedValue(mockTodoDoc as ITodoDocument),
	findByCriteria: jest.fn().mockResolvedValue([]),
};

describe("TodoService", () => {
	let service: TodoService;

	beforeEach(() => {
		service = new TodoService(mockTodoRepository);
	});

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("should fetch a todo by id", async () => {
		const result = await service.getTodoById(mockTodoDoc._id!);
		expect(result.success).toBe(true);
		expect(result.data?.id).toBe(mockTodoDoc._id);
		expect(result.data?.title).toBe(mockTodoDoc.title);
		expect(result.data?.description).toBe(mockTodoDoc.description);
	});

	it("should not create a todo with duplicate title and description", async () => {
		const todo = new Todo("Test Todo", "This is a test todo.", "Pending");

		mockTodoRepository.findByCriteria.mockResolvedValue([
			mockTodoDoc as ITodoDocument,
		]);

		const result = await service.createTodo(todo);
		expect(result.success).toBe(false);
		expect(result.message).toBe(
			"A todo with the same title and description already exists."
		);

		expect(mockTodoRepository.findByCriteria).toHaveBeenCalledWith({
			title: todo.title,
			description: todo.description,
		});
	});
});
