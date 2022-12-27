import React from 'react';
import { NavLink } from 'react-router-dom';

const CollapsableMenu = () => {
  return (
    <div className='navbar-collapse collapse'>
      <ul className='navbar-nav'>
        <li className='nav-item dropdown'>
          <NavLink to='/' className='nav-link'>
            Home
          </NavLink>
        </li>
        <li className='nav-item dropdown'>
          <NavLink to='/products' className='nav-link'>
            Shop
          </NavLink>
        </li>
        <li className='nav-item dropdown'>
          <NavLink to='/blog' className='nav-link dropdown-toggle'>
            Blog
          </NavLink>
        </li>
        <li className='nav-item'>
          <NavLink to='/about' className='nav-link'>
            About
          </NavLink>
        </li>
        <li className='nav-item '>
          <NavLink to='/contact' className='nav-link'>
            Contact
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default CollapsableMenu;
