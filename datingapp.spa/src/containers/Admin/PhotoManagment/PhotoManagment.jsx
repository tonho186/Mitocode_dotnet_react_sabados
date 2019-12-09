import React, { Component } from 'react';
import Button from '../../../components/UI/Button';
import alertify from 'alertifyjs';

import adminService from '../../../services/adminService';
import auth from '../../../services/authService';
import './PhotoManagment.css';

class PhotoManagment extends Component {
  state = {
    photos: []
  };

  initializeConfirmMessage() {
    alertify.defaults.theme.ok = 'btn btn-primary';
    alertify.defaults.theme.cancel = 'btn btn-warning';
  }

  async componentDidMount() {
    const { data: photos } = await adminService.getPhotosForApproval();
    this.setState({ photos });
    this.initializeConfirmMessage();
  }

  handlerApprovePhoto = async photoId => {
    const originalPhotos = this.state.photos;
    const photos = this.state.photos;
    photos.splice(photos.findIndex(p => p.id === photoId), 1);
    this.setState({ photos });

    await adminService
      .approvePhoto(photoId)
      .then(() => {
        alertify.success('The photo was approved');
      })
      .catch(error => {
        alertify.error(error);
        this.setState({ photos: originalPhotos });
      });
  };

  handlerRejectPhoto = photoId => {
    const originalPhotos = this.state.photos;
    const photos = this.state.photos;

    const { unique_name: username } = auth.getDecodedToken();
    alertify.confirm(
      `Mr. ${username}`,
      'Are you sure you want to reject this photo?',
      async () => {
        photos.splice(photos.findIndex(p => p.id === photoId), 1);
        this.setState({ photos });

        await adminService
          .rejectPhoto(photoId)
          .then(() => {
            alertify.warning('The photo was rejected');
          })
          .catch(error => {
            alertify.warning(error);
            this.setState({ photos: originalPhotos });
          });
      },
      () => {}
    );
  };

  render() {
    const { photos } = this.state;

    return (
      <div className='row'>
        {photos.map(photo => (
          <div key={photo.id} className='col-sm-2'>
            <h4>{photo.userName}</h4>
            <img
              src={photo.url}
              alt={photo.userName}
              className='userPhoto p-1'
            />
            <div className='text-center' style={{ width: '150px' }}>
              <Button
                bsClasses='btn-sm btn-success mr-1'
                clicked={() => this.handlerApprovePhoto(photo.id)}
              >
                Aprove <i className='fa fa-plus-circle' aria-hidden='true' />
              </Button>
              <Button
                bsClasses='btn-sm btn-danger'
                clicked={() => this.handlerRejectPhoto(photo.id)}
              >
                Reject <i className='fa fa-ban' aria-hidden='true' />
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
    // return <p>Photos for approval</p>;
  }
}

export default PhotoManagment;
