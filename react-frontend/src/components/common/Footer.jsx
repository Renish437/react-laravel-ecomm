import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "./Http";
import logo from '../../assets/images/logo10.png'
import { AuthContext } from "../context/Auth";
import Aos from "aos";
const Footer = () => {
   const { isLoggedIn } = useContext(AuthContext);
  //  console.log("userInfo is:"+isLoggedIn());
  const [categories, setCategories] = useState([]); 
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
      useEffect(() => {
               
                Aos.init({
                  duration: 800,
                  easing: 'ease-in-out',
                  once: true,
                  offset: 100,
                });
              }, []);
  return (
    <footer className="text-white " data-aos="fade-up">
      <div className="container py-5">
        <div className="row mb-5">
          <div className="col-md-3 mb-4 motion-preset-slide-right motion-delay-500">
            {/* <img className="logo-foot" src={logo} alt="" width={150} /> */}
            <svg width="229" height="39.19992626048482" viewBox="0 0 370.27303754266217 59.726962457337876" class="looka-1j8o68f"><defs id="SvgjsDefs2411"></defs><g id="SvgjsG2412" featurekey="PG4fjM-0" transform="matrix(0.7465870380401611,0,0,0.7465870380401611,-7.4658703071672345,-7.4658703071672345)" fill="#ffffff"><path xmlns="http://www.w3.org/2000/svg" d="M35,65.833c0-8.587,3.535-16.36,9.219-21.956c-3.063-1.406-6.458-2.21-10.052-2.21C20.82,41.667,10,52.487,10,65.833  C10,79.18,20.82,90,34.167,90c3.594,0,6.988-0.804,10.052-2.21C38.535,82.194,35,74.421,35,65.833z"></path><path xmlns="http://www.w3.org/2000/svg" d="M65.833,65c-8.587,0-16.36-3.535-21.956-9.222c-1.406,3.066-2.21,6.461-2.21,10.055C41.667,79.18,52.487,90,65.833,90  C79.18,90,90,79.18,90,65.833c0-3.594-0.804-6.988-2.21-10.055C82.194,61.465,74.421,65,65.833,65z"></path><path xmlns="http://www.w3.org/2000/svg" d="M65.833,10c-3.594,0-6.988,0.804-10.055,2.21C61.465,17.806,65,25.579,65,34.167c0,8.587-3.535,16.36-9.222,21.956  c3.066,1.406,6.461,2.21,10.055,2.21C79.18,58.333,90,47.513,90,34.167C90,20.82,79.18,10,65.833,10z"></path><path xmlns="http://www.w3.org/2000/svg" d="M34.167,35c8.587,0,16.36,3.535,21.956,9.219c1.406-3.063,2.21-6.458,2.21-10.052C58.333,20.82,47.513,10,34.167,10  C20.82,10,10,20.82,10,34.167c0,3.594,0.804,6.988,2.21,10.052C17.806,38.535,25.579,35,34.167,35z"></path></g><g id="SvgjsG2413" featurekey="jxYttZ-0" transform="matrix(2.810544490814209,0,0,2.810544490814209,78.81957132646674,-8.528770812982952)" fill="#ffffff"><path d="M0.42 7.76 l10.2 0 l0 2.78 l-3.6 0 l0 9.46 l-3 0 l0 -9.46 l-3.6 0 l0 -2.78 z M12.180000000000001 7.76 l9.1 0 l0 2.78 l-6.1 0 l0 1.96 l4.9 0 l0 2.78 l-4.9 0 l0 1.94 l6.1 0 l0 2.78 l-9.1 0 l0 -12.24 z M32.6 16.58 l0 3.08 c-1.24 0.34 -2.48 0.48 -3.76 0.48 c-3.76 0 -6.28 -2.58 -6.28 -6.24 c0 -3.76 2.62 -6.24 6.26 -6.24 c1.26 0 2.58 0.1 3.78 0.48 l0 3.08 c-0.98 -0.48 -2.52 -0.66 -3.6 -0.66 c-2.44 0 -3.44 1 -3.44 3.32 c0 2.46 1.18 3.36 3.46 3.36 c1.02 0 2.68 -0.16 3.58 -0.66 z M41.74 7.76 l3 0 l0 12.24 l-3 0 l0 -4.72 l-4.4 0 l0 4.72 l-3 0 l0 -12.24 l3 0 l0 4.74 l4.4 0 l0 -4.74 z M46.42 19.7 l0 -2.82 c0.24 0.06 0.54 0.12 0.88 0.16 c0.34 0.06 0.7 0.1 1.08 0.12 s0.76 0.04 1.16 0.06 s0.78 0.04 1.12 0.04 c0.94 0 1.6 -0.06 2 -0.16 c0.38 -0.1 0.58 -0.28 0.58 -0.56 c0 -0.24 -0.18 -0.42 -0.36 -0.56 c-0.66 -0.44 -1.44 -0.62 -2.22 -0.8 c-2.2 -0.44 -4.22 -1.32 -4.22 -3.84 c0 -2.98 2.82 -3.68 5.24 -3.68 c1.34 0 2.7 0.14 4 0.46 l0 2.82 c-0.2 -0.06 -0.46 -0.1 -0.78 -0.16 c-0.34 -0.04 -0.68 -0.08 -1.06 -0.12 c-0.78 -0.08 -1.52 -0.12 -2.3 -0.12 c-0.44 0 -1.36 0 -1.78 0.16 c-0.28 0.1 -0.46 0.22 -0.46 0.54 c0 0.16 0.04 0.3 0.12 0.42 c0.08 0.14 0.22 0.24 0.4 0.34 c0.54 0.3 1.24 0.48 1.84 0.62 c0.5 0.12 1 0.26 1.52 0.4 c1.76 0.48 2.92 1.46 2.92 3.34 c0 3.1 -3.08 3.76 -5.56 3.76 c-1.36 0 -2.78 -0.1 -4.12 -0.42 z M57.040000000000006 7.76 l10.2 0 l0 2.78 l-3.6 0 l0 9.46 l-3 0 l0 -9.46 l-3.6 0 l0 -2.78 z M74.26 17.32 c2.18 0 3.3 -1.4 3.3 -3.44 c0 -2.16 -1.2 -3.44 -3.3 -3.44 c-2.2 0 -3.3 1.4 -3.3 3.44 c0 2.12 1.22 3.44 3.3 3.44 z M74.26 20.1 c-3.76 0 -6.3 -2.56 -6.3 -6.22 c0 -3.78 2.66 -6.22 6.3 -6.22 c3.78 0 6.3 2.54 6.3 6.22 c0 3.8 -2.64 6.22 -6.3 6.22 z M85.42000000000002 10.58 l0 2.92 l2.8 0 c0.92 0 1.46 -0.54 1.46 -1.46 s-0.54 -1.46 -1.46 -1.46 l-2.8 0 z M89.96000000000001 15.48 c0.56 0.76 1.12 1.52 1.7 2.26 c0.56 0.74 1.12 1.5 1.68 2.26 l-3.66 0 c-0.72 -0.96 -1.42 -1.92 -2.12 -2.88 c-0.7 -0.94 -1.42 -1.9 -2.14 -2.86 l0 5.74 l-3 0 l0 -12.24 l5.8 0 c2.28 0 4.22 1.74 4.22 4.04 c0 1.62 -1 3.04 -2.48 3.68 z M94.60000000000001 7.76 l9.1 0 l0 2.78 l-6.1 0 l0 1.96 l4.9 0 l0 2.78 l-4.9 0 l0 1.94 l6.1 0 l0 2.78 l-9.1 0 l0 -12.24 z"></path></g></svg>
            <div className="pe-5">Lorem ipsum dolor sit amet.</div>
          </div>
          <div className="col-md-3 mb-4 motion-preset-slide-right motion-delay-500">
            <h2 className="mb-3">Categories</h2>
            <ul>
              {
                categories && categories.map((category) => (
                  <li key={category.id}>
                    <Link className='link-2'   to={`/shop?category=${category.id}`}>{category.name}</Link>
                  </li>
                ))
              }
             
              
            </ul>
          </div>
          <div className="col-md-3 mb-4 motion-preset-slide-left motion-delay-500">
          <h2 className="mb-3">Quick Links</h2>
            <ul>
              {
               isLoggedIn() ? (
                <li>
                <Link className='link-2' to={"/account/"}>Dashboard</Link>
              </li>
                
              )
              :
              (
                <>
               <li>
                <Link className='link-2' to={"/account/login"}>Login</Link>
              </li>
              <li>
                <Link className='link-2' to={"/account/register"}>Register</Link>
              </li>
              </>
              )

              }
            
            </ul>
          </div>
          <div className="col-md-3 mb-4 motion-preset-slide-left motion-delay-500">
            <h2 className="mb-3">Get in touch</h2>
            <ul>
              <li>
                <Link className='link-2'>9808744860</Link>
              </li>
              <li>
                <Link className='link-2' >ren@gmail.com</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="row spotlight py-5">
          <div className="col-md-4 motion-preset-slide-right motion-delay-500">
           <div className="d-flex justify-content-center py-3">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-truck" viewBox="0 0 16 16"><path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"></path></svg>
           <h3 className="ps-2">Free Delivery</h3>
           </div>
          </div>
          <div className="col-md-4 motion-preset-slide-down motion-delay-500">
          <div className="d-flex justify-content-center py-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-cash" viewBox="0 0 16 16"><path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path><path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2z"></path></svg>
   <h3 className="ps-2">Money Back Guarantee</h3>
          </div>
          </div>
          <div className="col-md-4 motion-preset-slide-left motion-delay-500">
          <div className="d-flex justify-content-center py-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-credit-card-2-back" viewBox="0 0 16 16"><path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5z"></path><path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1m-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1"></path></svg>
 <h3 className="ps-2">Secure Payment</h3>
          </div>
          </div>
        </div>
        <div className="row motion-preset-slide-up motion-delay-500">
          <div className="col-md-12 text-center pt-5">
            <p>&copy; 2025 All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
