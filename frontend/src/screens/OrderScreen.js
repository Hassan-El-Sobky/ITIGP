import React, {  useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'

import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {saveShippingAddress} from '../Redux/actions/cartAction'
import { useNavigate, Link,useParams } from 'react-router-dom';
import Loader from '../components/Loader'
import { getOrderDetails } from './../Redux/actions/orderAction';
const OrderScreen = () => {
    const cart=useSelector(state=>state.cart);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const params=useParams();

     const orderDetails=useSelector(state=>state.orderDetails);
     const {order,loading,error}=orderDetails
        console.log(order);
   useEffect(()=>{
      dispatch(getOrderDetails(params.id))
   },[])

    // const placeorderHandler=(e)=>{
    //  e.preventDefault();
    //   dispatch(c({
    //     orderItems:cart.cartItems,
    //     shippingAddress:cart.shippingAddress,
    //     paymentMethod:cart.paymentMethod,
    //     itemsPrice:cart.itemsPrice,
    //     shippingPrice:cart.shippingPrice,
    //     taxPrice:cart.taxPrice,
    //     totalPrice:cart.totalPrice,
    //     id:JSON.parse(localStorage.getItem('userInfo'))._id
    //   }))
    // }

    return loading ? <Loader></Loader>: error ? <Message variant='danger'>{error}</Message>:
    <>
    <h1>Order {order._id}</h1>
    <Row>
            <Col md={8}>
                <ListGroup variant='flush' >
                   <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Address:</strong>
                        {order.shippingAddress.address},
                        {order.shippingAddress.city},
                        {order.shippingAddress.postalCode},{' '}
                        {order.shippingAddress.country}
                    </p>
                   </ListGroup.Item>
                   <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <strong>Method:</strong>
                    {order.paymentMethod}
                   </ListGroup.Item>
                </ListGroup>
                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {order.OrderItems.length===0?<Message>Your Cart is Empty</Message>:(
                        <ListGroup variant='flush'>
                         {order.OrderItems.map((item,index)=>(
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
                                                            ${order.itemsPrice}
                                                            </Col>
                                                        </Row>
                                                        </ListGroup.Item>
                                                        <ListGroup.Item>
                                                        <Row>
                                                            <Col>
                                                            Shipping
                                                            </Col>
                                                            <Col>
                                                            ${order.shippingPrice}
                                                            </Col>
                                                        </Row>

                                                        </ListGroup.Item>
                                                        <ListGroup.Item>
                                                        <Row>
                                                            <Col>
                                                            Tax
                                                            </Col>
                                                            <Col>
                                                            ${order.taxPrice}
                                                            </Col>
                                                        </Row>
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
};

export default OrderScreen;