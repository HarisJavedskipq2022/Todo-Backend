import { z } from "zod";

export const updateTodoDTO = z.object({
	title: z.string().nonempty("Title is required.").optional(),
	description: z.string().optional(),
	status: z.string().nonempty("Status is required.").optional(),
});
