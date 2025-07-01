// import axios from "axios";

// const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "https://apisbltd.vercel.app/api";

// export const axiosInstance = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true, 
// });

import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:5001/api" 
  : "https://apisbltd.vercel.app/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  // Remove withCredentials since we're not using cookies
});

// Add request interceptor to attach token from localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized access (e.g., clear token and redirect to login)
//       localStorage.removeItem('jwtToken');
//       localStorage.removeItem('user');
//       window.location.href = '/s/login';
//     }
//     return Promise.reject(error);
//   }
// );