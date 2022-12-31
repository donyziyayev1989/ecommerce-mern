import React from 'react';
import CarouselHome from '../components/Carousel/CarouselHome';

const items = [
  {
    id: 1,
    img: './assets/apparel/hero-slide-logo01.png',
    imgLg: './assets/apparel/hero-slide01.jpg',
    title: 'Sneakers Classic Collection',
    subtitle: 'starting at $105.99',
    btnText: 'Shop now',
    btnLink: '/',
  },
  {
    id: 2,
    img: './assets/apparel/hero-slide-logo02.png',
    imgLg: './assets/apparel/hero-slide02.jpg',
    title: 'Sneakers Classic Collection',
    subtitle: 'starting at $105.99',
    btnText: 'Shop now',
    btnLink: '/',
  },
  {
    id: 3,
    img: './assets/apparel/hero-slide-logo03.png',
    imgLg: './assets/apparel/hero-slide03.jpg',
    title: 'Sneakers Classic Collection',
    subtitle: 'starting at $105.99',
    btnText: 'Shop now',
    btnLink: '/',
  },
];

const Home = () => {
  return (
    <>
      <CarouselHome items={items} />
      <section className='container pt-3 pb-4'>
        <h2 className='h3 text-center pb-4'>Featured products</h2>
      </section>
    </>
  );
};

export default Home;
