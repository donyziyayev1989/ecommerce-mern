import React from 'react';
import Breadcrumbs from './Breadcrumb';

const PageTitle = ({ pageTitle, subTitle }) => {
  return (
    <div className='page-title-wrapper' aria-label='Page title'>
      <div className='container'>
        <Breadcrumbs />
        {pageTitle && (
          <h1 className='page-title'>
            {pageTitle}
            {subTitle && (
              <span className='lead font-weight-semibold text-muted'>
                ({subTitle})
              </span>
            )}
          </h1>
        )}
        <hr className='mt-4' />
      </div>
    </div>
  );
};

export default PageTitle;
