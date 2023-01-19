import React, { useState } from 'react';
import Carousel from './Carousel';

const CarouselWithThumbnails = ({ thumbnails, items }) => {
  const [index, setIndex] = useState(0);

  const goToSlide = (n) => {
    setIndex(n);
  };
  return (
    <>
      <ul className='product-thumbnails'>
        {thumbnails?.map((image, i) => {
          return (
            <li
              className={`img-thumbnail ${index === i ? 'active' : ''}`}
              key={i}
              onClick={() => goToSlide(i)}
            >
              <img src={image} alt={image?.alt} style={{ maxWidth: '72px' }} />
            </li>
          );
        })}
      </ul>
      <Carousel goToSlideIndex={index}>
        {items?.map((image, index) => {
          return (
            <img
              src={image}
              key={index}
              className='img-fluid object-fit-cover'
              alt=''
            />
          );
        })}
      </Carousel>
    </>
  );
};

export default CarouselWithThumbnails;
