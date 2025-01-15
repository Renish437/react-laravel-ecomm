import React from 'react'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
const Navbars = () => {
  return (
    <header className='shadow'>
  <div className="bg-dark text-center py-3 ">
    <div className='text-white motion-preset-slide-right motion-delay-700'>Your Gadget Partner</div>
  </div>
<div className="container  p-3">
<Navbar expand="lg" >
      <Container fluid>
        <Link className='motion-preset-slide-right motion-delay-500' to="/">
          <img src={logo} alt="" />
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 gap-3 my-lg-0 motion-preset-slide-left motion-delay-500 "
            style={{ maxHeight: '300px' }}
            navbarScroll
          >
           

            <Link className='link' to={'/'}>Home</Link>
            <Link className='link'  to={'/shop'}>Shop</Link>
            <Link className='link' to={'/shop'}>Contact</Link>
          <div className='nav-right d-flex'>
          <Link to={'/admin/dashboard'}>
          <i class="bi bi-person fs-4"></i>

          </Link>
          <Link to={'/cart'} className='ms-3'>
          <i  class="bi bi-cart3 fs-4"></i>
          
          </Link>

          </div>
            
     
          </Nav>
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
</div>
 
    </header>
  )
}

export default Navbars