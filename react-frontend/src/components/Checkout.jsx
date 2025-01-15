import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ProductImg1 from '../assets/images/Mens/seven.jpg'
import ProductImg2 from '../assets/images/Mens/ten.jpg'
const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState('cod');

    const handlePaymentMethod=(e)=>{
        setPaymentMethod(e.target.value)
    }
  return (
    <>

   <div className="container pb-5">
   <div className="row ">
    <div className="col-md-12 ">
      <nav aria-label="breadcrumb mt-3">
        <li
          class="breadcrumb "
          style={{ listStyle: "none" }}
          className="py-4 d-flex gap-1"
        >
          <li class="breadcrumb-item">
            <Link to={"/"}>Home</Link>
          </li>
         
          <li class="breadcrumb-item active" aria-current="page">
           Checkout
          </li>
        </li>
      </nav>
    </div>
  </div>
  <div className="row">
    <div className="col-md-7 ">
        <h3 className='border-bottom pb-3'><strong>Billing Details</strong></h3>
        <form action="">
            <div className="card motion-preset-slide-right motion-delay-500">
                <div className="card-body">
                <div className="row pt-3">
                <div className="col-md-6">
                   <div className='mb-3'>
                   <input type="text" className='form-control' placeholder='Enter Your Name' />
                   </div>
                </div>
                <div className="col-md-6">
                    <div  className='mb-3'><input type="text" className='form-control' placeholder='Enter Your Email' /></div>
                </div>
                
                    <div  className='mb-3'>
                        <textarea rows={3} className='form-control' placeholder='Enter Your Address' ></textarea>
                        </div>
               
                
                <div className="col-md-6">
                   <div className='mb-3'>
                   <input type="text" className='form-control' placeholder='Enter Your City' />
                   </div>
                </div>
                <div className="col-md-6">
                   <div className='mb-3'>
                   <input type="text" className='form-control' placeholder='Enter Your State' />
                   </div>
                </div>
                <div className="col-md-6">
                   <div className='mb-3'>
                   <input type="text" className='form-control' placeholder='Enter Your Zip Code' />
                   </div>
                </div>
                <div className="col-md-6">
                   <div className='mb-3'>
                   <input type="text" className='form-control' placeholder='Enter Your Phone' />
                   </div>
                </div>
            </div>
                </div>
            </div>
        </form>
    </div>
    <div className="col-md-5">
    <h3 className='border-bottom pb-3 '><strong>Items</strong></h3>

    <table className="table motion-preset-slide-down motion-delay-500">
                    <tbody>
                        <tr>
                            <td width={100}>
                                <img src={ProductImg1} width={90} alt="" />
                            </td>
                            <td width={600} >
                                    <h4>Dummy Product title</h4>
                                <div className="d-flex align-items-center pt-3">
                                    <span>$10</span>
                                     <div className="ps-3">
                                     <button className="btn btn-size">S</button>
                                     </div>
                                     <div className='ps-5' >X 1</div>
                                </div>
                            </td>
                        
                          
                        </tr>
                        <tr>
                            <td width={100}>
                                <img src={ProductImg2} width={90} alt="" />
                            </td>
                            <td width={600} >
                                    <h4>Dummy Product title</h4>
                                <div className="d-flex align-items-center pt-3">
                                    <span>$10</span>
                                     <div className="ps-3">
                                     <button className="btn btn-size">S</button>
                                     </div>
                                     <div className='ps-5' >X 1</div>
                                </div>
                            </td>
                            
                          
                        </tr>
                    </tbody>
                </table>

               <div className="row motion-preset-slide-up motion-delay-500">
               <div className="col-md-12 mb-2   "> 
           
           <div className="   p-4">
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

          

            <h3 className='border-bottom pt-4 pb-3'><strong>Payment Method</strong></h3>
               <div>
                <input type="radio" 
                onClick={handlePaymentMethod}
                checked={paymentMethod =='stripe'} value={'stripe'} className='form-label' name="" id="" />
                <label htmlFor="" className='form-label ps-2 '>Stripe</label>

                <input  type="radio" 
                onClick={handlePaymentMethod}
                checked={paymentMethod == 'cod'} value={'cod'} className='form-label ms-3' name="" id="" />
                <label htmlFor="" className='form-label ps-2 '>COD</label>
               </div>
               <div className="d-flex  py-3">
          <button className="btn btn-primary"> Pay Now</button>
          </div>




           </div>


           

        </div>
               </div>
               

    
    </div>
</div>
  
   </div>
  </>
  )
}

export default Checkout