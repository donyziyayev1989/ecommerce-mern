import React from 'react';
import { FiEye, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ProductCard = ({
  brand,
  category,
  description,
  discountPercentage,
  id,
  thumbnail,
  price,
  rating,
  title,
  oldPrice,
  stock,
  setViewId,
  addToCart,
}) => {
  return (
    <div className='product-card mb-4'>
      <div className='product-thumb'>
        <Link className='product-thumb-link' to={`/products/${id}`}>
          <img src={thumbnail} alt={title} />
        </Link>
        <span
          className='product-wishlist-btn'
          data-toggle='tooltip'
          data-placement='left'
          title={title}
          data-original-title='Add to wishlist'
        >
          <FiHeart />
        </span>
      </div>
      <div className='product-card-body text-center'>
        <Link className='product-meta' to={`/products/${category}`}>
          {category}
        </Link>

        <h3 className='product-card-title'>
          <Link to={`/products/${id}`}>{title}</Link>
        </h3>

        {!stock && <span class='text-muted'>Out of stock</span>}

        <span className='text-primary'>
          {oldPrice && <del className='text-muted mr-1'>${oldPrice}</del>} $
          {price}
        </span>
      </div>
      <div className='product-card-body body-hidden'>
        <button
          className='btn btn-primary btn-sm btn-block'
          type='button'
          onClick={() => addToCart({ id, thumbnail, price, stock, title })}
        >
          Add to cart
        </button>
        <a
          className='quick-view-btn'
          href='#quick-view'
          data-toggle='modal'
          onClick={() => setViewId(id)}
        >
          <FiEye className='mr-1' />
          Quick view
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
