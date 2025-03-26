import React, { useContext, useEffect, useState } from 'react'
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
// import logo from '../../assets/images/logo-here3.png'
// import logo from '../../assets/images/logo-here4.png'
import logo from '../../assets/images/logo4.png'
import { apiUrl } from './Http'
import { CartContext } from '../context/Cart'
const Navbars = () => {
  const [categories, setCategories] = useState([]);
  const { getQty, cartData } = useContext(CartContext);

  const fetchCategories = async () => {
    await fetch(apiUrl + '/get-categories', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then(res => res.json())
      .then(result => {
        if (result.status === 200) {
          setCategories(result.data);
        } else {
          console.log('Something went wrong');
        }
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <header className="shadow">
      <div className="bg-dark text-center py-3">
        <div className="text-white motion-preset-slide-right motion-delay-700">
          Your Gadget Partner
        </div>
      </div>
      <div className="container p-3">
        <Navbar expand="lg">
          <Container fluid>
            <Link className="motion-preset-slide-right motion-delay-500" to="/">
              <img className='logo-image' src={logo} alt="" />
            </Link>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="ms-auto my-2 gap-3 my-lg-0 motion-preset-slide-left motion-delay-500"
                style={{ maxHeight: '300px' }}
                navbarScroll
              >
                <Link className="link" to="/">
                  Home
                </Link>
                <Link className="link" to="/shop">
                  Shop
                </Link>
                <Link className="link" to="/shop">
                  Contact
                </Link>

                {categories &&
                  categories.map(category => (
                    <Link
                      key={`cat-nav-${category.id}`}
                      className="link"
                      to={`/shop?category=${category.id}`}
                    >
                      {category.name}
                    </Link>
                  ))}

                <div className="nav-right d-flex">
                  <Link to="/admin/dashboard">
                    <i className="bi bi-person fs-4"></i>
                  </Link>
                  <Link to="/cart" className="ms-3 card-bucket">
                    <span>{getQty()}</span>
                    <i className="bi bi-cart3 fs-4"></i>
                  </Link>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </header>
  );
};

export default Navbars