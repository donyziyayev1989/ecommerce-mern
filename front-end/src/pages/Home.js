import React from 'react';
import Carousel from './../components/Carousel';
import Footer from './../components/Footer';
import Header from './../components/Header';
import OffcanvasWrapper from '../components/offcanvas/OffcanvasWrapper';

const Home = () => {
  return (
    <div className='offcanvas-open'>
      <OffcanvasWrapper></OffcanvasWrapper>
      <Header />
      <Carousel />
      <Footer />
    </div>
  );
};

export default Home;
