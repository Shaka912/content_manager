import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local")
}

export const connectdb = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URI);
        if(conn.readyState === 1) {
            console.log("Connected to MongoDB")
            return Promise.resolve(true)
        }
    }
     catch (error) {
        return Promise.reject(error)
    }
}