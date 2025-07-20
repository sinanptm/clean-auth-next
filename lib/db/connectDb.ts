import { MONGO_URI } from "@/config";
import mongoose from "mongoose";

/**
 * Connects to the MongoDB database.
 * Checks for existing connection before attempting to connect.
 *
 * @returns A promise that resolves to true if the connection is successful, or rejects with an error.
 */
const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("DB ALREADY CONNECTED ✅");
      return Promise.resolve(true);
    }

    // Check if connection is in progress
    if (mongoose.connection.readyState === 2) {
      console.log("DB CONNECTION IN PROGRESS ⏳");
      // Wait for the connection to complete
      await new Promise((resolve, reject) => {
        mongoose.connection.once("connected", resolve);
        mongoose.connection.once("error", reject);
      });
      return Promise.resolve(true);
    }

    // Establish new connection
    const { connection } = await mongoose.connect(MONGO_URI);

    if (connection.readyState === 1) {
      console.log("DB CONNECTED ✅");
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error("DB CONNECTION ERROR ❌:", error);
    return Promise.reject(error);
  }
};

export default connectDB;
