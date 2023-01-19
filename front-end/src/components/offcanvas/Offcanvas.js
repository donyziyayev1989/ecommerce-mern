import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideOffCanvas } from '../../features/ui/uiSlice';
import { motion, AnimatePresence } from 'framer-motion';

const Offcanvas = ({ children }) => {
  const { offcanvasShow, offcanvasTitle } = useSelector((store) => store.ui);
  const dispatch = useDispatch();
  return (
    <>
      <AnimatePresence>
        {offcanvasShow && (
          <motion.div
            className='backdrop'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => dispatch(hideOffCanvas())}
          ></motion.div>
        )}
      </AnimatePresence>

      <div
        className={`offcanvas offcanvas-reverse ${offcanvasShow ? 'show' : ''}`}
      >
        <div className='offcanvas-header d-flex justify-content-between align-items-center'>
          <h3 className='offcanvas-title'>{offcanvasTitle}</h3>
          <button
            className='close'
            type='button'
            onClick={() => {
              dispatch(hideOffCanvas());
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
    </>
  );
};

export default Offcanvas;
