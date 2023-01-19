import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../Modal';
import QuickView from './QuickView';
import { getSingleProduct } from '../../features/product/productSlice';
import { setViewId } from '../../features/allProduct/allProductSlice';
import { openModal } from '../../features/ui/uiSlice';
import { addToCart } from '../../features/cart/cartSlice';
import { AnimatePresence, motion } from 'framer-motion';

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

  if (!isLoading && products.length === 0) {
    return <h1>There is no product</h1>;
  }
  const productAnimate = {
    initial: { rotateY: -90 },
    animate: { rotateY: 0 },
    exit: { rotateY: 90 },
  };
  return (
    <>
      {modalShow && (
        <Modal size='xl' title={product?.title} noFooter>
          {quickViewId && (
            <QuickView
              {...product}
              isLoading={isSingleLoading}
              addToCart={addToCartHandle}
            />
          )}
        </Modal>
      )}
      <div className='row'>
        <AnimatePresence exitBeforeEnter>
          {products?.map((product, index) => {
            return (
              <motion.div
                className={`${
                  classes ? classes : 'col-lg-3 col-md-4 col-sm-6'
                }`}
                key={product.id}
                variants={productAnimate}
                initial='initial'
                animate='animate'
                exit='exit'
                transition={{ duration: 0.3, ease: 'easeIn' }}
              >
                <ProductCard
                  {...product}
                  setViewId={setQuickViewId}
                  addToCart={addToCartHandle}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ProductList;
