import React from 'react';
import { FiChevronRight, FiX, FiCreditCard } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../../features/cart/cartSlice';

const OffcanvasCart = () => {
  const { products, total, totalProducts, totalQuantity } = useSelector(
    (store) => store.cart
  );
  const dispatch = useDispatch();
  return (
    <>
      {totalProducts > 0 && (
        <div className='text-right'>
          <a
            className='text-danger btn-sm pr-0'
            href='/#'
            onClick={(e) => {
              e.preventDefault();
              dispatch(clearCart());
            }}
          >
            <FiX className='mr-1' />
            Clear cart
          </a>
        </div>
      )}
      <div className='widget widget-featured-entries pt-3'>
        {products.length < 1 && (
          <div className='media'>No products in you card</div>
        )}
        {products.map((product) => {
          const { id, title, thumbnail, price, count } = product;
          return (
            <div className='media' key={id}>
              <div className='featured-entry-thumb mr-3'>
                <Link to={`/products/${id}`}>
                  <img src={thumbnail} width='64' alt='Product thumb' />
                </Link>
                <span
                  className='item-remove-btn'
                  onClick={() => dispatch(removeFromCart(id))}
                >
                  <FiX />
                </span>
              </div>
              <div className='media-body'>
                <h6 className='featured-entry-title'>
                  <Link to={`/products/${id}`}>{title}</Link>
                </h6>
                <p className='featured-entry-meta'>
                  {count} <span className='text-muted'>x</span> ${price}
                </p>
              </div>
            </div>
          );
        })}

        {totalProducts > 0 && (
          <>
            <hr />
            <div className='d-flex justify-content-between align-items-center py-3'>
              <div className='font-size-sm'>
                <span className='mr-2'>Subtotal: </span>
                <span className='font-weight-semibold text-dark'>${total}</span>
              </div>
              <Link className='btn btn-outline-secondary btn-sm' to='/cart'>
                Expand cart <FiChevronRight />
              </Link>
            </div>
            <Link className='btn btn-primary btn-sm btn-block' to='/cart'>
              <FiCreditCard className='mr-1' />
              Checkout
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default OffcanvasCart;
