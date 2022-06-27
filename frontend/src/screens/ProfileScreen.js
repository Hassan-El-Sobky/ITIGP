import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Col, Row, Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../Redux/actions/userAction'
import { USER_UPDATE_PROFILE_RESET } from '../Redux/constants/userConst'

function ProfileScreen() {
    const [userData, setUserData] = useState({
        name: "",
        email: '',
        password: '',
        confirmPassword: ''
    })




    const [message, setMessage] = useState('')
    const dispatch = useDispatch()
    let navigate = useNavigate();

    const userDetails = useSelector(state => state.userDetails)
    let { loading, error, user } = userDetails


    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin



    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile
    console.log('👨‍👧‍👦', userUpdateProfile)

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }


    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            if (!user.name || !user) {
                // to delete the old data and replace it with the updated data
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))


            } else {
                console.log('🧚‍♀️', 'asdasdasdasd')
                setUserData({ ...userData, name: user.name, email: user.email })
            }
        }
    }, [dispatch, navigate, userInfo, user, success, error])

    const submitHandler = (e) => {
        e.preventDefault();
        if (userData.password !== userData.confirmPassword) {
            setMessage('Password do not match')
        } else {
            // Dispatch update profile
            dispatch(updateUserProfile({ id: user._id, name: userData.name, email: userData.email, password: userData.password }))
            if (success == true) {
                error = null
            }
        }


    }


    return (
        <Row>
            <Col md={4}>

                <h2>Update Your Data</h2>
                {error && <Message variant='danger'>{error}</Message>}
                {message && <Message variant='danger'>{message}</Message>}
                {success ?
                    <Message variant='success'>Profile updated</Message> : userUpdateProfile.error ?
                        <Message variant='danger'>{userUpdateProfile.error}</Message> : " "}
                {loading ? <Loader /> :

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
                            Update
                        </Button>
                    </Form>
                }


            </Col>
            <Col md={8}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen