import 'dotenv/config'
import mongoose from 'mongoose'
import dotenv from 'dotenv'



const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {

            useUnifiedTopology: true,

            useNewUrlParser: true,
        })
        console.log(`MongoDB connected: ${connect.connection.host}`.cyan.underline);
    }
    catch (error) {

        console.error(`Error: ${error.message}`.magenta.underline.bold)
        process.exit(1)
    }
}
export default connectDb