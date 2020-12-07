import axios from 'axios';
import { setAlert } from './alert';

import {
  CLEAR_PROFILE,
  GET_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  PROFILE_ERROR,
  UPDATE_PROFILE,
} from './types';

// Get a current profile

export const getCurrentProfile = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const config = {
      header: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };
    const body = '';
    const res = await axios.get('/api/profile/me', body, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status },
    });
  }
};

// Get all Profiles

export const getAllProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const config = {
      header: {
        'Content-type': 'application/json',
      },
    };
    const body = '';
    const res = await axios.get('/api/profiles', body, config);
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status },
    });
  }
};

// Get Profile by ID

export const getProfileById = (userid) => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    const _id = userid;
    const config = {
      header: {
        'Content-type': 'application/json',
      },
    };
    const body = '';
    const res = await axios.get(`/api/profileById/${_id}`, body, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status },
    });
  }
};

// Get GitHub Repos

export const getGitHubRepos = (username) => async (dispatch) => {
  try {
    const config = {
      header: {
        'Content-type': 'application/json',
      },
    };
    const body = '';
    const res = await axios.get(
      `/api/profile/github/${username}`,
      body,
      config
    );
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.data.msg, status: error.response.status },
    });
  }
};

// Create or Update a profile

export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  const token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };
    const res = await axios.post('/api/profile', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (error) {
    console.log(error.response.data);
    dispatch(setAlert(error.response.data, 'danger'));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.data, status: error.response.status },
    });
  }
};

// Add Education to profile

export const addEducation = (formData, history) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };
    const res = await axios.patch(
      '/api/profile/me/education',
      formData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Education Added', 'success'));

    history.push('/dashboard');
  } catch (error) {
    console.log(error.response.data);
    dispatch(setAlert(error.response.data, 'danger'));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.data, status: error.response.status },
    });
  }
};

// Add Experience to profile

export const addExperience = (formData, history) => async (dispatch) => {
  const token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };
    const res = await axios.patch(
      '/api/profile/me/experience',
      formData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Experience Added', 'success'));

    history.push('/dashboard');
  } catch (error) {
    console.log(error.response.data);
    dispatch(setAlert(error.response.data, 'danger'));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.data, status: error.response.status },
    });
  }
};

// Delete an experience

export const deleteExperience = (id) => async (dispatch) => {
  const _id = id;
  const token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };
    const body = '';
    const res = await axios.post(
      `/api/profile/me/experience/${_id}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Experience Removed', 'success'));
  } catch (error) {
    console.log(error);
    dispatch(setAlert(error.message, 'danger'));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.message, status: error.response.status },
    });
  }
};
// Delete education

export const deleteEducation = (id) => async (dispatch) => {
  const _id = id;
  const token = localStorage.getItem('token');
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    };
    const body = '';
    const res = await axios.post(
      `/api/profile/me/education/${_id}`,
      body,
      config
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert('Education Removed', 'success'));
  } catch (error) {
    console.log(error);
    dispatch(setAlert(error.message, 'danger'));

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.message, status: error.response.status },
    });
  }
};
