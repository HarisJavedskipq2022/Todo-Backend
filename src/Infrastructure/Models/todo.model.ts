import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const todoSchema = new mongoose.Schema(
	{
		_id: {
			type: String,
			default: uuidv4,
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const TodoModel = mongoose.model("Todo", todoSchema);
export default TodoModel;
