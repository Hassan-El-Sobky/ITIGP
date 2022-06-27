import React, {  useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'

import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {saveShippingAddress} from '../Redux/actions/cartAction'
import { useNavigate, Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from './../Redux/actions/orderAction';
const PlaceOrderScreen = () => {
    const cart=useSelector(state=>state.cart);
    const dispatch=useDispatch();
    const navigate=useNavigate();
      // Calc Price
      cart.itemsPrice=cart.cartItems.reduce((acc,item)=>acc +item.price * item.qty,0)
     cart.shippingPrice=cart.itemsPrice >100?0:100;
     cart.taxPrice=Number((0.15*cart.itemsPrice).toFixed(2));


     const orderCreate=useSelector(state=>state.orderCreate);
     const {order,success,error}=orderCreate

   useEffect(()=>{
    if(success){
         navigate(`/order/${order._id}`)
    }
   },[success])

    const placeorderHandler=(e)=>{
     e.preventDefault();
      dispatch(createOrder({
        orderItems:cart.cartItems,
        shippingAddress:cart.shippingAddress,
        paymentMethod:cart.paymentMethod,
        itemsPrice:cart.itemsPrice,
        shippingPrice:cart.shippingPrice,
        taxPrice:cart.taxPrice,
        totalPrice:cart.totalPrice,
        id:JSON.parse(localStorage.getItem('userInfo'))._id
      }))
    }

    return (
        <>
          <CheckoutSteps step1 step2 step3 step4 />
          <Row>
            <Col md={8}>
                <ListGroup variant='flush' >
                   <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Address:</strong>
                        {cart.shippingAddress.address},
                        {cart.shippingAddress.city},
                        {cart.shippingAddress.postalCode},{' '}
                        {cart.shippingAddress.country}
                    </p>
                   </ListGroup.Item>
                   <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <strong>Method:</strong>
                    {cart.paymentMethod}
                   </ListGroup.Item>
                </ListGroup>
                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {cart.cartItems.length===0?<Message>Your Cart is Empty</Message>:(
                        <ListGroup variant='flush'>
                         {cart.cartItems.map((item,index)=>(
                            <ListGroup.Item key={index}>
                                 <Row>
                                    <Col md={1}>
                                    <Image src={item.image} fluid rounded/>
                                    </Col>
                                    <Col>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={4}>
                                        {item.qty} x ${item.price}=${item.qty*item.price}
                                    </Col>

                                    <Col md={4}>
                                        <Card>
                                            <ListGroup variant='flush'>
                                                <ListGroup.Item>
                                                    <h2>Order Summary</h2>
                                                    </ListGroup.Item>
                                                    <ListGroup.Item>
                                                        <Row>
                                                            <Col>
                                                            Items
                                                            </Col>
                                                            <Col>
                                                            ${cart.itemsPrice}
                                                            </Col>
                                                        </Row>
                                                        </ListGroup.Item>
                                                        <ListGroup.Item>
                                                        <Row>
                                                            <Col>
                                                            Shipping
                                                            </Col>
                                                            <Col>
                                                            ${cart.shippingPrice}
                                                            </Col>
                                                        </Row>

                                                        </ListGroup.Item>
                                                        <ListGroup.Item>
                                                        <Row>
                                                            <Col>
                                                            Tax
                                                            </Col>
                                                            <Col>
                                                            ${cart.taxPrice}
                                                            </Col>
                                                        </Row>
                                                        </ListGroup.Item>
                                                        <ListGroup.Item>
                                                            {error && <Message variant='danger'>
                                                                {error}
                                                                </Message>}
                                                        </ListGroup.Item>
                                                        <ListGroup.Item>
                                                            <Button type='button' className='btn-blcok'
                                                            disabled={cart.cartItems===0}
                                                            onClick={placeorderHandler}
                                                            >
                                                             Place Order
                                                            </Button>
                                                        </ListGroup.Item>
                                            </ListGroup>
                                        </Card>
                                    </Col>
                                 </Row>
                            </ListGroup.Item>
                         ))}
                        </ListGroup>
                    )}
                </ListGroup.Item>
            </Col>
            </Row>  
        </>
    );
};

export default PlaceOrderScreen;