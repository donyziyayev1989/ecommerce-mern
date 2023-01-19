import React, { useState, Children, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Carousel = ({ children, goToSlideIndex }) => {
  const [index, setIndex] = useState(0);
  const carouselArray = Children.toArray(children);
  const length = carouselArray.length;

  const style = (index) => {
    const x = +index * 100;
    return `-${x}%`;
  };
  const checkIndex = (n) => {
    return (n + length) % length;
  };
  const prevSlide = () => {
    setIndex((i) => {
      const nextIndex = i - 1;
      return checkIndex(nextIndex);
    });
  };
  const nextSlide = () => {
    setIndex((i) => {
      const nextIndex = i + 1;
      return checkIndex(nextIndex);
    });
  };
  const gotoSlide = (n) => {
    setIndex(() => checkIndex(n));
  };
  useEffect(() => {
    gotoSlide(goToSlideIndex);
  }, [goToSlideIndex]);

  return (
    <div className='carousel-wrapper'>
      <div
        className='carousel mx-auto'
        style={{ transform: `translateX(${style(index)})` }}
      >
        {carouselArray.map((item, i) => {
          return (
            <div className='carousel_item bg-light' key={i}>
              {item}
            </div>
          );
        })}
      </div>
      {length > 1 && (
        <div className='carousel-controls btn-group' role='group'>
          <button
            type='button'
            className='btn btn-primary '
            disabled={index === 0}
            onClick={prevSlide}
          >
            <FiChevronLeft />
          </button>
          <button
            type='button'
            className='btn btn-primary '
            disabled={index === length - 1}
            onClick={nextSlide}
          >
            <FiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Carousel;
