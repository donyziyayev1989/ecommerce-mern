import React from 'react';

const Sort = ({
  goToPage,
  currentPage,
  numOfPages,
  totalProducts,
  setLimit,
  limit,
}) => {
  return (
    <div className='d-flex flex-wrap justify-content-center justify-content-sm-between pb-3'>
      <div className='d-flex flex-wrap'>
        <div className='form-inline flex-nowrap mr-3 mr-sm-4 pb-3'>
          <label
            className='text-nowrap mr-2 d-none d-sm-block'
            htmlFor='sorting'
          >
            Sort by:
          </label>
          <select className='form-control custom-select' id='sorting'>
            <option>Popularity</option>
            <option>Low - Hight Price</option>
            <option>High - Low Price</option>
            <option>Average Rating</option>
            <option>A - Z Order</option>
            <option>Z - A Order</option>
          </select>
        </div>
        <div className='form-inline flex-nowrap pb-3'>
          <label className='mr-2 d-none d-sm-block' htmlFor='number'>
            Show:
          </label>
          <select
            className='form-control custom-select mr-sm-2'
            id='number'
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          >
            <option value='12'> 12</option>
            <option value='24'> 24</option>
            <option value='48'> 48</option>
            <option value='96'> 96</option>
          </select>
          <small className='form-text text-muted text-nowrap d-none d-sm-block'>
            from {totalProducts}
          </small>
        </div>
      </div>
      <div className='form-inline d-none d-md-flex flex-nowrap pb-3'>
        <label className='mr-2' htmlFor='pager'>
          Page:
        </label>
        <input
          className='form-control mr-2'
          type='number'
          id='pager'
          min={1}
          max={numOfPages}
          value={currentPage}
          style={{ width: '4rem' }}
          onChange={(e) => goToPage(e.target.value)}
        />
        <span className='form-text'>/ {numOfPages}</span>
      </div>
    </div>
  );
};

export default Sort;
