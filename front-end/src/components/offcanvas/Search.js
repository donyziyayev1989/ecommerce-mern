import React, { useEffect } from 'react';
import { FiChevronRight, FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleValue,
  searchProducts,
  getAllProducts,
  goToPage,
} from '../../features/allProduct/allProductSlice';
import { Link } from 'react-router-dom';
import Loading from '../Loading';

const OffcanvasSearch = () => {
  const dispatch = useDispatch();
  const { search, quickSearchItems, isSearchLoading } = useSelector(
    (store) => store.allProducts
  );
  const handleVal = (e) => {
    dispatch(handleValue({ [e.target.name]: e.target.value }));
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllProducts());
    // dispatch(handleValue({ search: '' }));
    dispatch(goToPage(1));
  };
  useEffect(() => {
    dispatch(searchProducts());
  }, [search]);
  return (
    <>
      <form className='input-group pt-3' onSubmit={submitHandler}>
        <div className='input-group-prepend'>
          <button className='input-group-text' id='search-icon' type='submit'>
            <FiSearch />
          </button>
        </div>
        <div className='easy-autocomplete'>
          <input
            className='form-control'
            type='text'
            id='site-search'
            name='search'
            placeholder='Search site'
            aria-label='Search site'
            aria-describedby='search-icon'
            autoComplete='off'
            value={search}
            onChange={(e) => handleVal(e)}
          />
          <div
            className='easy-autocomplete-container'
            id='eac-container-site-search'
          >
            {isSearchLoading && <Loading />}
            {search && (
              <ul className='list-group list-group-flush'>
                {quickSearchItems.map((item) => {
                  return (
                    <li key={item.id} className='list-group-item'>
                      <Link className='d-flex' to={`/products/${item.id}`}>
                        <div style={{ maxWidth: '50px' }}>
                          <img src={item.thumbnail} alt={item.title} />
                        </div>
                        <div className='ml-2 mr-auto'>{item.title}</div>
                        <div>
                          <FiChevronRight />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </form>
      {!isSearchLoading && !search && (
        <small className='form-text pt-1'>
          Type A or C to see suggestions. Powered by Easy autocomplete plugin
          via separate JSON file.
        </small>
      )}
    </>
  );
};

export default OffcanvasSearch;
