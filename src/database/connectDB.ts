import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('MongoDB connected');
            
        })
        connection.on('error', (error) => {
            console.log('MongoDB connection error', error);
            process.exit(1);            
        })
        
    } catch (error: unknown) {
        console.log(error);
        throw new Error(error as string)     
    }
}