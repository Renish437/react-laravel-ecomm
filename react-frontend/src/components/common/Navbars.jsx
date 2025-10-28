import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { X, Home, Store, Phone, User, ShoppingCart, Tag } from 'lucide-react';
import { apiUrl } from './Http';
import { CartContext } from '../context/Cart';
import Aos from 'aos';
import 'aos/dist/aos.css';

const Navbars = () => {
  const [categories, setCategories] = useState([]);
  const [showTopbar, setShowTopbar] = useState(true);
  const { getQty } = useContext(CartContext);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(apiUrl + '/get-categories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const result = await res.json();
      if (result.status === 200) {
        setCategories(result.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    Aos.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });
  }, []);

  // Refresh AOS when categories load
  useEffect(() => {
    Aos.refresh();
  }, [categories]);

  return (
    <header className="shadow-sm sticky-top bg-white">
      {/* Top Bar */}
      {showTopbar && (
        <div
          className="bg-dark text-white text-center py-2 position-relative"
          data-aos="fade-down"
        >
          <div className="container d-flex justify-content-center align-items-center gap-2">
            <Tag size={16} />
            <small className="fw-semibold">
              Your Gadget Partner – Free Shipping on Orders Over $50!
            </small>
          </div>
          <button
            onClick={() => setShowTopbar(false)}
            className="btn btn-sm text-white position-absolute end-0 top-50 translate-middle-y me-3"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <div className="container py-3">
        <Navbar expand="lg" className="p-0">
          <Container fluid>
            {/* Logo */}
            <Link
              to="/"
              className="navbar-brand"
              data-aos="fade-right"
              data-aos-delay="100"
            >
          <svg width="229" height="39.19992626048482" viewBox="0 0 370.27303754266217 59.726962457337876" class="looka-1j8o68f"><defs id="SvgjsDefs2286"></defs><g id="SvgjsG2287" featurekey="PG4fjM-0" transform="matrix(0.7465870380401611,0,0,0.7465870380401611,-7.4658703071672345,-7.4658703071672345)" fill="#5f13cb"><path xmlns="http://www.w3.org/2000/svg" d="M35,65.833c0-8.587,3.535-16.36,9.219-21.956c-3.063-1.406-6.458-2.21-10.052-2.21C20.82,41.667,10,52.487,10,65.833  C10,79.18,20.82,90,34.167,90c3.594,0,6.988-0.804,10.052-2.21C38.535,82.194,35,74.421,35,65.833z"></path><path xmlns="http://www.w3.org/2000/svg" d="M65.833,65c-8.587,0-16.36-3.535-21.956-9.222c-1.406,3.066-2.21,6.461-2.21,10.055C41.667,79.18,52.487,90,65.833,90  C79.18,90,90,79.18,90,65.833c0-3.594-0.804-6.988-2.21-10.055C82.194,61.465,74.421,65,65.833,65z"></path><path xmlns="http://www.w3.org/2000/svg" d="M65.833,10c-3.594,0-6.988,0.804-10.055,2.21C61.465,17.806,65,25.579,65,34.167c0,8.587-3.535,16.36-9.222,21.956  c3.066,1.406,6.461,2.21,10.055,2.21C79.18,58.333,90,47.513,90,34.167C90,20.82,79.18,10,65.833,10z"></path><path xmlns="http://www.w3.org/2000/svg" d="M34.167,35c8.587,0,16.36,3.535,21.956,9.219c1.406-3.063,2.21-6.458,2.21-10.052C58.333,20.82,47.513,10,34.167,10  C20.82,10,10,20.82,10,34.167c0,3.594,0.804,6.988,2.21,10.052C17.806,38.535,25.579,35,34.167,35z"></path></g><g id="SvgjsG2288" featurekey="jxYttZ-0" transform="matrix(2.810544490814209,0,0,2.810544490814209,78.81957132646674,-8.528770812982952)" fill="#5f13cb"><path d="M0.42 7.76 l10.2 0 l0 2.78 l-3.6 0 l0 9.46 l-3 0 l0 -9.46 l-3.6 0 l0 -2.78 z M12.180000000000001 7.76 l9.1 0 l0 2.78 l-6.1 0 l0 1.96 l4.9 0 l0 2.78 l-4.9 0 l0 1.94 l6.1 0 l0 2.78 l-9.1 0 l0 -12.24 z M32.6 16.58 l0 3.08 c-1.24 0.34 -2.48 0.48 -3.76 0.48 c-3.76 0 -6.28 -2.58 -6.28 -6.24 c0 -3.76 2.62 -6.24 6.26 -6.24 c1.26 0 2.58 0.1 3.78 0.48 l0 3.08 c-0.98 -0.48 -2.52 -0.66 -3.6 -0.66 c-2.44 0 -3.44 1 -3.44 3.32 c0 2.46 1.18 3.36 3.46 3.36 c1.02 0 2.68 -0.16 3.58 -0.66 z M41.74 7.76 l3 0 l0 12.24 l-3 0 l0 -4.72 l-4.4 0 l0 4.72 l-3 0 l0 -12.24 l3 0 l0 4.74 l4.4 0 l0 -4.74 z M46.42 19.7 l0 -2.82 c0.24 0.06 0.54 0.12 0.88 0.16 c0.34 0.06 0.7 0.1 1.08 0.12 s0.76 0.04 1.16 0.06 s0.78 0.04 1.12 0.04 c0.94 0 1.6 -0.06 2 -0.16 c0.38 -0.1 0.58 -0.28 0.58 -0.56 c0 -0.24 -0.18 -0.42 -0.36 -0.56 c-0.66 -0.44 -1.44 -0.62 -2.22 -0.8 c-2.2 -0.44 -4.22 -1.32 -4.22 -3.84 c0 -2.98 2.82 -3.68 5.24 -3.68 c1.34 0 2.7 0.14 4 0.46 l0 2.82 c-0.2 -0.06 -0.46 -0.1 -0.78 -0.16 c-0.34 -0.04 -0.68 -0.08 -1.06 -0.12 c-0.78 -0.08 -1.52 -0.12 -2.3 -0.12 c-0.44 0 -1.36 0 -1.78 0.16 c-0.28 0.1 -0.46 0.22 -0.46 0.54 c0 0.16 0.04 0.3 0.12 0.42 c0.08 0.14 0.22 0.24 0.4 0.34 c0.54 0.3 1.24 0.48 1.84 0.62 c0.5 0.12 1 0.26 1.52 0.4 c1.76 0.48 2.92 1.46 2.92 3.34 c0 3.1 -3.08 3.76 -5.56 3.76 c-1.36 0 -2.78 -0.1 -4.12 -0.42 z M57.040000000000006 7.76 l10.2 0 l0 2.78 l-3.6 0 l0 9.46 l-3 0 l0 -9.46 l-3.6 0 l0 -2.78 z M74.26 17.32 c2.18 0 3.3 -1.4 3.3 -3.44 c0 -2.16 -1.2 -3.44 -3.3 -3.44 c-2.2 0 -3.3 1.4 -3.3 3.44 c0 2.12 1.22 3.44 3.3 3.44 z M74.26 20.1 c-3.76 0 -6.3 -2.56 -6.3 -6.22 c0 -3.78 2.66 -6.22 6.3 -6.22 c3.78 0 6.3 2.54 6.3 6.22 c0 3.8 -2.64 6.22 -6.3 6.22 z M85.42000000000002 10.58 l0 2.92 l2.8 0 c0.92 0 1.46 -0.54 1.46 -1.46 s-0.54 -1.46 -1.46 -1.46 l-2.8 0 z M89.96000000000001 15.48 c0.56 0.76 1.12 1.52 1.7 2.26 c0.56 0.74 1.12 1.5 1.68 2.26 l-3.66 0 c-0.72 -0.96 -1.42 -1.92 -2.12 -2.88 c-0.7 -0.94 -1.42 -1.9 -2.14 -2.86 l0 5.74 l-3 0 l0 -12.24 l5.8 0 c2.28 0 4.22 1.74 4.22 4.04 c0 1.62 -1 3.04 -2.48 3.68 z M94.60000000000001 7.76 l9.1 0 l0 2.78 l-6.1 0 l0 1.96 l4.9 0 l0 2.78 l-4.9 0 l0 1.94 l6.1 0 l0 2.78 l-9.1 0 l0 -12.24 z"></path></g></svg>
              {/* <img className='logo-image' src={logo} alt="" />  */}
            </Link>

            <Navbar.Toggle aria-controls="navbarScroll" />

            <Navbar.Collapse id="navbarScroll">
              <Nav className="ms-auto my-2 my-lg-0 gap-3 align-items-center" navbarScroll>
                {/* Main Links */}
                <Link
                  className="nav-link fw-medium text-dark d-flex align-items-center"
                  to="/"
                  data-aos="fade-left"
                  data-aos-delay="200"
                >
                  <Home size={18} className="me-1" />
                  Home
                </Link>

                <Link
                  className="nav-link fw-medium text-dark d-flex align-items-center"
                  to="/shop"
                  data-aos="fade-left"
                  data-aos-delay="300"
                >
                  <Store size={18} className="me-1" />
                  Shop
                </Link>

                <Link
                  className="nav-link fw-medium text-dark d-flex align-items-center"
                  to="/contact"
                  data-aos="fade-left"
                  data-aos-delay="400"
                >
                  <Phone size={18} className="me-1" />
                  Contact
                </Link>

                {/* Dynamic Categories */}
                {categories.map((category, index) => (
                  <Link
                    key={`cat-${category.id}`}
                    className="nav-link text-secondary"
                    to={`/shop?category=${category.id}`}
                    data-aos="fade-left"
                    data-aos-delay={500 + index * 50}
                  >
                    {category.name}
                  </Link>
                ))}

                {/* Right Icons */}
                <div className="d-flex align-items-center gap-3 ms-3">
                  <Link
                    to="/account/"
                    className="text-dark"
                    title="User Panel"
                  >
                    <User size={22} />
                  </Link>

                  <Link to="/cart" className="text-dark position-relative">
                    <ShoppingCart size={22} />
                    {getQty() > 0 && (
                      <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{ fontSize: '0.65rem' }}
                      >
                        {getQty()}
                      </span>
                    )}
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

export default Navbars;


