import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AdminAuthContext } from '../context/AdminAuth'
const Sidebar = () => {
    const {logout}=useContext(AdminAuthContext);
  return (
    <>
    
    <div className="card shadow mb-5 sidebar">
  <div className="card-body p-4">
<ul>
  <li>
    <Link className='link' to={'/admin/dashboard'}>Dashboard</Link>
  </li>
  <li>
    <Link className='link' to={'/admin/categories'}>Categories</Link>
  </li>
  <li>
    <Link className='link' to={'/admin/brands'}>Brands</Link>
  </li>
  <li>
    <Link className='link' to={'/admin/products'}>Products</Link>
  </li>
  <li>
    <Link className='link' to={'#'}>Orders</Link>
  </li>
  <li>
    <Link className='link' to={'#'}>Users</Link>
  </li>
  <li>
    <Link className='link' to={'#'}>Shipping</Link>
  </li>
  <li>
    <Link className='link' to={'#'}>Change Password</Link>
  </li>
  <li>
    <Link className='link' onClick={logout} to={'#'}>Logout</Link>
  </li>
</ul>
  </div>
</div>
    
    </>
  )
}

export default Sidebar