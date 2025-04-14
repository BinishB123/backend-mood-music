import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv();

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MOGO_URL + "");
        console.log("MONGO connected");
    } catch (error) {
        console.log("error ", error.message);
        return;
    }
};


export default dbConnect
