import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { listProducts } from '../Redux/actions/productAction'
import Loader from '../components/Loader'
import Message from '../components/Message'

function HomeScreens() {

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)

    const { loading, error, products } = productList


    useEffect(() => {
        dispatch(listProducts())

    }, [dispatch])



    return (
        <>
            <h1>latest product</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <Row >
                {products.map((product) => {
                    return (
                        <Col sm={12} md={6} lg={4} xl={3} key={product._id} >
                            <Product product={product} />
                        </Col>
                    )
                })
                }

            </Row>}

        </>
    )
}

export default HomeScreens