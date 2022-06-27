import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import { addOrderItem,getAllOrders,getOrderById } from '../controllers/orderController.js'

router.route('/').post(addOrderItem)
router.route('/allOrders').get(getAllOrders)
router.route('/:id').get(getOrderById);
export default router;