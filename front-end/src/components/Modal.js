import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { hideModal } from '../features/ui/uiSlice';

const Modal = ({ title, titleClass, noFooter, children, size }) => {
  const { modalShow } = useSelector((store) => store.ui);
  const dispatch = useDispatch();
  const modalVariant = {
    initial: { opacity: 0 },
    isOpen: { opacity: 0.5, transition: { type: 'spring', duration: 0.3 } },
    exit: { opacity: 0 },
  };
  const containerVariant = {
    initial: { transform: 'translate(x)', transition: { type: 'spring' } },
    isOpen: { top: '0' },
    exit: { top: '-50px' },
  };
  return (
    <AnimatePresence>
      {modalShow && (
        <motion.div
          initial={'initial'}
          animate={'isOpen'}
          exit={'exit'}
          variants={modalVariant}
          className='modal-backdrop'
          key={1}
        ></motion.div>
      )}
      <motion.div
        className='modal'
        role='dialog'
        initial={'initial'}
        animate={'isOpen'}
        exit={'exit'}
        key={2}
        variants={containerVariant}
      >
        <div
          className={`modal-dialog modal-${size ? size : ''}`}
          role='document'
        >
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className={`modal-title ${titleClass ? titleClass : ''}`}>
                {title}
              </h5>
              <button
                type='button'
                className='close'
                onClick={() => dispatch(hideModal())}
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>{children}</div>
            {!noFooter && (
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary btn-sm'
                  onClick={() => dispatch(hideModal())}
                >
                  Close
                </button>
                <button
                  type='button'
                  className='btn btn-primary btn-sm'
                  onClick={() => dispatch(hideModal())}
                >
                  Save changes
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
