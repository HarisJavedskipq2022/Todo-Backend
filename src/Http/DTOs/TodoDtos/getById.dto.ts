import { z } from "zod";

export const getTodoByIdDTO = z.object({
	id: z.string().uuid("Invalid ID format."),
});
