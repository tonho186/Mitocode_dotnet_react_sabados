import axios from 'axios';
import alertify from 'alertifyjs';

const httpService = axios.create({
  baseURL: 'http://localhost:5000/api'
});

httpService.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    alertify.error(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    console.log(response);
    return response;
  },
  function(error) {
    // Do something with response error
    alertify.error(error);
    return Promise.reject(error);
  }
);

function setJwt(jwt) {
  httpService.defaults.headers.common['Authorization'] = 'Bearer ' + jwt;
}

export default {
  get: httpService.get,
  post: httpService.post,
  put: httpService.put,
  delete: httpService.delete,
  setJwt
};
