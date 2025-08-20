import mongoose, { mongo } from "mongoose";
import { config } from "dotenv";
config()
const MONGODB_URI = "mongodb+srv://zalkebhavesh:j0AVai8KaLYMuS0A@cluster0.ka1odf9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
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