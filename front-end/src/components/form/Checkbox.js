import React from 'react';

const Checkbox = ({ name, label, disabled, checked, onChange, classes }) => {
  return (
    <div className={`${classes} custom-control custom-checkbox`}>
      <input
        className='custom-control-input'
        type='checkbox'
        name={name}
        id={name}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
      />
      <label className='custom-control-label' htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
