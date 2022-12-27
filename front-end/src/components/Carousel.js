import React, { useState } from 'react';
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Carousel = ({ items }) => {
  const [index, setIndex] = useState(0);
  const length = items.length;

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

  return (
    <section className='container-fluid bg-secondary px-0'>
      <div className='row no-gutters align-items-center'>
        <div className='col-md-6 carousel-wrapper'>
          <div
            className='carousel mx-auto my-sm-4'
            style={{ transform: `translateX(${style(index)})` }}
          >
            {items.map((item, ind) => {
              const { id, img, title, subtitle, btnText, btnLink } = item;

              return (
                <div
                  className='carousel_item bg-light py-5 px-3 px-sm-5'
                  key={id}
                >
                  <img
                    className='d-block mb-2'
                    src={process.env.PUBLIC_URL + img}
                    alt={title}
                  />
                  <h2 className='mb-1'>{title}</h2>
                  <h3 className='font-weight-light opacity-70 pb-3'>
                    {subtitle}
                  </h3>
                  <a className='btn btn-primary' href={btnLink}>
                    {btnText}
                    <FiArrowRight className='ml-2' />
                  </a>
                </div>
              );
            })}
          </div>
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
        </div>
        <div className='col-md-6'>
          {
            <img
              className='ml-auto mr-0 carousel-img'
              src={process.env.PUBLIC_URL + items[index].imgLg}
              alt={items[index]}
            ></img>
          }
        </div>
      </div>
    </section>
  );
};

export default Carousel;
