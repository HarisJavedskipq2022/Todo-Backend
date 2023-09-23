import "reflect-metadata";
import express from "express";
import { connectToDatabase } from "./Infrastructure/Database/connection";
import todoRouter from "./Http/Routes/todo";

const app = express();
const PORT = 3000;

connectToDatabase();

app.use(express.json());
app.use("/api/v1", todoRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
