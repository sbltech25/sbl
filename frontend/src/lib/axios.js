import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" 
  ? `https://${window.location.hostname.replace('5000-', '3000-')}/api`
  : "https://index.southernbasin.com/api";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

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
