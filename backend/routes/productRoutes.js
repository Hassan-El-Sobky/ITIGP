import express from 'express'
import Product from '../models/productModels.js'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import { getProductById, getProducts } from '../controllers/productControllers.js'

router.route('/').get(getProducts)
router.route('/:id').get(getProductById)

export default router;