import axios from 'axios';
import { setAlert } from './alert';
import SetAuthToken from '../utils/SetAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOGOUT_ALL,
  CLEAR_PROFILE,
  USER_DELETE,
} from './types';

// Register the User

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert('Registered! Welcome to SocialDevs!', 'success'));
    dispatch(loadUser());
  } catch (error) {
    console.log(error.response.data);
    const errors = error.response.data;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error, 'danger'));
      });
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Load the User

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    SetAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/users/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Login the User

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/users/login', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    const msg = error.response.data.message;
    dispatch(setAlert(msg, 'danger'));
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout the User / Clear Profile

export const logout = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  };
  const body = '';
  try {
    const res = await axios.post('/api/users/logout', body, config);
    if (res.status === 200) {
      dispatch({ type: LOGOUT });
      dispatch({ type: CLEAR_PROFILE });
    }
  } catch (error) {
    console.error(error);
  }
};

// Logout the All User Tokens / Clear Profile

export const logoutAll = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  };
  const body = '';
  try {
    const res = await axios.post('/api/users/logoutAll', body, config);
    if (res.status === 200) {
      dispatch({ type: LOGOUT_ALL });
      dispatch({ type: CLEAR_PROFILE });
    }
  } catch (error) {
    console.error(error);
  }
};

// Delete User Account/Profile / Clear Profile

export const accountDelete = () => async (dispatch) => {
  if (
    window.confirm(
      'Are you sure about this? Select OK to delete your account and forever be regretful...'
    )
  ) {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    };
    const body = '';
    try {
      const res = await axios.delete('/api/users/deleteAccount', body, config);
      if (res.status === 200) {
        dispatch({ type: USER_DELETE });
        dispatch({ type: CLEAR_PROFILE });
        dispatch(setAlert('Account Successfully Deleted'));
      }
    } catch (error) {
      console.error(error);
      dispatch(setAlert(error.message, 'danger'));
    }
  }
};
