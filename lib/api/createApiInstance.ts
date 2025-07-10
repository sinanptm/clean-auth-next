import axios, { AxiosInstance } from "axios";
import { SERVER_URL } from "@/config";
import { UserRole } from "@/types";
import { StatusCode } from "@/types/api";
import { clearAuthData, getTokenKey } from "../utils";

const createApiInstance = (role: UserRole = UserRole.User): AxiosInstance => {
  const tokenKey = getTokenKey(role);

  const api = axios.create({
    baseURL: `${SERVER_URL}/api`,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem(tokenKey);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error.response?.status;
      const message = error.response?.data?.message || "Unknown error occurred";

      if (status === StatusCode.Forbidden) {
        clearAuthData(role, { reason: message });
      }

      return Promise.reject({ ...error, status, message });
    },
  );

  return api;
};

export default createApiInstance;
