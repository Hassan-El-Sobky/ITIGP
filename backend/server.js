import 'dotenv/config'
import express from 'express'
import products from './data/products.js'
import cors from 'cors'
import connectDb from './config/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errormiddleWare.js'



connectDb();
const app = express();

app.use(express.json())


app.use(cors({
    origin: 'http://localhost:3000'
}))

//when ever the route starts with 'api/products/ link to productRoutes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders',orderRoutes)


app.use(notFound);
app.use(errorHandler);



const port = process.env.PORT;


app.listen(port, console.log(`server runnig in ${process.env.NODE_ENV} mode on ${port}`.yellow.bold))