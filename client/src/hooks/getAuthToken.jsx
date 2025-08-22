import axios from "axios";

export const getAuthToken = async () => {
  const BaseURL = (import.meta).env?.API_BASE_URL || "";

  try {
    const res = await axios.get(`${BaseURL}/api/payments/token`);
    const data = res.data;
    if (data?.success && data?.auth_token) {
      localStorage.setItem("mpesa_access_token", data.auth_token);
    }ƒ
    return data.auth_token;
  } catch (err) {
    console.error("Error fetching token", err);
  }
};
