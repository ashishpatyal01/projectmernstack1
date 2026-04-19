import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div>
      <div className="sidebar">
        <div className="sidebar-options">
            <NavLink to='/add' className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Add items</p>
            </NavLink>         
               <NavLink to='/list' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>list items</p>
            </NavLink>
           </div>
           </div>
           </div>
  )
}

export default Sidebar
