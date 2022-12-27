import React, { useEffect } from 'react';
import { FiHome } from 'react-icons/fi';
import ProductList from '../components/product/ProductList';
import Sidebar from '../components/Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts } from '../features/allProduct/allProductSlice';
import Loading from './../components/Loading';
import Pagination from '../components/Pagination';
import {
  nextPage,
  goToPage,
  prevPage,
  setLimit,
} from '../features/allProduct/allProductSlice';
import Sort from '../components/Sort';

const Products = () => {
  const {
    isLoading,
    products,
    page,
    totalProducts,
    numOfPages,
    limit,
    categories,
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

  useEffect(() => {
    dispatch(getAllProducts());
  }, [page, limit]);
  return (
    <>
      <div className='page-title-wrapper' aria-label='Page title'>
        <div className='container'>
          <nav aria-label='breadcrumb'>
            <ol className='breadcrumb'>
              <li className='mt-n1 mr-1'>
                <FiHome className='icon' />
              </li>
              <li className='breadcrumb-item'>
                <a href='index.html'>Home</a>
              </li>
              <li className='breadcrumb-item'>
                <a href='#'>Shop</a>
              </li>
            </ol>
          </nav>

          <hr className='mt-4' />
        </div>
      </div>
      <div className='container pb-5 mb-4'>
        <div className='row'>
          <Sidebar>
            <h1>Sidebar</h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur, necessitatibus et molestias magni blanditiis, enim,
            quos maiores expedita a provident magnam assumenda dolore iusto!
            Odio consequuntur non consequatur alias eius, sed eum omnis error
            ratione laborum. Deserunt consequuntur voluptas reiciendis earum
            doloremque itaque facere, at libero ipsa ipsum. Totam eveniet neque
            ullam tempora reprehenderit alias voluptatem velit ea perferendis
          </Sidebar>
          <div className='col-lg-9'>
            {/* {isLoading && <Loading type='primary' />} */}
            <Sort
              goToPage={goToPageNumber}
              currentPage={page}
              numOfPages={numOfPages}
              totalProducts={totalProducts}
              setLimit={setLimits}
              limit={limit}
            />
            <ProductList classes='col-md-4 col-sm-6' products={products} />
            <hr className='pb-4 mb-2' />
            <Pagination
              numOfPages={numOfPages}
              nextPage={nextPageHandler}
              prevPage={prevPageHandler}
              goToPage={goToPageNumber}
              currentPage={page}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
