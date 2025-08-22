import { axios } from "axios";

export const getAuthToken = async () => {
  try {
    const res = await axios.get(`/api/payments/token`);
    const data = res.data;
    if (data?.success && data?.auth_token) {
      localStorage.setItem("mpesa_access_token", data.auth_token);
    }
    return data.auth_token;
  } catch (err) {
    console.error("Error fetching token", err);
  }
};
