import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_DEV_BASE_URL
});

export const api = axiosInstance;
