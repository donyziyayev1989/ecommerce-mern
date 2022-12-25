import React from 'react';

const FormGroup = ({
  name,
  type,
  placeholder,
  required,
  feadback,
  label,
  srcOnly,
}) => {
  return (
    <div className='form-group'>
      <label className={`${srcOnly ? 'sr-only' : ''}`} htmlFor={name}>
        {label ? label : name}
      </label>
      <input
        className='form-control'
        type={type}
        id={name}
        placeholder={placeholder ? placeholder : ''}
        aria-label={label ? label : name}
        required={`${required} ? true : false`}
      />
      {feadback && <div className='invalid-feedback'>{feadback}</div>}
    </div>
  );
};

export default FormGroup;
