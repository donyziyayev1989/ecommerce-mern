import React from 'react';

const Card = ({ title, children }) => {
  return (
    <div className='card'>
      <div className='card-body'>
        {title && <h5 className='card-title'>{title}</h5>}
        {children && (
          <p className='card-text font-size-sm text-muted'>{children}</p>
        )}
      </div>
    </div>
  );
};

export default Card;
