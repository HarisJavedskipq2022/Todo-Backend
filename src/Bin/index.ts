import "reflect-metadata";
import express from "express";
import { connectToDatabase } from "../Infrastructure/Database/connection";
import todoRouter from "../Http/Routes/todo";
import dotenv from "dotenv";
dotenv.config();

const app = express();

connectToDatabase();

app.use(express.json());
app.use("/api/v1", todoRouter);

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}.`);
});
