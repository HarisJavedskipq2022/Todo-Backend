import "reflect-metadata";
import { connectToDatabase } from "../src/Infrastructure/Database/connection";
import request from "supertest";
import express from "express";
import todoRouter from "../src/Http/Routes/todo";

const app = express();
app.use(express.json());
app.use("/api/v1", todoRouter);

let createdTodoId: string;

beforeAll(async () => {
	await connectToDatabase();
});

describe("Todo CRUD Operations", () => {
	it("should fetch all todos", async () => {
		const res = await request(app).get("/api/v1/todo");

		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("data");
		expect(res.body).toMatchObject({
			message: "Todos retrieved successfully.",
			totalCount: expect.any(Number),
			pagination: {
				skip: expect.any(Number),
				limit: expect.any(Number),
			},
			data: expect.any(Array),
		});
	}, 10000);

	it("should create a new todo", async () => {
		const newTodo = {
			title: "Test Todo",
			description: "Test Description",
			status: "Pending",
		};
		const res = await request(app).post("/api/v1/todo").send(newTodo);

		if (
			res.body.message ===
			"A todo with the same title and description already exists."
		) {
			expect(res.statusCode).toEqual(400);
		} else {
			expect(res.statusCode).toEqual(201);
			expect(res.body).toHaveProperty("data");
			expect(res.body.data.title).toBe(newTodo.title);
			expect(res.body.data.description).toBe(newTodo.description);
			createdTodoId = res.body.data._id;
		}
	}, 10000);

	it("should fetch a specific todo by id", async () => {
		const res = await request(app).get(`/api/v1/todo/${createdTodoId}`);
		if (res.body.message === "Todo not found.") {
			expect(res.statusCode).toEqual(404);
		} else {
			expect(res.statusCode).toEqual(200);
			expect(res.body).toHaveProperty("data");
			expect(res.body.data._id).toBe(createdTodoId);
		}
	}, 10000);

	it("should update a specific todo", async () => {
		const updatedTodo = {
			title: "Updated Test Todo",
			description: "Updated Test Description",
			status: "Done",
		};
		const res = await request(app)
			.put(`/api/v1/todo/${createdTodoId}`)
			.send(updatedTodo);
		if (res.body.message === "Todo not found for update.") {
			expect(res.statusCode).toEqual(404);
		} else {
			expect(res.statusCode).toEqual(200);
			expect(res.body).toHaveProperty("data");
			expect(res.body.data.title).toBe(updatedTodo.title);
			expect(res.body.data.description).toBe(updatedTodo.description);
		}
	}, 10000);

	it("should delete a specific todo", async () => {
		const res = await request(app).delete(`/api/v1/todo/${createdTodoId}`);
		if (res.body.message === "Todo not found for deletion.") {
			expect(res.statusCode).toEqual(404);
		} else {
			expect(res.statusCode).toEqual(200);
			expect(res.body).toHaveProperty(
				"message",
				"Todo deleted successfully."
			);
		}
	}, 10000);
});
