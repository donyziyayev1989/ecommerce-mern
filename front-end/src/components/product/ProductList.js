import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../Modal';
import QuickView from './QuickView';
import Loading from '../Loading';
import { getSingleProduct } from '../../features/product/productSlice';
import { setViewId } from '../../features/allProduct/allProductSlice';
import { openModal } from '../../features/ui/uiSlice';
import { addToCart } from '../../features/cart/cartSlice';

const ProductList = ({ classes, products, isLoading }) => {
  const { quickViewId } = useSelector((store) => store.allProducts);
  const { modalShow } = useSelector((store) => store.ui);
  const { isSingleLoading, product } = useSelector((store) => store.product);
  const dispatch = useDispatch();

  const setQuickViewId = (id) => {
    dispatch(setViewId(id));
    dispatch(openModal());
  };
  const addToCartHandle = (payload) => {
    dispatch(addToCart(payload));
  };
  useEffect(() => {
    dispatch(getSingleProduct(quickViewId));
  }, [quickViewId]);

  // if (!isLoading && products.length === 0) {
  //   return <h1>There is no product</h1>;
  // }

  return (
    <>
      {modalShow && (
        <Modal size='xl' title={product?.title} noFooter>
          <QuickView
            {...product}
            isLoading={isSingleLoading}
            addToCart={addToCartHandle}
          />
        </Modal>
      )}
      <div className='row'>
        {products?.map((product, index) => {
          return (
            <div
              className={`${classes ? classes : 'col-lg-3 col-md-4 col-sm-6'}`}
              key={index}
            >
              <ProductCard
                {...product}
                setViewId={setQuickViewId}
                addToCart={addToCartHandle}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductList;
