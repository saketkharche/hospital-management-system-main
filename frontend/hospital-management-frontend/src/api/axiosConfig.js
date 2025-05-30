import axios from "axios";

// Create an Axios instance with custom configuration
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/hospital/", // Ensure this matches your backend URL
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // Use this if you need to include cookies (e.g., for session management)
});

// Interceptor to add Authorization token (JWT) if available
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve token from sessionStorage
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor for handling responses and errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle Unauthorized error (401) and other errors
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Please log in again.");
      // Optionally, redirect to login page
      window.location.href = "LifeBridgeHospital/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
