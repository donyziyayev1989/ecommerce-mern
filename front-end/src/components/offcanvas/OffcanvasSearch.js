import React from 'react';
import { SearchIcon } from '../../assets/icons';

const OffcanvasSearch = () => {
  return (
    <>
      <div className='input-group pt-3'>
        <div className='input-group-prepend'>
          <span className='input-group-text' id='search-icon'>
            <SearchIcon />
          </span>
        </div>
        <div className='easy-autocomplete'>
          <input
            className='form-control'
            type='text'
            id='site-search'
            placeholder='Search site'
            aria-label='Search site'
            aria-describedby='search-icon'
            autocomplete='off'
          />
          <div
            className='easy-autocomplete-container'
            id='eac-container-site-search'
          >
            <ul>
              <li>abdjsbdjsd</li>
              <li>abdjsbdjsd</li>
              <li>abdjsbdjsd</li>
            </ul>
          </div>
        </div>
      </div>
      <small className='form-text pt-1'>
        Type A or C to see suggestions. Powered by Easy autocomplete plugin via
        separate JSON file.
      </small>
    </>
  );
};

export default OffcanvasSearch;
