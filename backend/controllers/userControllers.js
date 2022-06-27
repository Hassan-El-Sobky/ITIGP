import express from 'express'
import asyncHandler from 'express-async-handler'
import User from '../models/userModels.js'
import generateToken from '../utiles/generateToken.js'


// @ desc Auth user & get token
// @route POST /api/users/login
// @access public
export const authUser = asyncHandler(async (req, res) => {
    try {


        const { email, password } = req.body
        const user = await User.findOne({ email }).select('+password')


        const token = generateToken(user._id)



        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token
            })
        }
        else {
            res.status(401)
            throw new Error('Invalid Email or Password')
        }
    }
    catch (err) {
        res.status(401)
        throw new Error('Invalid Email or Password')
    }
})

// @ desc Post register new user
// @route POST /api/users
// @access public
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    // check if user exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }
    const user = await User.create({
        name,
        email,
        password
    })
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('invalid user data')
    }
})

// @ desc GET user profile
// @route POST /api/users/profile
// @access protected
export const getUserProfile = asyncHandler(async (req, res) => {


    const user = await User.findById(req.user)
    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,

        })
    }
    else {
        res.status(404)
        throw new Error('user not found')
    }
})


// @ desc Update user profile
// @route PUT /api/users/profile
// @access private
export const updateUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }

        const updateUser = await user.save()

        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: generateToken(updateUser._id)
        })
    }
    else {
        res.status(404)
        throw new Error('user not found')
    }
})