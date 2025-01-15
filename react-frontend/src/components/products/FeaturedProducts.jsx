import React from 'react'
import ProductImg1 from "../../assets/images/eleven.jpg"
import { Link } from 'react-router-dom'
const FeaturedProducts = () => {
  return (
    <section className="section-2 max-w-[1130px] py-5">
    <div className="container">
      <h2>Featured Products</h2>
      <div className="row mt-4">
        <div className="col-md-3 col-6">
          <div className="product card border-0">
            <div className="card-img">
              <img src={ProductImg1} alt="" className='w-100' />
            </div>
            <div className="card-body pt-3">
              <Link className='link'>Red Check Shirt For Mans</Link>
              <div className="price">
                $50 <span className='text-decoration-line-through'>$80</span>
              </div>
            </div>
  
          </div>
        </div>
      </div>
    </div>
   </section>
  )
}

export default FeaturedProducts