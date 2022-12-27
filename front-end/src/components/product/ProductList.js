import React, { useEffect } from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ classes, products }) => {
  return (
    <>
      <div className='row'>
        {products?.map((product, index) => {
          return (
            <div
              className={`${classes ? classes : 'col-lg-3 col-md-4 col-sm-6'}`}
              key={index}
            >
              <ProductCard {...product} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductList;
