import React from 'react';

const CollapsableMenu = () => {
  return (
    <div className='navbar-collapse collapse'>
      <ul className='navbar-nav'>
        <li className='nav-item dropdown'>
          <a href='/' className='nav-link'>
            Home
          </a>
        </li>
        <li className='nav-item dropdown'>
          <a href='/' className='nav-link'>
            Shop
          </a>
        </li>
        <li className='nav-item dropdown'>
          <a href='/' className='nav-link'>
            About
          </a>
        </li>
        <li className='nav-item dropdown'>
          <a href='/' className='nav-link'>
            Contact
          </a>
        </li>
        <li className='nav-item dropdown'>
          <a href='/' className='nav-link dropdown-toggle'>
            Blog
          </a>
        </li>
      </ul>
    </div>
  );
};

export default CollapsableMenu;
