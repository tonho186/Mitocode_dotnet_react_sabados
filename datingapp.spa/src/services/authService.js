import http from './httpService';
import jwtDecode from 'jwt-decode';

const apiEndPoint = '/auth';
const tokenKey = 'token';
const userKey = 'user';

export async function login(model) {
  const { data: response } = await http.post(apiEndPoint + '/login', model);
  if (response) {
    localStorage.setItem(tokenKey, response.token);
    localStorage.setItem(userKey, JSON.stringify(response.user));
    http.setJwt(getJwt());
  }
  return response;
}

export function trySignUp() {
  let credentials = null;
  try {
    const token = getJwt();
    if (token) {
      const currentUser = JSON.parse(getCurrentUser());
      const decodedToken = getDecodedToken();
      credentials = {
        token,
        currentUser,
        decodedToken
      };
      http.setJwt(getJwt());
    }
  } catch (error) {
    return null;
  }
  return credentials;
}

export function register(user) {
  return http.post(apiEndPoint + '/register', user);
}

function getLocalStorageItem(key) {
  return localStorage.getItem(key);
}

export function getJwt() {
  return getLocalStorageItem(tokenKey);
}

export function getDecodedToken() {
  try {
    const token = getJwt();
    return jwtDecode(token);
  } catch (ex) {
    return null;
  }
}

export function getCurrentUser() {
  try {
    return getLocalStorageItem(userKey);
  } catch (ex) {
    return null;
  }
}

export function setCurrentUser(user) {
  localStorage.setItem(userKey, JSON.stringify(user));
}

export function logOut() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(userKey);
}

export function roleMatch(allowedRoles) {
  let isMatch;
  const userRoles = getDecodedToken().role;
  allowedRoles.forEach(role => {
    if (userRoles.includes(role)) {
      isMatch = true;
      return;
    }
  });
  return isMatch;
}

export default {
  login,
  getDecodedToken,
  getCurrentUser,
  register,
  logOut,
  getJwt,
  setCurrentUser,
  trySignUp,
  roleMatch
};
