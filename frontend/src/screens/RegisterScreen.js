import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Link,
    useParams,
    useSearchParams,
    useNavigate
} from 'react-router-dom'
import { Col, Row, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../Redux/actions/userAction'



function Registercreen() {
    const [userData, setUserData] = useState({
        name: "",
        email: '',
        password: '',
        confirmPassword: ''
    })




    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }


    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        if (userData.password !== userData.confirmPassword) {
            setMessage('Password do not match')
        } else {

            dispatch(register(userData.name, userData.email, userData.password))

        }


    }


    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {loading ? <Loader /> :
                <>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Please enter your name"
                                value={userData.name}
                                name='name'
                                onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                value={userData.email}
                                name='email'
                                onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="password"
                                value={userData.password}
                                name="password"
                                onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={userData.confirmPassword}
                                placeholder="confirmPassword"
                                name="confirmPassword"
                                onChange={handleChange} />
                        </Form.Group>
                        <Button type='submit' variant='primary' className='btn-block btn w-100' onClick={submitHandler}>
                            Register
                        </Button>
                    </Form>
                    <Row className="p-4">
                        <Col>
                            Have an account?<span> </span>
                            <Link
                                to='/login'
                                style={{ textDecoration: "none", fontWeight: "normal" }}
                                className="">
                                Login
                            </Link>
                        </Col>
                    </Row>
                </>
            }
        </FormContainer>

    )
}

export default Registercreen