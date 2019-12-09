import authService from '../../services/authService';
import * as actionTypes from './actionTypes';
import alertify from 'alertifyjs';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, currentUser, decodedToken) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    currentUser: currentUser,
    decodedToken: decodedToken
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logoutSuccess = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const authRegisterUserStart = () => {
  return {
    type: actionTypes.AUTH_REGISTER_USER_START
  };
};

export const authRegisterUserFail = error => {
  return { type: actionTypes.AUTH_REGISTER_USER_FAIL, error: error };
};

export const setMainUserStart = () => {
  return {
    type: actionTypes.SET_MAIN_USER_START
  };
};

export const setMainUserSuccess = currentUser => {
  return {
    type: actionTypes.SET_MAIN_USER_SUCCESS,
    currentUser: currentUser
  };
};

export const logout = () => {
  return dispatch => {
    authService.logOut();
    dispatch(logoutSuccess());
  };
};

export const trySignUp = () => {
  return dispatch => {
    const credentials = authService.trySignUp();
    if (!credentials) {
      dispatch(logout());
    } else {
      dispatch(
        authSuccess(
          credentials.token,
          credentials.currentUser,
          credentials.decodedToken
        )
      );
    }
  };
};

export const login = model => {
  return async dispatch => {
    dispatch(authStart());
    try {
      const response = await authService.login(model);
      dispatch(
        authSuccess(
          response.token,
          response.user,
          authService.getDecodedToken()
        )
      );
      alertify.success('Logged in succesfully');
    } catch (error) {
      if (error) {
        if (error.response) {
          const errorMessage =
            error.response.status !== 401
              ? error.response.data
              : error.response.statusText;
          dispatch(authFail(errorMessage));
          alertify.error(errorMessage);
        }
      }
    }
  };
};

export const registerUser = user => {
  return async dispatch => {
    dispatch(authRegisterUserStart());
    try {
      await authService.register(user);
      dispatch(login(user));
      alertify.success('Registration successful');
    } catch (error) {
      dispatch(authRegisterUserFail(error.response.data));
      alertify.error(error.response.data);
    }
  };
};

export const setMainUser = currentUser => {
  return dispatch => {
    dispatch(setMainUserStart());
    authService.setCurrentUser(currentUser);
    dispatch(setMainUserSuccess(currentUser));
  };
};
