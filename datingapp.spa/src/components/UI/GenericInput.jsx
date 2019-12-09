import React from 'react';

const genericInput = ({ name, label, classes, ...rest }) => {
  return (
    <div className='form-group'>
      <input
        {...rest}
        name={name}
        id={name}
        className={classes}
        placeholder={label}
      />
    </div>
  );
};

export default genericInput;
