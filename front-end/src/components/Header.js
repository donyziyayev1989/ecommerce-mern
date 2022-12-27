import React from 'react';
import logo from '../assets/logo-dark.png';
import CollapsableMenu from './Menu';
import NavbarButtons from './NavbarButtons';
const Header = () => {
  return (
    <header className='navbar navbar-expand-lg navbar-light fixed-top bg-light'>
      <div className='container-fluid navbar-inner'>
        <a className='navbar-brand' href='/'>
          <img width='100' src={logo} alt='MStore' />
        </a>
        <CollapsableMenu />
        <NavbarButtons />
      </div>
    </header>
  );
};

export default Header;
