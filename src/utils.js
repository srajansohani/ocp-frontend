import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios"
import { api } from "./utils/constants"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


const axiosConfig = axios.create({
  baseURL: api.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})
axiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); 
    if (accessToken) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosConfig;