import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiHeart, FiHome, FiShoppingCart } from 'react-icons/fi';
import { getSingleProduct } from '../features/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import CarouselWithThumbnails from './../components/Carousel/CarouselWithThumbnails';
import { addToCart } from '../features/cart/cartSlice';
import Breadcrumbs from '../components/Breadcrumb';

const SingleProduct = () => {
  const { isSingleLoading, product } = useSelector((store) => store.product);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);

  useEffect(() => {
    dispatch(getSingleProduct(productId));
  }, [productId]);

  if (isSingleLoading) {
    return <Loading />;
  }

  return (
    <div className='container pb-5'>
      <div className='row pt-5'>
        <div className='col-lg-7'>
          <div className='d-lg-none pb-2'>
            <Breadcrumbs />
            <h1 className='page-title pt-1'>{product?.title}</h1>
            <h2 className='h1 text-primary font-weight-light pt-3 pb-2'>
              ${product?.price}
            </h2>
          </div>
          <div className='product-gallery'>
            <CarouselWithThumbnails
              thumbnails={product?.images}
              items={product?.images}
            />
          </div>
        </div>
        {/* <!-- Product details column            --> */}
        <div className='col-lg-5 pt-4 pt-lg-0'>
          {/* <!-- Product title and price (visible lg and up)--> */}
          <div className='d-none d-lg-block'>
            <Breadcrumbs />
            <h1 className='page-title pt-1'>{product?.title}</h1>
            <h2 className='h1 text-primary font-weight-light pt-3 pb-2'>
              ${product?.price}
            </h2>
          </div>
          <form className='pb-4'>
            <div className='form-group mb-1'>
              <label className='d-block'>Choose color</label>
              <div className='custom-control custom-option custom-control-inline mb-2'>
                <input
                  className='custom-control-input'
                  type='radio'
                  name='color'
                  value='dark'
                  id='dark'
                  required=''
                />
                <label className='custom-option-label' htmlFor='dark'>
                  <span
                    className='custom-option-color'
                    style={{ backgroundColor: '#2c363f' }}
                  ></span>
                </label>
              </div>
              <div className='custom-control custom-option custom-control-inline mb-2'>
                <input
                  className='custom-control-input'
                  type='radio'
                  name='color'
                  value='red'
                  id='red'
                  required=''
                />
                <label className='custom-option-label' htmlFor='red'>
                  <span
                    className='custom-option-color'
                    style={{ backgroundColor: '#e7484d' }}
                  ></span>
                </label>
              </div>
              <div className='custom-control custom-option custom-control-inline mb-2'>
                <input
                  className='custom-control-input'
                  type='radio'
                  name='color'
                  value='white'
                  id='white'
                  required=''
                />
                <label className='custom-option-label' htmlFor='white'>
                  <span
                    className='custom-option-color'
                    style={{ backgroundColor: '#e0dfe4' }}
                  ></span>
                </label>
              </div>
              <div className='custom-control custom-option custom-control-inline mb-2'>
                <input
                  className='custom-control-input'
                  type='radio'
                  name='color'
                  value='beige'
                  id='beige'
                  required=''
                />
                <label className='custom-option-label' htmlFor='beige'>
                  <span
                    className='custom-option-color'
                    style={{ backgroundColor: '#e6ddd6' }}
                  ></span>
                </label>
              </div>
            </div>
            <div className='form-group'>
              <select
                className='form-control custom-select'
                id='size'
                name='size'
                required=''
              >
                <option value=''>- Select a size</option>
                <option value='13'>13</option>
                <option value='12'>12</option>
                <option value='11.5'>11.5</option>
                <option value='11'>11</option>
                <option value='10.5'>10.5</option>
                <option value='10'>10</option>
                <option value='9.5'>9.5</option>
                <option value='9'>9</option>
                <option value='8.5'>8.5</option>
                <option value='8'>8</option>
                <option value='7.5'>7.5</option>
              </select>
            </div>
            <div className='d-flex flex-wrap align-items-center pt-1'>
              <div>
                <input
                  className='px-2 form-control mr-2'
                  type='number'
                  name='quantity'
                  style={{ width: '3.2rem' }}
                  value={count}
                  min={1}
                  max={product?.stock}
                  onChange={(e) => setCount(e.target.value)}
                />
              </div>
              <div>
                <button
                  className='btn btn-primary px-5 mr-2'
                  type='button'
                  onClick={() =>
                    dispatch(
                      addToCart({
                        id: product?.id,
                        thumbnail: product?.thumbnail,
                        price: product?.price,
                        stock: product?.stock,
                        title: product?.title,
                        count,
                      })
                    )
                  }
                >
                  <FiShoppingCart />
                  Add to cart
                </button>
              </div>
              <a className='btn box-shadow-0 nav-link-inline my-2' href='/#'>
                <FiHeart />
                Add to wishlist
              </a>
            </div>
          </form>
          {/* <!-- Product panels--> */}
          {/* <div className='accordion' id='productPanels'>
            <div className='card'>
              <div className='card-header'>
                <h3 className='accordion-heading'>
                  <a
                    href='#productInfo'
                    role='button'
                    data-toggle='collapse'
                    aria-expanded='true'
                    aria-controls='productInfo'
                  >
                    <span className='d-inline-block pr-2 border-right mr-2 align-middle mt-n1'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        className='feather feather-info'
                        style={{ width: '1.1rem', height: '1.1rem' }}
                      >
                        <circle cx='12' cy='12' r='10'></circle>
                        <line x1='12' y1='16' x2='12' y2='12'></line>
                        <line x1='12' y1='8' x2='12' y2='8'></line>
                      </svg>
                    </span>
                    Product information
                    <span className='accordion-indicator'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        className='feather feather-chevron-up'
                      >
                        <polyline points='18 15 12 9 6 15'></polyline>
                      </svg>
                    </span>
                  </a>
                </h3>
              </div>
              <div
                className='collapse show'
                id='productInfo'
                data-parent='#productPanels'
              >
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
            <div className='card'>
              <div className='card-header'>
                <h3 className='accordion-heading'>
                  <a
                    className='collapsed'
                    href='#shippingOptions'
                    role='button'
                    data-toggle='collapse'
                    aria-expanded='true'
                    aria-controls='shippingOptions'
                  >
                    <span className='d-inline-block pr-2 border-right mr-2 align-middle mt-n1'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        className='feather feather-truck'
                        style={{ width: '1.1rem', height: '1.1rem' }}
                      >
                        <rect x='1' y='3' width='15' height='13'></rect>
                        <polygon points='16 8 20 8 23 11 23 16 16 16 16 8'></polygon>
                        <circle cx='5.5' cy='18.5' r='2.5'></circle>
                        <circle cx='18.5' cy='18.5' r='2.5'></circle>
                      </svg>
                    </span>
                    Shipping options
                    <span className='accordion-indicator'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        className='feather feather-chevron-up'
                      >
                        <polyline points='18 15 12 9 6 15'></polyline>
                      </svg>
                    </span>
                  </a>
                </h3>
              </div>
              <div
                className='collapse'
                id='shippingOptions'
                data-parent='#productPanels'
              >
                <div className='card-body'>
                  <div className='d-flex justify-content-between border-bottom pb-2'>
                    <div>
                      <div className='font-weight-semibold text-dark'>
                        Courier
                      </div>
                      <div className='font-size-sm text-muted'>2 - 4 days</div>
                    </div>
                    <div>$26.50</div>
                  </div>
                  <div className='d-flex justify-content-between border-bottom py-2'>
                    <div>
                      <div className='font-weight-semibold text-dark'>
                        Local shipping
                      </div>
                      <div className='font-size-sm text-muted'>
                        up to one week
                      </div>
                    </div>
                    <div>$10.00</div>
                  </div>
                  <div className='d-flex justify-content-between border-bottom py-2'>
                    <div>
                      <div className='font-weight-semibold text-dark'>
                        Flat rate
                      </div>
                      <div className='font-size-sm text-muted'>5 - 7 days</div>
                    </div>
                    <div>$33.85</div>
                  </div>
                  <div className='d-flex justify-content-between border-bottom py-2'>
                    <div>
                      <div className='font-weight-semibold text-dark'>
                        UPS ground shipping
                      </div>
                      <div className='font-size-sm text-muted'>4 - 6 days</div>
                    </div>
                    <div>$18.00</div>
                  </div>
                  <div className='d-flex justify-content-between pt-2'>
                    <div>
                      <div className='font-weight-semibold text-dark'>
                        Local pickup from store
                      </div>
                      <div className='font-size-sm text-muted'>—</div>
                    </div>
                    <div>$0.00</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='card'>
              <div className='card-header'>
                <h3 className='accordion-heading'>
                  <a
                    className='collapsed'
                    href='#tagCloud'
                    role='button'
                    data-toggle='collapse'
                    aria-expanded='true'
                    aria-controls='tagCloud'
                  >
                    <span className='d-inline-block pr-2 border-right mr-2 align-middle mt-n1'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        className='feather feather-tag'
                        style={{ width: '1.1rem', height: '1.1rem' }}
                      >
                        <path d='M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z'></path>
                        <line x1='7' y1='7' x2='7' y2='7'></line>
                      </svg>
                    </span>
                    Tag cloud
                    <span className='accordion-indicator'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        stroke-width='2'
                        stroke-linecap='round'
                        stroke-linejoin='round'
                        className='feather feather-chevron-up'
                      >
                        <polyline points='18 15 12 9 6 15'></polyline>
                      </svg>
                    </span>
                  </a>
                </h3>
              </div>
              <div
                className='collapse'
                id='tagCloud'
                data-parent='#productPanels'
              >
                <div className='card-body'>
                  <a className='tag-link mr-2 mb-2' href='#'>
                    #sports shoes
                  </a>
                  <a className='tag-link mr-2 mb-2' href='#'>
                    #men's shoes
                  </a>
                  <a className='tag-link mr-2 mb-2' href='#'>
                    #sneakers
                  </a>
                  <a className='tag-link mr-2 mb-2' href='#'>
                    #reebok classic
                  </a>
                  <a className='tag-link mr-2 mb-2' href='#'>
                    #leather shoes
                  </a>
                  <a className='tag-link mr-2 mb-2' href='#'>
                    #running
                  </a>
                  <a className='tag-link mr-2 mb-2' href='#'>
                    #dark blue
                  </a>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
