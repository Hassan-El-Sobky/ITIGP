import express from 'express'
import orderModel from '../models/orderModels.js'
import asyncHandler from 'express-async-handler'



export const addOrderItem = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const {orderItems,id,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice}=req.body;
    if(orderItems && orderItems.length ===0){
        res.status(400);
        throw new Error('No order Items')
    } else {
        const order = new orderModel({
            orderItems,user:id,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice
        })
        const createOrder=await order.save()
        res.status(201).json(createOrder)
    }
})

export const getAllOrders=asyncHandler(async(req,res)=>{
      const orders =await orderModel.find({}) ;
      res.json(orders);   

})


export const getOrderById=asyncHandler(async(req,res)=>{
    console.log(req.params);
    const order =await orderModel.findById(req.params.id).populate('user','name email') ;
    if(order){
        
        res.json(order);   
    } else {
        res.status(404);
       throw new Error('Order not found'); 
     }

})

