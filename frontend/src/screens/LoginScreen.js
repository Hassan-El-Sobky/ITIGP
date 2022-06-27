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
import { login } from '../Redux/actions/userAction'



function LoginScreen() {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    const dispatch = useDispatch()
    let navigate = useNavigate();
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

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
        dispatch(login(userData.email, userData.password))



    }

    let redirect;
    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading ? <Loader /> :
                <>
                    <Form>
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
                                value={userData.password}
                                name="password"
                                onChange={handleChange} />
                        </Form.Group>
                        <Button type='submit' variant='primary' className='btn-block btn w-100' onClick={submitHandler}>
                            Sign In
                        </Button>
                    </Form>
                    <Row className="p-4">
                        <Col>
                            New Customer?<span> </span>
                            <Link
                                to={redirect ? `register?redirect=${redirect}` : '/register'}
                                style={{ textDecoration: "none", fontWeight: "normal" }}
                                className="">
                                Register
                            </Link>
                        </Col>
                    </Row>
                </>
            }
        </FormContainer>

    )
}

export default LoginScreen