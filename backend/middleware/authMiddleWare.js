import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken'

import User from '../models/userModels.js'

// to protect any route pass this middleware first to check if the user is authorized
const protect = asyncHandler(async (req, res, next) => {
    let currentTOken = req.headers.authorization
    let token;
    if (currentTOken && currentTOken.startsWith('Bearer')) {

        try {
            token = currentTOken.split(' ')[1]
            let decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id)
            next()
        }
        catch (err) {
            console.log(err);
            res.status(401)
            throw new Error('NOT AUTHORIZED, token fail')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('NOT AUTHORIZED, no token')
    }
})










export default protect