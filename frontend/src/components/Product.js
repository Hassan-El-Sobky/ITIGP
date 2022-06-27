import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'

function Product({ product }) {
    return (
        <div>
            <Card style={{ width: '18rem' }} className="my-2">
                <Link to={`product/${product._id}`}>
                    <Card.Img variant="top" src={product.image} />
                </Link>
                <Card.Body>
                    <Link to={`product/${product._id}`} style={{ textDecoration: "none" }}>
                        <Card.Title as='div' style={{ height: '60px' }}>
                            <strong>
                                {product.name}
                            </strong>
                        </Card.Title>
                    </Link>


                    <Card.Text as='div'>
                        <Rating value={product.rating}
                            text={`${product.numReviews} reviews`}
                            color={'#F9DB18'}
                        ></Rating>
                        <div className='my-3'>
                            {product.rating} from {product.numReviews} reviews
                        </div>
                    </Card.Text>
                    <Card.Text as="h3">${product.price}</Card.Text>

                </Card.Body>
            </Card>
        </div>
    )
}

export default Product