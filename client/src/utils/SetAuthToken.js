import axios from 'axios';

const SetAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
    localStorage.setItem('token', token);
  } else {
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('token');
  }
};
export default SetAuthToken;
