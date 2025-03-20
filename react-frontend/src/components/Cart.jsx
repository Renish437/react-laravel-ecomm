import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ProductImg from '../assets/images/Mens/six.jpg'
import { CartContext } from "./context/Cart";

const Cart = () => {
  const {cartData,grandTotal,subTotal,shipping,updateCartItem,deleteCartItem}=useContext(CartContext);
  const [qty,setQty]=useState({});
  const handleQty=(e,itemId)=>{
const newQty=e.target.value;
setQty(prev=>({...prev,[itemId]:newQty}))
updateCartItem(itemId,newQty)
  }
  return (
    <div className="container ">
      <div className="row  ">
        <div className="col-md-12">
          <nav aria-label="breadcrumb mt-2">
            <li
              className="breadcrumb py-4 d-flex "
              style={{ listStyle: "none" }}
              
            >
              <li className="breadcrumb-item">
                <Link to={"/"}>Home</Link>
              </li>

              <li className="breadcrumb-item active" aria-current="page">
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
                  {
                    cartData.length==0 && <tr align='center' valign='middle' style={{ height:200 }} className=" "><td colSpan={4}>Your Cart is Empty</td></tr>
                  }
                  {
                    cartData && cartData.map(item=>(
<tr key={`cart-${item.id}`}>
                        <td width={100}>
                            <img src={item.image_url} width={90} alt="" />
                        </td>
                        <td width={600} >
                                <h4>{item.title}</h4>
                            <div className="d-flex align-items-center pt-3">
                                <span>${item.price}</span>
                                 <div className="ps-3">


                                  {
                                    item.port && <button className="btn btn-size">{item.port}</button>
                                  }
                                 
                                 </div>
                            </div>
                        </td>
                        <td valign="middle" >
                            <input style={{ width:'100px' }}
                            min={1}
                            max={10}
                             type="number" onChange={(e)=>handleQty(e,item.id)} 
                            value={qty[item.id]||item.qty} className="form-control" />
                        </td>
                        <td valign="middle">

                        <button onClick={()=>deleteCartItem(item.id)}><i className="bi bi-trash"></i></button>
                        </td>
                    </tr>
                    ))
                  }
                    
                 
                </tbody>
            </table>

            {/* <div className="row  justify-content-end "> */}
       
      {/* </div> */}
        </div>
           
        {
                    cartData.length>0 &&
                    
                    <div className="col-md-4 mb-2 p-4 mt-5  motion-preset-slide-left motion-delay-500"> 
           
                    <div className="border   p-4">
                    <div className="mb-3 d-flex h3"><strong>Proceed To Checkout</strong></div>
                     <div className="d-flex justify-content-between border-bottom pb-2">
                         <div>SubTotal</div>
                         <div>${subTotal()}</div>
                     </div>
                     <div className="d-flex justify-content-between border-bottom py-2">
                         <div>Shipping</div>
                         <div>${shipping()}</div>
                     </div>
                     <div className="d-flex justify-content-between border-bottom py-2">
                         <div> <strong>Grand Total</strong></div>
                         <div>${grandTotal()}</div>
                     </div>
         
                   <div className="d-flex justify-content-end py-3">
                   <Link to={'/checkout'} className="btn btn-primary"> Checkout</Link>
                   </div>
                    </div>
         
                 </div>
                
                    }
        
      
        </div>
    

    
      
    </div>
  );
};

export default Cart;
