import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pacific-harbor-98248.herokuapp.com',
});

export default instance;
