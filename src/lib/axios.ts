import axios from "axios";

export const API_ENDPOINT = "http://localhost:8080";
// export const API_ENDPOINT = "";

export const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
});


axiosInstance.interceptors.request.use(
  function (config: any) {
    if (config.url?.includes('/api')) {
      const storedToken = localStorage.getItem("accessToken");
      config.headers = {
        Authorization: `Bearer ${storedToken}`,
        ...config.headers,
      };
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
