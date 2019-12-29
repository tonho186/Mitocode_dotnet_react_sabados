import http from './httpService';

const apiEndpoint = '/users';

function userUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getUser(id) {
  return http.get(userUrl(id));
}

export function updateUser(id, user) {
  return http.put(userUrl(id), user);
}

export function setMainPhoto(userId, id) {
  return http.post(userUrl(userId) + '/photos/' + id + '/setMain', {});
}

export function deletePhoto(userId, id) {
  return http.delete(userUrl(userId) + '/photos/' + id);
}

export function addPhoto(userId, photo) {
  return http.post(userUrl(userId) + '/photos', photo);
}

export function getUsers(page, itemsPerPage, userParams, likesParam) {
  let params = new URLSearchParams();

  if (page && itemsPerPage) {
    params.append('pageNumber', page);
    params.append('pageSize', itemsPerPage);
  }

  if (userParams) {
    params.append('minAge', userParams.minAge);
    params.append('maxAge', userParams.maxAge);
    params.append('gender', userParams.gender);
    params.append('orderBy', userParams.orderBy);
  }

  if (likesParam === 'Likers') {
    params.append('likers', 'true');
  }

  if (likesParam === 'Likees') {
    params.append('likees', 'true');
  }

  return http.get(apiEndpoint, { params });
}

export function sendLike(userId, recipientId) {
  return http.post(userUrl(userId) + '/like/' + recipientId, {});
}

export function getActividades(userId, page, itemsPerPage) {
  let params = new URLSearchParams();

  if (page && itemsPerPage) {
    params.append('pageNumber', page);
    params.append('pageSize', itemsPerPage);
  }

  return http.get(userUrl(userId) + '/actividades', { params });
}

export function getActividad(userId, id) {
  return http.get(userUrl(userId) + '/actividades' + id);
}

export function updateActividad(userId, id, actividad) {
  return http.put(userUrl(userId) + '/actividades' + id, actividad);
}

export function deleteActividad(userId, id) {
  return http.delete(userUrl(userId) + '/actividades/' + id);
}

export default {
  getUser,
  updateUser,
  setMainPhoto,
  deletePhoto,
  addPhoto,
  getUsers,
  sendLike,
  getActividad,
  updateActividad,
  getActividades,
  deleteActividad
};
