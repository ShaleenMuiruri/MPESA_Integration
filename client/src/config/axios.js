import HttpClient from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "/api";

const axios = HttpClient.create({
  baseURL,
  withCredentials: false,
});

// Attach auth token and common headers on every request
axios.interceptors.request.use(
  (config) => {
    try {

      // Ensure JSON by default
      config.headers = config.headers || {};
      if (!config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json";
      }

      return config;
    } catch (_) {
      return config;
    }
  },
  (error) => Promise.reject(error)
);

function axiosClient() {
  return axios;
}

export { axios, axiosClient };
