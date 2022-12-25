import React from 'react';

const Button = ({ children, type, variant, outline, block }) => {
  return (
    <button
      className={`btn btn-${variant ? variant : 'primary'} ${
        block ? 'btn-block' : ''
      }`}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
