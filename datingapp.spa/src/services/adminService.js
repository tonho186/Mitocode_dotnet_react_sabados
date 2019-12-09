import http from './httpService';

const apiEndpoint = '/admin';

export function getPhotosForApproval() {
  return http.get(apiEndpoint + '/photosForModeration');
}

export function approvePhoto(photoId) {
  return http.post(apiEndpoint + '/approvedPhoto/' + photoId, {});
}

export function rejectPhoto(photoId) {
  return http.post(apiEndpoint + '/rejectPhoto/' + photoId, {});
}

export default {
  getPhotosForApproval,
  approvePhoto,
  rejectPhoto
};
