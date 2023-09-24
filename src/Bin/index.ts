import "reflect-metadata";
import dotenv from "dotenv";
import express from "express";
import { connectToDatabase } from "../Infrastructure/Database/connection";
import todoRouter from "../Http/Routes/todo";
import cors from "cors";

dotenv.config();

const app = express();
const port = Number(process.env.PORT);

app.use(express.json());
app.use(cors());
app.use("/api/v1", todoRouter);

connectToDatabase()
	.then(() => {
		app.listen(port, "0.0.0.0", () => {
			console.log(`Server is running on port ${port}.`);
		});
	})
	.catch((err) => {
		console.error("Failed to connect to the database:", err);
		process.exit(1);
	});
