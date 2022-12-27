import React from 'react';

const FormGroup = ({
  name,
  type,
  placeholder,
  value,
  required,
  feadback,
  label,
  srcOnly,
  handleChange,
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
        value={value}
        name={name}
        placeholder={placeholder ? placeholder : ''}
        aria-label={label ? label : name}
        required={`${required} ? true : false`}
        onChange={handleChange}
      />
      {feadback && <div className='invalid-feedback'>{feadback}</div>}
    </div>
  );
};

export default FormGroup;
