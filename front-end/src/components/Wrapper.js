import React from 'react';
import OffcanvasWrapper from './offcanvas/OffcanvasWrapper';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Wrapper = () => {
  return (
    <div>
      <OffcanvasWrapper />
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
};

export default Wrapper;
