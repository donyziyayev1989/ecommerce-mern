import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { NavLink, Link } from 'react-router-dom';

const Pagination = ({
  numOfPages,
  nextPage,
  goToPage,
  currentPage,
  prevPage,
}) => {
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });
  return (
    <nav aria-label='Pagination'>
      <ul className='pagination'>
        <li className='page-item'>
          <Link
            className={`${
              currentPage < 2 ? 'page-link disable-link' : 'page-link'
            }`}
            aria-label='Previous'
            to={`?page=${currentPage - 1}`}
            onClick={() => prevPage()}
          >
            <FiChevronLeft />
          </Link>
        </li>
        <li className='page-item d-sm-none'>
          <span className='page-link page-link-static'>
            {currentPage} / {numOfPages}
          </span>
        </li>
        {pages.map((page) => {
          return (
            <li
              className={`page-item d-none d-sm-block ${
                currentPage === page ? 'active' : ''
              }`}
              key={page}
            >
              <button
                to={`?page=${page}`}
                className='page-link'
                onClick={(e) => goToPage(page)}
              >
                {page}
              </button>
            </li>
          );
        })}

        <li className='page-item'>
          <Link
            className={`${
              currentPage === numOfPages
                ? 'page-link disable-link'
                : 'page-link'
            }`}
            to={`?page=${currentPage + 1}`}
            aria-label='Next'
            onClick={() => nextPage()}
          >
            <FiChevronRight />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
