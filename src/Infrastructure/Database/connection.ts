import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectToDatabase = async (): Promise<void> => {
	try {
		await mongoose.connect(
			process.env.DATABASE_CONNECTION_STRING as string
		);
		console.log("Successfully connected to MongoDB.");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		process.exit(1);
	}
};
