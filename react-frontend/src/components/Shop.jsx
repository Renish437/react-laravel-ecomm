import React from 'react'
import { Link } from 'react-router-dom'
import ProductImg1 from "../assets/images/eleven.jpg"
const Shop = () => {
  return (
    <div>
      <div className="container">
      <nav aria-label="breadcrumb mt-3">
  <li class="breadcrumb " style={{ listStyle:'none' }} className='py-4 d-flex'>
    <li class="breadcrumb-item" ><Link to={'/'}>Home</Link></li>
    <li class="breadcrumb-item active" aria-current="page">Shop</li>
  </li>
</nav>
<div className="row ">
  <div className="col-md-3">
    <div className="card shadow border-0 mb-3">
      <div className="card-body motion-preset-slide-right motion-delay-500">
        <h3 className='mb-3'>Categories</h3>
        <ul>
          <li className='mb-2'>
            <input type="checkbox" name="" id="" />
            <label htmlFor="" className='ps-2'>Kids</label>
          </li>
          <li className='mb-2'>
            <input type="checkbox" name="" id="" />
            <label htmlFor="" className='ps-2'>Mens</label>
          </li>
          <li className='mb-2'>
            <input type="checkbox" name="" id="" />
            <label htmlFor="" className='ps-2'>Women</label>
          </li>
        </ul>
      </div>
    </div>
    <div className="card shadow border-0 mb-3">
      <div className="card-body motion-preset-slide-right motion-delay-500">
        <h3 className='mb-3'>Brands</h3>
        <ul>
          <li className='mb-2'>
            <input type="checkbox" name="" id="" />
            <label htmlFor="" className='ps-2'>Puma</label>
          </li>
          <li className='mb-2'>
            <input type="checkbox" name="" id="" />
            <label htmlFor="" className='ps-2'>Killer</label>
          </li>
          <li className='mb-2'>
            <input type="checkbox" name="" id="" />
            <label htmlFor="" className='ps-2'>Levis</label>
          </li>
          <li className='mb-2'>
            <input type="checkbox" name="" id="" />
            <label htmlFor="" className='ps-2'>Flying machine</label>
          </li>
        </ul>
      </div>
    </div>
  </div>



  <div className="col-md-9 motion-preset-slide-up motion-delay-500">
    <div className="row pb-4">
    <div className="col-md-4 col-6 hover:scale-[1.02] duration-500">
             <div className="product card border-0">
               <div className="card-img">
                 <img src={ProductImg1} alt="" className='w-100' />
               </div>
               <div className="card-body pt-3">
                 <Link to={'/product'} className='link'>Red Check Shirt For Mans</Link>
                 <div className="price">
                   $50 <span className='text-decoration-line-through'>$80</span>
                 </div>
               </div>
     
             </div>
           </div>

           <div className="col-md-4 col-6 hover:scale-[1.02] duration-500">
             <div className="product card border-0">
               <div className="card-img">
                 <img src={ProductImg1} alt="" className='w-100' />
               </div>
               <div className="card-body pt-3">
                 <Link to={'/product'}  className='link'>Red Check Shirt For Mans</Link>
                 <div className="price">
                   $50 <span className='text-decoration-line-through'>$80</span>
                 </div>
               </div>
     
             </div>
           </div>

           <div className="col-md-4 col-6 hover:scale-[1.02] duration-500">
             <div className="product card border-0">
               <div className="card-img">
                 <img src={ProductImg1} alt="" className='w-100' />
               </div>
               <div className="card-body pt-3">
                 <Link to={'/product'}  className='link'>Red Check Shirt For Mans</Link>
                 <div className="price">
                   $50 <span className='text-decoration-line-through'>$80</span>
                 </div>
               </div>
     
             </div>
           </div>

           <div className="col-md-4 col-6 hover:scale-[1.02] duration-500">
             <div className="product card border-0">
               <div className="card-img">
                 <img src={ProductImg1} alt="" className='w-100' />
               </div>
               <div className="card-body pt-3">
                 <Link to={'/product'}  className='link'>Red Check Shirt For Mans</Link>
                 <div className="price">
                   $50 <span className='text-decoration-line-through'>$80</span>
                 </div>
               </div>
     
             </div>
           </div>

           <div className="col-md-4 col-6 hover:scale-[1.02] duration-500">
             <div className="product card border-0">
               <div className="card-img">
                 <img src={ProductImg1} alt="" className='w-100' />
               </div>
               <div className="card-body pt-3">
                 <Link to={'/product'}  className='link'>Red Check Shirt For Mans</Link>
                 <div className="price">
                   $50 <span className='text-decoration-line-through'>$80</span>
                 </div>
               </div>
     
             </div>
           </div>
    </div>
   
  </div>
</div>
      </div>
    </div>
  )
}

export default Shop