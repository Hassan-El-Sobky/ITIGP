import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Link,
    useParams,
    useSearchParams,
    useNavigate
} from 'react-router-dom'
import { Col, Row, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../Redux/actions/cartAction'


function CartScreen() {
    const dispatch = useDispatch()


    let params = useParams();
    const [searchParams] = useSearchParams();
    const navigate=useNavigate();
    // to get query as an object
    const { qty } = Object.fromEntries([...searchParams])

    const productId = params.id

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    console.log('👎', cartItems)


    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {

        dispatch(removeFromCart(id))
    }

    const checkOutHandler = () => {
           navigate('/shipping')
     }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {
                    cartItems.length === 0 ? (
                        <Message>Your cart is empty <Link to='/'>Go Back</Link> </Message>
                    ) : (
                        <ListGroup variant='flush'>
                            {
                                cartItems.map(item => (

                                    <ListGroup.Item key={item.product}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col md={3}>
                                                <Link to={`/product/${item.product}`} >{item.name}</Link>
                                            </Col>
                                            <Col md={2}>${item.price}</Col>
                                            <Col md={2}>
                                                <Form.Select aria-label="Default select example"
                                                    value={item.qty}
                                                    onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                    {
                                                        [...Array(item.countInStock).keys()].map(el => (

                                                            <option value={el + 1} key={el + 1}>{el + 1}</option>
                                                        )

                                                        )
                                                    }
                                                </Form.Select>

                                            </Col>

                                            <Col md={2}>
                                                <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                                    <i className='fas fa-trash trash'></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))
                            }
                        </ListGroup>
                    )
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup varian='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + +item.qty, 0)}) items</h2>
                            <h3>
                                $
                                {
                                    cartItems.reduce((acc, item) => acc + +item.price * item.qty, 0).toFixed(2)
                                }
                            </h3>
                        </ListGroup.Item>
                        <ListGroup.Item style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button
                                className='btn-block btn'
                                style={{ width: "100 %" }}
                                type='button'
                                disabled={cartItems.length === 0 ? true : false}
                                onClick={checkOutHandler}
                            >
                                Proceed to Checkout
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>

        </Row>
    )
}

export default CartScreen


