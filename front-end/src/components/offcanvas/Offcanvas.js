import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hide } from '../../features/offcanvas/offcanvasSlice';

const Offcanvas = ({ children }) => {
  const { show, title } = useSelector((store) => store.offcanvas);
  const dispatch = useDispatch();
  return (
    <div
      className={`${
        show
          ? 'offcanvas offcanvas-reverse show'
          : 'offcanvas offcanvas-reverse'
      }`}
    >
      <div className='offcanvas-header d-flex justify-content-between align-items-center'>
        <h3 className='offcanvas-title'>{title}</h3>
        <button
          className='close'
          type='button'
          onClick={() => {
            dispatch(hide());
          }}
          aria-label='Close'
        >
          <span aria-hidden='true'>×</span>
        </button>
      </div>
      <div className='offcanvas-body'>
        <div className='offcanvas-body-inner'>{children}</div>
      </div>
    </div>
  );
};

export default Offcanvas;
