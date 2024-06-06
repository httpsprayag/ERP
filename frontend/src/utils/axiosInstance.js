import axios from 'axios';

// Create an Axios instance
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    common: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage?.getItem('access_token');
    const modifiedConfig = { ...config }; // Create a copy of the config object
    if (token) {
      modifiedConfig.headers.Authorization = `Bearer ${token}`;
    }
    return modifiedConfig;
  },
  (error) =>
    // Handle request errors
    Promise.reject(error)
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) =>
    // You can modify response data here
    response,
  (error) =>
    // Handle response errors
    Promise.reject(error)
);
