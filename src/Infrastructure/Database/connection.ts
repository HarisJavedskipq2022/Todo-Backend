import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectToDatabase = async (): Promise<void> => {
	const connectionString = process.env.DATABASE_CONNECTION_STRING;

	if (!connectionString) {
		console.error("DATABASE_CONNECTION_STRING is not set.");
		process.exit(1);
	}

	try {
		await mongoose.connect(connectionString);
		console.log("Successfully connected to MongoDB.");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		process.exit(1);
	}
};
