import React from 'react';

const input = ({ name, label, error, ...rest }) => {
  return (
    <div className='form-group'>
      <input
        {...rest}
        name={name}
        id={name}
        className='form-control'
        placeholder={label}
      />
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  );
};

export default input;
