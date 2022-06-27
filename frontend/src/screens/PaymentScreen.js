import React, {  useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import {savePaymentMethod} from '../Redux/actions/cartAction'
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = () => {
    const cart=useSelector(state=>state.cart);
    const {shippingAddress}=cart;

   if(!shippingAddress){
    navigate('/shipping')
   }

    const [paymentMethod,setPaymentMethod]=useState('PayPal');

    const dispatch=useDispatch();
    const navigate=useNavigate();
    const submitHandler=(e)=>{
        e.preventDefault();
        console.log("ss");
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
           <h1> Shipping </h1> 
           <Form onSubmit={submitHandler}>
              <Form.Group>
                 <Form.Label as='legend'>Select Method</Form.Label>
             
              <Col>
              <Form.Check type='radio' label='PayPal or Credit Card' id='PayPal'
              name='paymentMethod' value='Paypal' checked onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>

<Form.Check type='radio' label='Stripe' id='Stripe'
              name='paymentMethod' value='Stripe'  onChange={(e)=>setPaymentMethod(e.target.value)}></Form.Check>
           
              </Col>
              </Form.Group>
           <Button type='submit' variant='primary'> Continue </Button>
           
           </Form>
        </FormContainer>
    );
};

export default PaymentScreen;