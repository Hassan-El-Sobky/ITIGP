import mongoose from 'mongoose';
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import Product from './models/productModels.js'
import Order from './models/orderModels.js'
import User from './models/userModels.js'
import products from './data/products.js'
import users from './data/users.js'
import colors from 'colors'

dotenv.config({ path: '../config.env' })

connectDb();
const importData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();
        await Order.deleteMany();

        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id

        const sampleProducts = products.map(product => {
            return { ...product, user: adminUser }
        })

        await Product.insertMany(sampleProducts)
        console.log('data successfully loaded'.green.bold);
        process.exit()
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

const destroyData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();
        await Order.deleteMany();
        console.log('data DESTRYED!!'.red.bold);
        process.exit()
    }
    catch (error) {
        console.error(error)
        process.exit(1)
    }
}


if (process.argv[2] === '--d') {
    destroyData()
} else if (process.argv[2] === '--import') {
    importData()
}