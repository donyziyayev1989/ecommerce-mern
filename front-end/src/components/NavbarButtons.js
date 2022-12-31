import React from 'react';
import { CartIcon, LoginIcon, MenuIcon, SearchIcon } from './../assets/icons';
import { useDispatch, useSelector } from 'react-redux';
import { showOffCanvas } from '../features/ui/uiSlice';

const NavbarButtons = () => {
  const dispatch = useDispatch();
  const { total, totalProducts } = useSelector((store) => store.cart);
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
            dispatch(
              showOffCanvas({ title: 'Search site', component: 'search' })
            )
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
              showOffCanvas({
                title: 'Sign in / Create account',
                component: 'account',
              })
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
            dispatch(showOffCanvas({ title: 'Your cart', component: 'cart' }))
          }
        >
          <span className='d-block position-relative'>
            <span className='navbar-btn-badge bg-primary text-light'>
              {totalProducts}
            </span>
            <CartIcon />${total}
          </span>
        </button>
      </div>
    </div>
  );
};

export default NavbarButtons;
