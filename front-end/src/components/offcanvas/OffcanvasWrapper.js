import React from 'react';
import Offcanvas from './Offcanvas';
import { useSelector } from 'react-redux';
import OffcanvasSearch from './OffcanvasSearch';
import OffcanvasAccount from './OffcanvasAccount';
import OffcanvasCart from './OffcanvasCart';

const OffcanvasWrapper = () => {
  const { component } = useSelector((store) => store.offcanvas);
  let comp = null;
  switch (component) {
    case 'search':
      comp = <OffcanvasSearch />;
      break;
    case 'account':
      comp = <OffcanvasAccount />;
      break;
    case 'cart':
      comp = <OffcanvasCart />;
      break;
    default:
      comp = null;
      break;
  }

  return <Offcanvas>{comp}</Offcanvas>;
};

export default OffcanvasWrapper;
