import mongoose, { mongo } from "mongoose";
import { config } from "dotenv";
config()
// const MONGODB_URI = "mongodb+srv://bhaveshzalke:bhaveshzalke@cluster0.b7odtn0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const MONGODB_URI = "mongodb+srv://bhaveshzalke:bhaveshzalke@cluster0.bwql78t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
type CoonectionObject = {
    isConnected?: number
}

const connection: CoonectionObject = {}


// void  == data koi bhi aaye muze koi problem nhi
async function dbConnect(): Promise<void> {
    if (connection?.isConnected) {
        console.log(`Already database connected`)
        return
    }

    try {
        const db = await mongoose.connect(MONGODB_URI || '');
        connection.isConnected = db.connections[0].readyState;

        console.log(`Db Connected successfully`)
    } catch (error) {
        console.log("Database connection failed", error);
        process.exit(1)
    }
}


export default dbConnect;