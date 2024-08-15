import axios from "axios";
import { api } from "./constants";

const axiosInstance = axios.create({
    baseURL: api.baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  })
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token'); 
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  export default axiosInstance;