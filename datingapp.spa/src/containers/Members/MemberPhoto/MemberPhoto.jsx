import React from 'react';
import classnames from 'classnames';

import Button from '../../../components/UI/Button';
import './MemberPhoto.css';

const memberPhoto = ({ photo, setMainPhoto, deletePhoto }) => {
  return (
    <div className='col-sm-2 img-wrapper'>
      <img
        src={photo.url}
        className={classnames({
          'memberPhoto p-1': true,
          'not-approved': !photo.isApproved
        })}
        alt={photo.description}
      />
      <div className='text-center img-text' hidden={photo.isApproved}>
        <span className='text-warning'>Awaiting approval</span>
      </div>

      <div className='text-center'>
        <button
          type='button'
          className={classnames({
            'btn btn-sm': true,
            'btn-success active': photo.isMain,
            'btn-outline-primary': !photo.isMain
          })}
          onClick={() => setMainPhoto(photo)}
          disabled={photo.isMain || !photo.isApproved}
        >
          Main
        </button>
        <Button
          type='button'
          bsClasses='btn btn-sm btn-danger'
          clicked={() => deletePhoto(photo.id)}
          disabled={photo.isMain || !photo.isApproved}
        >
          <i className='fa fa-trash-o' />
        </Button>
      </div>
    </div>
  );
};

export default memberPhoto;
