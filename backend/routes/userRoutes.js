import express from 'express'
import Product from '../models/productModels.js'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/userControllers.js'
import protect from '../middleware/authMiddleWare.js'


router.route('/login').post(authUser)
// to run this route by middleWare first Just add the middleware as a param before the contraller 
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

router.route('/').post(registerUser)


export default router