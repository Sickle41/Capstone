import React from 'react';
import { Link } from 'react-router-dom';
import "./NavBar.css"


export const NavBar = () => {
  return <ul className='navbar'>
    <li className='navbar-item'>
      <Link to="/cardgallery">CardGallery</Link>
      </li>
      <li className='navbar-item'>
      <Link to="/newcard">New Card</Link>
      </li>
      <li className='navbar-item'>
      <Link to="/login">Login</Link>
      </li>
      <li className='navbar-item'>
      <Link to="/profile">Profile</Link>
    </li>
  </ul>
}