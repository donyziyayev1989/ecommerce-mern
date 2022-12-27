import React from 'react';

const InputGroup = ({
  type,
  name,
  placeholder,
  required,
  label,
  feedback,
  icon,
}) => {
  return (
    <div className='form-group'>
      <label className='sr-only' htmlFor={name}>
        {label || name}
      </label>
      <div className='input-group'>
        <div className='input-group-prepend'>
          <span className='input-group-text' id={`${name}'-icon'`}>
            {icon}
          </span>
        </div>
        <input
          className='form-control'
          type={type}
          id={name}
          placeholder={placeholder}
          aria-label={label}
          aria-describedby={`${name}'-icon'`}
          required={`${required} ? true : false`}
        />
        {feedback && <div className='invalid-feedback'>{feedback}</div>}
      </div>
    </div>
  );
};

export default InputGroup;
