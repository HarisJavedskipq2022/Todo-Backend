import express from "express";
import { container } from "../../Infrastructure/DIContainer/invesify.config";
import { TodoController } from "../Controller/todo.controller";

const todoController = container.get<TodoController>(TodoController);
const todoRouter = express.Router();

todoRouter.post("/todo", todoController.createTask);
todoRouter.get("/todo/:id", todoController.getTask);
todoRouter.get("/todo", todoController.getAllTasks);
todoRouter.put("/todo/:id", todoController.updateTask);
todoRouter.delete("/todo/:id", todoController.deleteTask);

export default todoRouter;
