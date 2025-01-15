import React from "react";
import { Link } from "react-router-dom";
import ProductImg from '../assets/images/Mens/six.jpg'

const Cart = () => {
  return (
    <div className="container ">
      <div className="row  ">
        <div className="col-md-12">
          <nav aria-label="breadcrumb mt-2">
            <li
              class="breadcrumb "
              style={{ listStyle: "none" }}
              className="py-4 d-flex"
            >
              <li class="breadcrumb-item">
                <Link to={"/"}>Home</Link>
              </li>

              <li class="breadcrumb-item active" aria-current="page">
                Cart
              </li>
            </li>
          </nav>
          </div>
        </div>
        <div className="row d-flex ">
        <div className="col-md-8 mb-2 p-4 motion-preset-slide-right motion-delay-500">
            <h2 className="border-bottom pb-3">Cart</h2>

            <table className="table">
                <tbody>
                    <tr>
                        <td width={100}>
                            <img src={ProductImg} width={90} alt="" />
                        </td>
                        <td width={600} >
                                <h4>Dummy Product title</h4>
                            <div className="d-flex align-items-center pt-3">
                                <span>$10</span>
                                 <div className="ps-3">
                                 <button className="btn btn-size">S</button>
                                 </div>
                            </div>
                        </td>
                        <td valign="middle" >
                            <input style={{ width:'100px' }} type="number" value={1} className="form-control" />
                        </td>
                        <td valign="middle">
                        <i class="bi bi-trash"></i>
                        </td>
                    </tr>
                    <tr>
                        <td width={100}>
                            <img src={ProductImg} width={90} alt="" />
                        </td>
                        <td width={600} >
                                <h4>Dummy Product title</h4>
                            <div className="d-flex align-items-center pt-3">
                                <span>$10</span>
                                 <div className="ps-3">
                                 <button className="btn btn-size">S</button>
                                 </div>
                            </div>
                        </td>
                        <td valign="middle" >
                            <input style={{ width:'100px' }} type="number" value={1} className="form-control" />
                        </td>
                        <td valign="middle">
                        <i class="bi bi-trash"></i>
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* <div className="row p-4 justify-content-end "> */}
       
      {/* </div> */}
        </div>
      
        <div className="col-md-4 mb-2 p-4 mt-5  motion-preset-slide-left motion-delay-500"> 
           
           <div className="border   p-4">
           <div className="mb-3 d-flex h3"><strong>Proceed To Checkout</strong></div>
            <div className="d-flex justify-content-between border-bottom pb-2">
                <div>SubTotal</div>
                <div>$20</div>
            </div>
            <div className="d-flex justify-content-between border-bottom py-2">
                <div>Shipping</div>
                <div>$5</div>
            </div>
            <div className="d-flex justify-content-between border-bottom py-2">
                <div> <strong>Grand Total</strong></div>
                <div>$25</div>
            </div>

          <div className="d-flex justify-content-end py-3">
          <Link to={'/checkout'} className="btn btn-primary"> Checkout</Link>
          </div>
           </div>

        </div>
      
        </div>
    

    
      
    </div>
  );
};

export default Cart;
