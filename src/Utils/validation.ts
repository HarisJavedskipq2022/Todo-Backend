import { z, ZodError } from "zod";

export function validateData(data: any, schema: z.ZodSchema<any>) {
	try {
		const result = schema.parse(data);
		return result;
	} catch (error) {
		if (error instanceof ZodError) {
			console.error(error.message);
			return new Error();
		}
	}
}
