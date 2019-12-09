import React from 'react';
import GenericInput from '../../../components/UI/GenericInput';

const editActividad = props => {
  const { actividad, handleSubmit, handleChange } = props;
  return (
    <form onSubmit={handleSubmit}>
      <h4>Descripcion:</h4>
      <div className='form-inline'>
        <label htmlFor='descripcion' style={{ margin: '0 3px 0 0' }}>
        Descripcion:
        </label>
        <GenericInput
          type='text'
          classes='form-control'
          name='descripcion'
          value={actividad.descripcion}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default editActividad;
