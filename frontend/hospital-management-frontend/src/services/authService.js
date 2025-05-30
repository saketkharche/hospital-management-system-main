import axiosInstance from "../api/axiosConfig";

export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("api/login", credentials);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message || "Invalid email or password";
    } else {
      throw error.message || "Unknown error occurred during login";
    }
  }
};
