import axios from 'axios';

const token = localStorage.getItem('token');

export default axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 15000,
  headers: {
    common: {
      authorization: token,
      crossDomain: true,
    },
  },
  transformRequest: [
    (data, headers) => {
      headers.authorization = localStorage.getItem('token');
      return data;
    },
    ...axios.defaults.transformRequest,
  ],
});
