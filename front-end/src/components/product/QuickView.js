import React, { useState } from 'react';
import { FiHeart, FiInfo, FiShoppingCart } from 'react-icons/fi';
import Carousel from '../Carousel/Carousel';
import Loading from '../Loading';
import Rating from '../Rating';

const QuickView = ({
  id,
  thumbnail,
  price,
  stock,
  images,
  title,
  rating,
  isLoading,
  addToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className='row'>
      <div className='col-lg-7'>
        <Carousel>
          {images?.map((image, index) => {
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
      </div>
      <div className='col-lg-5'>
        <div className='mb-3'>
          <Rating rating={rating} />
        </div>
        <div className='mb-3'>
          <div className='d-flex flex-wrap align-items-center pt-1'>
            <div>
              <input
                className='px-2 form-control mr-2'
                type='number'
                name='quantity'
                min={1}
                max={stock}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                style={{ width: '3.2rem' }}
                required=''
              />
            </div>
            <div>
              <button
                className='btn btn-primary px-5 mr-2'
                type='submit'
                onClick={() =>
                  addToCart({
                    id,
                    thumbnail,
                    price,
                    stock,
                    title,
                    count: quantity,
                  })
                }
              >
                <FiShoppingCart />
                Add to cart
              </button>
            </div>
            <a className='btn box-shadow-0 nav-link-inline my-2' href='/#'>
              <FiHeart />
              Wishlist
            </a>
          </div>
        </div>
        <div className='card'>
          <div className='card-header py-3 bg-0'>
            <h3 className='h6 mb-0'>
              <span className='d-inline-block pr-2 border-right mr-2 align-middle mt-n1'>
                <FiInfo />
              </span>
              Product information
            </h3>
          </div>
          <div className='card-body'>
            <ul className='mb-0'>
              <li>SKU: #8893249956</li>
              <li>Sneakers from Reebok Classic collection</li>
              <li>Man-made upper</li>
              <li>Lace-up closure</li>
              <li>Brand logo detail hits throughout</li>
              <li>Soft fabric lining and footbed</li>
              <li>Rubber outsole</li>
              <li>Product measurements were taken using size 8</li>
              <li>Weight of footwear is based on a single item</li>
              <li>Weight: 9 oz</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
