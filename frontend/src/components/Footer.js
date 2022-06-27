import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
function Footer() {
    return (
        <footer>
            <Container className='text-center fw-bold '   >
                <Row>
                    <Col className="text-center py-3">
                        Copyright &copy; UI-Shop
                    </Col>
                </Row>

            </Container >
        </footer>
    )
}

export default Footer