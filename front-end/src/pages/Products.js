import React, { useEffect } from 'react';
import ProductList from '../components/product/ProductList';
import Sidebar from '../components/Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import Sort from '../components/Sort';
import FilterProduct from '../components/FilterProduct';
import Pagination from '../components/Pagination';
import Loading from './../components/Loading';
import PageTitle from '../components/PageTitle';

import {
  nextPage,
  goToPage,
  prevPage,
  setLimit,
  getAllCategories,
  getAllProducts,
  handleValue,
} from '../features/allProduct/allProductSlice';

const Products = () => {
  const {
    isLoading,
    products,
    page,
    totalProducts,
    numOfPages,
    limit,
    selectedCategory,
    search,
  } = useSelector((store) => store.allProducts);
  const dispatch = useDispatch();

  const nextPageHandler = () => {
    dispatch(nextPage());
  };
  const prevPageHandler = () => {
    dispatch(prevPage());
  };
  const goToPageNumber = (page) => {
    dispatch(goToPage(page));
  };
  const setLimits = (val) => {
    dispatch(setLimit(val));
  };

  // Getting all categories
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  // Get all products
  useEffect(() => {
    dispatch(getAllProducts());
  }, [page, limit, selectedCategory]);

  return (
    <>
      <PageTitle />
      <div className='container pb-5 mb-4'>
        <div className='row'>
          <Sidebar>
            <FilterProduct />
          </Sidebar>
          <div className='col-lg-9'>
            <Sort
              goToPage={goToPageNumber}
              currentPage={page}
              numOfPages={numOfPages}
              totalProducts={totalProducts}
              setLimit={setLimits}
              limit={limit}
            />
            {isLoading && <Loading type='primary' />}
            {search && (
              <div className='d-flex align-items-center mb-3 justify-content-between'>
                <h5 className='mb-0'>
                  {totalProducts} products found for the term "{search}""
                </h5>
                <a
                  href='/#'
                  className='btn btn-outline-dark'
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(handleValue({ search: '' }));
                    dispatch(getAllProducts());
                  }}
                >
                  clear search
                </a>
              </div>
            )}
            <ProductList
              classes='col-md-4 col-sm-6'
              products={products}
              isLoading={isLoading}
            />
            <hr className='pb-4 mb-2' />
            {numOfPages > 1 && (
              <Pagination
                numOfPages={numOfPages}
                nextPage={nextPageHandler}
                prevPage={prevPageHandler}
                goToPage={goToPageNumber}
                currentPage={page}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
