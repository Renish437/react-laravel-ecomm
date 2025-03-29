import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ProductImg1 from "../assets/images/eleven.jpg"
import { apiUrl } from './common/Http';
import { Pagination } from 'react-bootstrap';
import { set } from 'react-hook-form';
import Loader from './common/Loader/Loader';


const Shop = () => {
  const [loading,setLoading]=useState(true);
  const [categories,setCategories]=useState([]);
  const [brands,setBrands]=useState([]);
  const [products,setProducts]=useState([]);
  const [searchParams,setSearchParams]=useSearchParams();
  const [catChecked,setCatChecked]=useState(()=>{
    const category=searchParams.get('category');
    return category ? category.split(','):[];
  });
  const [brandChecked,setBrandChecked]=useState(()=>{
    const brand=searchParams.get('brand');
    return brand ? brand.split(','):[];
  });


  const fetchCategories=async()=>{
    await fetch(apiUrl+'/get-categories',{
          method:'GET',
          headers:{
            'Content-type':'application/json',
            'Accept':'application/json',
          }
        }).then(res=>res.json())
        .then(result=>{
          if(result.status==200){
          
            setCategories(result.data);
            setLoading(false);
            console.log(result.data);
            
          }
          else{
            setLoading(false);
            console.log('Something went wrong');
            
          }
          
        })
  }
  const fetchBrands=async()=>{
    await fetch(apiUrl+'/get-brands',{
          method:'GET',
          headers:{
            'Content-type':'application/json',
            'Accept':'application/json',
          }
        }).then(res=>res.json())
        .then(result=>{
          if(result.status==200){
            
            setBrands(result.data);
            setLoading(false);
            console.log(result.data);
            
          }
          else{
            console.log('Something went wrong');
            
          }
          
        })
  }
  const fetchProducts=async()=>{
    // console.log(catChecked);

    let search=[]
    let params='';
    if(catChecked.length>0){
      search.push(['category',catChecked])
    }
    if(brandChecked.length>0){
      search.push(['brand',brandChecked])
    }
    if(search.length>0){
      params= new URLSearchParams(search)
      setSearchParams(params)
    } else{
      setSearchParams([]);
    }

  
    await fetch(apiUrl+`/get-products?${params}`,{
          method:'GET',
          headers:{
            'Content-type':'application/json',
            'Accept':'application/json',
          }
        }).then(res=>res.json())
        .then(result=>{
          if(result.status==200){
            setProducts(result.data);
            setLoading(false);
            console.log(result.data);
            
          }
          else{
            console.log('Something went wrong');
            
          }
          
        })
  }

  const handleCategory=(e)=>{
      const {checked, value}=e.target;
      if(checked){
        setCatChecked(pre=>[...pre,value])
      }
      else{
        setCatChecked(catChecked.filter(id=>id!=value))
      }
  }
  const handleBrand=(e)=>{
      const {checked, value}=e.target;
      if(checked){
        setBrandChecked(pre=>[...pre,value])
      }
      else{
        setBrandChecked(catChecked.filter(id=>id!=value))
      }
  }
  
  useEffect(()=>{
    fetchCategories();
    fetchBrands();
    fetchProducts();
  },[catChecked,brandChecked])
    return (
    <div>
      <div className="container">
      <nav aria-label="breadcrumb mt-3">
  <li  style={{ listStyle:'none' }} className='py-4 d-flex breadcrumb'>
    <li className="breadcrumb-item" ><Link to={'/'}>Home</Link></li>
    <li className="breadcrumb-item active" aria-current="page">Shop</li>
  </li>
</nav>
<div className="row ">
  <div className="col-md-3">
    <div className="card shadow border-0 mb-3">
      <div className="card-body motion-preset-slide-right motion-delay-500">
        <h3 className='mb-3'>Categories</h3>
    {
      loading==true && <Loader/>
    }
    {
      loading==false &&     <ul>
      {
        categories && categories.map(category=>{
          return(
            <li key={`cat-${category.id}`} className='mb-2'>
            <input type="checkbox"
            defaultChecked={searchParams.get('category')? searchParams.get('category').includes(category.id):false}
             value={category.id} onClick={handleCategory} name="" id="" />
            <label htmlFor="" className='ps-2'>{category.name}</label>
          </li>
          )
        })
      }
     
     
    </ul>
    }
      </div>
    </div>
    <div className="card shadow border-0 mb-3">
      <div className="card-body motion-preset-slide-right motion-delay-500">
        <h3 className='mb-3'>Brands</h3>
        {
      loading==true && <Loader/>
    }
    {
      loading==false &&
      <ul>
        {
            brands && brands.map(brand=>{
              return(
                <li key={`brand-${brand.id}`} className='mb-2'>
                <input type="checkbox"
                defaultChecked={searchParams.get('brand')? searchParams.get('brand').includes(brand.id):false}
                 value={brand.id} onClick={handleBrand} name="" id="" />
                <label htmlFor="" className='ps-2'>{brand.name}</label>
              </li>
              )
            })
          }
         
        </ul>
    }
        
      </div>
    </div>
  </div>



  <div className="col-md-9 motion-preset-slide-up motion-delay-500">
  {
  loading==true && <Loader/>
}
{
  loading==false && <div className="row pb-4">
  {
    products && products.map(product=>{
      return(
        <div key={`product-${product.id}`} className="col-md-4 col-6 hover:scale-[1.02] duration-500 hover:cursor-pointer">
        <div className="product card border-0">
          <div className="card-img">
          <Link to={`/product/${product.id}`} className='link'> <img src={product.image_url} alt="" className='w-100' /></Link>
          </div>
          <div className="card-body pt-3">
            <Link to={`/product/${product.id}`} className='link  line-clamp-1'>{product.title}</Link>
            <div className="price">
            $ {product.price} &nbsp; 
                    {
                      product.compare_price && <span className='text-decoration-line-through'>${ product.compare_price }</span>
                    }
            </div>
          </div>

        </div>
      </div>
      )
    })
  }


   
</div>
}
    
    <Pagination/>
  </div>
</div>

      </div>
    </div>
  )
}

export default Shop