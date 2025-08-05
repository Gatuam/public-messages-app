import mongoose from "mongoose";

type ConnectObject = {
    isConnected? : number
}
const connection : ConnectObject = {}

async function dbConnect() : Promise<void> {
    if(connection.isConnected) {
        console.log("Already connect to db")
        return
    }
    try {
        const connectDb = await mongoose.connect(process.env.MONGO_URI! || '')
        connection.isConnected = connectDb.connections[0].readyState
        console.log('Db is connected')
    } catch (error) {
        console.log('Fail to connect db')
        process.exit(1)
    }
    
}
export default dbConnect;