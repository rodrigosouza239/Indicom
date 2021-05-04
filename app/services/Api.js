import axios from 'axios';

// const url = 'http://119.8.83.116:8001/api/';
const url = 'http://119.8.83.116:8001/api/';

const API = axios.create({
  baseURL: url,
  responseType: 'json',
});

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (typeof err.response === 'undefined') {
      return 'die';
    }
    return err.response;
  }
);

export default API;
