import React, { useContext } from 'react'
import { AuthContext } from '../context/Auth'
import { Link } from 'react-router-dom'

const UserSidebar = () => {
    const {logout}=useContext(AuthContext)
  return (
    <div className="card shadow mb-5 sidebar">
    <div className="card-body p-4">
  <ul>
    <li>
      <Link className='link' to={'/account'}>My Account</Link>
    </li>
   
    <li>
      <Link className='link' to={'#'}>Orders</Link>
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
  )
}

export default UserSidebar