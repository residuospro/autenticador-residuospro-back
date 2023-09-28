import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(String(process.env.DB_CONFIG));

const dbConnection = mongoose.connection;

export default dbConnection;
