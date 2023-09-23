import { z } from "zod";

export const deleteTodoDTO = z.object({
	id: z.string().uuid("Invalid ID format."),
});
