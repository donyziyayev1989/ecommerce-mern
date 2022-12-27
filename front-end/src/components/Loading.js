import React from 'react';

const Loading = ({ type }) => {
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div
        className={`spinner-border text-${type ? type : 'primary'}`}
        role='status'
      >
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
