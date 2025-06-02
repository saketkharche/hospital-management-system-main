import axiosInstance from "../api/axiosConfig";

/**
 * Logs in the user with provided credentials and stores the token.
 *
 * @param {Object} credentials - The user's login details (email, password).
 * @returns {Object} Login response containing token and user details.
 * @throws {Error} If login fails.
 */
export const loginUser = async (credentials) => {
  try {
    // Send login request to the backend
    const response = await axiosInstance.post("api/login", credentials);

    console.log("Login API Response:", response.data); // Debugging

    if (!response.data.token) {
      throw new Error("No token received from server");
    }

    // Store the token securely
    localStorage.setItem("token", response.data.token);

    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error.response?.data?.message || "Invalid email or password";
  }
};

/**
 * Logs out the user by removing the token from storage.
 */
export const logoutUser = () => {
  localStorage.removeItem("token");
  window.location.href = "/login"; // Redirect to login page
};

/**
 * Checks if the user is authenticated.
 *
 * @returns {boolean} True if user is authenticated, false otherwise.
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token; // Returns true if token exists, otherwise false
};

/**
 * Retrieves the current user's role from the stored JWT token.
 *
 * @returns {string|null} The user's role or null if not authenticated.
 */
export const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    return payload.role || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
