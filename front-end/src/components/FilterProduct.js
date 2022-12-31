import React, { useState } from 'react';
import { FiChevronRight, FiChevronDown } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCategory,
  setMinPrice,
  setMaxPrice,
  clearFilters,
} from '../features/allProduct/allProductSlice';
const FilterProduct = () => {
  const dispatch = useDispatch();
  const { categories, selectedCategory, minPrice, maxPrice } = useSelector(
    (store) => store.allProducts
  );
  const [showAll, setShowAll] = useState(false);

  // change category on click
  const selectCategory = (val) => {
    dispatch(setCategory(val));
  };

  return (
    <>
      <div className='widget widget-categories mb-4 py-1'>
        <h3 className='widget-title'>Shop categories</h3>
        <ul id='shopCategories'>
          {categories.map((cats, index) => {
            if (index < 7) {
              return (
                <li key={index}>
                  <a
                    href={'#' + cats}
                    className={`${selectedCategory === cats ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      selectCategory(cats);
                    }}
                  >
                    <FiChevronRight className='widget-categories-indicator' />
                    {cats}
                  </a>
                </li>
              );
            }
            if (index >= 7 && showAll) {
              return (
                <li key={index}>
                  <a
                    href={'#' + cats}
                    className={`${selectedCategory === cats ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      selectCategory(cats);
                    }}
                  >
                    <FiChevronRight className='widget-categories-indicator' />
                    {cats}
                  </a>
                </li>
              );
            }
          })}
          <a
            href='/#'
            className='text-primary'
            onClick={(e) => {
              e.preventDefault();
              setShowAll(!showAll);
            }}
          >
            {!showAll ? 'Show all' : 'Hide'} <FiChevronDown />
          </a>
        </ul>
      </div>

      <div className='widget mb-4 pb-3'>
        <h3 className='widget-title'>Price range</h3>

        <div className='row price-range'>
          <div className='col-6'>
            <div className='input-group mr-3'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>From</span>
              </div>
              <input
                type='number'
                name='min'
                className='form-control'
                min={0}
                max={maxPrice}
                onChange={(e) => dispatch(setMinPrice(e.target.value))}
              />
            </div>
          </div>
          <div className='col-6'>
            <div className='input-group mr-3'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>to</span>
              </div>
              <input
                type='number'
                name='max'
                className='form-control'
                min={minPrice}
                onChange={(e) => dispatch(setMaxPrice(e.target.value))}
              />
            </div>
          </div>
        </div>
      </div>

      <button
        className='btn btn-danger'
        onClick={() => dispatch(clearFilters())}
      >
        Clear filters
      </button>
    </>
  );
};

export default FilterProduct;
