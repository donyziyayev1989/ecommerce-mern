import React from 'react';
import OffcanvasWrapper from './offcanvas/OffcanvasWrapper';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Wrapper = () => {
  return (
    <>
      <OffcanvasWrapper />
      <Header />

      <Outlet />

      <Footer />
    </>
  );
};

export default Wrapper;
