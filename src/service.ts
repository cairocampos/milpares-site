/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
import axios, { AxiosError, AxiosInstance } from 'axios';
import store from '@/store';

const http: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE,
});

http.interceptors.request.use((config) => {
  const token = store.getters['auth/token'];
  if (token) {
    if (config && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
}, (error) => Promise.reject(error));

http.interceptors.response.use((response) => response, (error: AxiosError) => {
  const STATUS_UNAUTHORIZED = 401;
  if (error.response?.status === STATUS_UNAUTHORIZED && error.response.data?.message === 'Unauthenticated.') {
    store.dispatch('auth/logout');
  }
  return Promise.reject(error);
});

export {
  http,
};
