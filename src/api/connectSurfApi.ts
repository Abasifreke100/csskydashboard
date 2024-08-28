import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { Cssky_Dashboard_Routes } from "../components/store/data";
import { errorToast } from "../utils/toast";

const baseURL = import.meta.env.VITE_API_BASE_URL as string;

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: { response: { status: number } }) => {
    if (error.response && error.response.status === 401) {
      window.location.href = Cssky_Dashboard_Routes.signIn;
      localStorage.removeItem("accessToken"); // Clear accessToken from localStorage
      localStorage.removeItem("user"); // Clear user from localStorage
      errorToast({
        title: "Unauthorized",
        message: "You are not authorized to access this page.",
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
