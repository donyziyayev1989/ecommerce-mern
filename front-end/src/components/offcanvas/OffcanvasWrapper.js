import React from 'react';
import Offcanvas from './Offcanvas';
import { useSelector } from 'react-redux';
import Search from './Search';
import Register from './Register';
import Cart from './Cart';

const OffcanvasWrapper = () => {
  const { offcanvasComponent } = useSelector((store) => store.ui);
  let comp = null;
  switch (offcanvasComponent) {
    case 'search':
      comp = <Search />;
      break;
    case 'account':
      comp = <Register />;
      break;
    case 'cart':
      comp = <Cart />;
      break;
    default:
      comp = null;
      break;
  }

  return <Offcanvas>{comp}</Offcanvas>;
};

export default OffcanvasWrapper;
