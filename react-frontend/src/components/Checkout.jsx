import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProductImg1 from '../assets/images/Mens/seven.jpg'
import ProductImg2 from '../assets/images/Mens/ten.jpg'
import { CartContext } from './context/Cart'
import { useForm } from 'react-hook-form'
import { adminToken, apiUrl, userToken } from './common/Http'
import { toast } from 'react-toastify'
const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const {cartData,subTotal,grandTotal,shipping}=useContext(CartContext);
const navigate=useNavigate();
    const handlePaymentMethod=(e)=>{
        setPaymentMethod(e.target.value)
    }
      const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
      } = useForm();

      const processOrder=(data)=>{
      console.log(data)
      if(paymentMethod=='cod'){
              saveOrder(data,'not paid')
      }
      }
      const saveOrder=async(formData,paymentStatus)=>{
        //    setDisable(true);
             console.log(cartData);
             
          const newFormData={...formData,grand_total:grandTotal()
            ,sub_total:subTotal(),shipping:shipping(),
             discount:0,
            payment_status:paymentStatus,
           status:'pending',
        cart:cartData};
              const res = await fetch(apiUrl + "/save-order", {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                  Accept: "application/json",
                  Authorization: `Bearer ${userToken()} `,
                },
                body: JSON.stringify(newFormData),
              })
                .then((res) => res.json())
                .then((result) => {
                //   setDisable(false);
                  console.log(result);
                  if (result.status == 200) {
                    console.log(result);
                    
                    localStorage.removeItem('cart');
                    // toast.success(result.message);
                    navigate("/success-message/"+result.id);
                  } else {
                    toast.error(result.message);
                  }
                });
      }
  return (
    <>

   <div className="container pb-5">
   <div className="row ">
    <div className="col-md-12 ">
      <nav aria-label="breadcrumb mt-3">
        <li
          className="breadcrumb py-4 d-flex gap-1 "
          style={{ listStyle: "none" }}
          
        >
          <li className="breadcrumb-item">
            <Link to={"/"}>Home</Link>
          </li>
         
          <li className="breadcrumb-item active" aria-current="page">
           Checkout
          </li>
        </li>
      </nav>
    </div>
  </div>
  <form  onSubmit={handleSubmit(processOrder)}>
  <div className="row">

    <div className="col-md-7 ">
        <h3 className='border-bottom pb-3'><strong>Billing Details</strong></h3>
        
            <div className="card motion-preset-slide-right motion-delay-500">
                <div className="card-body">
                <div className="row pt-3">
                <div className="col-md-6">
                   <div className='mb-3'>
                   <input 
                   {...register('name', { required: 'The name field is required' })} 
                    type="text" className={`form-control ${errors.name && 'is-invalid'}`} placeholder='Enter Your Name' />
                    {errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>}
                   </div>
                </div>
                <div className="col-md-6">
                    <div  className='mb-3'><input
                    {
                        ...register('email', { required:'The email field is required' , 
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",
                            },
                        })
                }   
                     type="text" className={`form-control ${errors.email && 'is-invalid'}`} placeholder='Enter Your Email' />
                       {errors.email && <p className='invalid-feedback'>{errors.email?.message}</p>}
                     </div>
                </div>
                
                    <div  className='mb-3'>
                        <textarea
                        {...register('address', { required: 'The address field is required' })}   
                         rows={3} className={`form-control ${errors.address && 'is-invalid'}`} placeholder='Enter Your Address' ></textarea>
                         {errors.address && <p className='invalid-feedback'>{errors.address?.message}</p>}
                        </div>
               
                
                <div className="col-md-6">
                   <div className='mb-3'>
                   <input
                   {...register('city', { required: 'The city field is required' })}  
                   
                   type="text" className={`form-control ${errors.city && 'is-invalid'}`} placeholder='Enter Your City' />
                   {errors.city && <p className='invalid-feedback'>{errors.city?.message}</p>}
                   </div>
                </div>
                <div className="col-md-6">
                   <div className='mb-3'>
                   <input
                   {...register('state', { required: 'The state field is required' })} 
                    type="text" className={`form-control ${errors.state && 'is-invalid'}`} placeholder='Enter Your State' />
                    {errors.state && <p className='invalid-feedback'>{errors.state?.message}</p>}
                   </div>
                </div>
                <div className="col-md-6">
                   <div className='mb-3'>

                   <input 
                   {...register('zip', { required: 'The zip field is required' })}
                   type="text" className={`form-control ${errors.zip && 'is-invalid'}`} placeholder='Enter Your Zip Code' />
                   {errors.zip && <p className='invalid-feedback'>{errors.zip?.message}</p>}
                   </div>
                </div>
                <div className="col-md-6">
                   <div className='mb-3'>

                   <input 
                   {...register('mobile', { required: 'The mobile field is required' })}
                    type="text" className={`form-control ${errors.mobile && 'is-invalid'}`} placeholder='Enter Your Phone' />
                    {errors.mobile && <p className='invalid-feedback'>{errors.mobile?.message}</p>}

                   </div>
                </div>
            </div>
                </div>
            </div>
      
    </div>
    <div className="col-md-5">
    <h3 className='border-bottom pb-3 '><strong>Items</strong></h3>

    <table className="table motion-preset-slide-down motion-delay-500">
                    <tbody>
                        {
                            cartData && cartData.map(item=>{
                                return (
                                    <tr key={`cart-${item.id}`}>
                                    <td width={100}>
                                    <img src={item.image_url} width={90} alt="photo" />
                                    </td>
                                    <td width={600} >
                                            <h4>{item.title}</h4>
                                        <div className="d-flex align-items-center pt-3">
                                            <span>${item.price}</span>
                                             <div className="ps-1">
                                             {
                                    item.port && <button className="btn btn-size">{item.port}</button>
                                  }
                                             </div>
                                             <div className='ps-5' >X {item.qty}</div>
                                        </div>
                                    </td>
                                
                                  
                                </tr>
                                );
                            })
                        }
                      
                      
                    </tbody>
                </table>

               <div className="row motion-preset-slide-up motion-delay-500">
               <div className="col-md-12 mb-2   "> 
           
           <div className="   p-4">
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

          

            <h3 className='border-bottom pt-4 pb-3'><strong>Payment Method</strong></h3>
               <div>
                <input type="radio" 
                onClick={handlePaymentMethod}
                defaultChecked={paymentMethod =='stripe'} value={'stripe'} className='form-label' name="" id="" />
                <label htmlFor="" className='form-label ps-2 '>Stripe</label>

                <input  type="radio" 
                onClick={handlePaymentMethod}
                defaultChecked={paymentMethod == 'cod'} value={'cod'} className='form-label ms-3' name="" id="" />
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
</form>
   </div>
  </>
  )
}

export default Checkout