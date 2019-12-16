import React from 'react';

import './ActividadCard.css';

const actividadCard = ({ actividad, actDelete, actEdit }) => {
  return (
    <div className='card mb-4 '>
      <div className='card-img-wrapper'>
        <ul className='list-inline actividad-icons animate text-center'>
          <li className='list-inline-item'>
            <button
              className='btn btn-primary btn-icon'
              onClick={() => actEdit(actividad)}
            >
              <i className='fa fa-edit' />
            </button>
          </li>
          <li className='list-inline-item'>
            <button
              className='btn btn-primary btn-icon'
              onClick={() => actDelete(actividad.id)}
            >
              <i className='fa fa-eraser' />
            </button>
          </li>
        </ul>
      </div>
      <div className='card-body p-1'>
        <h6 className='card-title text-center mb-1'>
          <i className='fa fa-user' /> {actividad.descripcion},{actividad.fechaRealizacion}
        </h6>
        <p className='card-text text-muted text-center'>{actividad.fechaRegistro}</p>
      </div>
    </div>
  );
};

export default actividadCard;
