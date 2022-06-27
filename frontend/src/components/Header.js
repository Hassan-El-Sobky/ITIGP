import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../Redux/actions/userAction'
function Header() {
    const userLogin = useSelector(state => state.userLogin)
    const dispatch = useDispatch()
    const { userInfo } = userLogin
    const logoutHandler = () => {

        dispatch(logout())
    }
    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="lg">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand >UI-Shop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link ><i className="fas fa-cart-shopping"></i>Cart</Nav.Link>
                            </LinkContainer>
                            {
                                userInfo ? (
                                    <NavDropdown title={userInfo.name} id="username">
                                        <LinkContainer to="/profile">
                                            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>Log Out</NavDropdown.Item>
                                    </NavDropdown>
                                ) :
                                    <LinkContainer to="/login">
                                        <Nav.Link ><i className="fas fa-user"></i>Sign In</Nav.Link>
                                    </LinkContainer>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </header >
    )
}

export default Header