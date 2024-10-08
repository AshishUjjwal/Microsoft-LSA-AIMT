import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';

configDotenv(); // Load environment variables from.env file

const connectdb = async() => {
    // Connect to MongoDB database
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectdb;