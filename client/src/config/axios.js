import HttpClient from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "/api";

const axios = HttpClient.create({
  baseURL,
  withCredentials: false,
});

function axiosClient() {
  const token = localStorage.getItem("mpesa_access_token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios.defaults.headers.common["Content-Type"] = "application/json";

  // Add response interceptor for error handling
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const statusCode = error && error.response ? error.response.status : 0;
      if (statusCode === 401 && typeof window !== "undefined") {
        console.error("Unauthorized access - token cleared");
      }
      return Promise.reject(error);
    }
  );

  return axios;
}

export { axios, axiosClient };
