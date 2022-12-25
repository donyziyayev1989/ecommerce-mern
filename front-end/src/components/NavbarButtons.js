import React from 'react';
import { CartIcon, LoginIcon, MenuIcon, SearchIcon } from './../assets/icons';
import { useDispatch } from 'react-redux';
import { show } from '../features/offcanvas/offcanvasSlice';

const NavbarButtons = () => {
  const dispatch = useDispatch();
  return (
    <div className='navbar-btns'>
      <div className='navbar-btns-inner'>
        <div
          className='navbar-toggler navbar-btn collapsed'
          data-toggle='collapse'
          data-target='#menu'
          aria-expanded='false'
        >
          <MenuIcon />
        </div>
        <button
          className='navbar-btn'
          data-href='#offcanvas-search'
          onClick={() =>
            dispatch(show({ title: 'Search site', component: 'search' }))
          }
        >
          <SearchIcon />
          Search
        </button>
        <button
          className='navbar-btn navbar-collapse-hidden'
          data-href='#offcanvas-account'
          onClick={() =>
            dispatch(
              show({ title: 'Sign in / Create account', component: 'account' })
            )
          }
        >
          <LoginIcon />
          Sign In/Up
        </button>
        <button
          className='navbar-btn'
          href='#offcanvas-cart'
          onClick={() =>
            dispatch(show({ title: 'Your cart', component: 'cart' }))
          }
        >
          <span className='d-block position-relative'>
            <span className='navbar-btn-badge bg-primary text-light'>4</span>
            <CartIcon />
            $325.00
          </span>
        </button>
      </div>
    </div>
  );
};

export default NavbarButtons;
