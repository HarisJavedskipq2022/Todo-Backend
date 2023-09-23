import { z } from "zod";

export const createTodoDTO = z.object({
	title: z.string().nonempty("Title is required."),
	description: z.string().nonempty("Description is required"),
	status: z.string().nonempty("Status is required."),
});
