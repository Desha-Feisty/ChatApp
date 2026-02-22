import { connect } from "mongoose";


export const connectDB = async () => {
    try {
        const conn = await connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error}`);
    }
};
