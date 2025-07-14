import { MONGO_URI } from "@/config";
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(MONGO_URI);
        if (connection.readyState === 1) {
            console.log("DB CONNECTED ✅");

            return Promise.resolve(true);
        }
    } catch (error) {
        console.error(error);
        return Promise.reject(error);
    }
};

export default connectDB;