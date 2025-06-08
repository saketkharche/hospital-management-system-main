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
    const response = await axiosInstance.post("api/login", credentials);

    console.log("Login API Response:", response.data);

    if (!response.data.token) {
      throw new Error("No token received from server");
    }

    // Store the token securely
    localStorage.setItem("token", response.data.token);

    return response.data;
  } catch (error) {
    console.error("Login error:", error);

    // ✅ Throw an Error object for proper handling in LoginPage
    const message =
        error.response?.data?.message ||
        error.message ||
        "Invalid email or password";
    throw new Error(message);
  }
};

/**
 * Logs out the user by removing the token from storage.
 */
export const logoutUser = () => {
  localStorage.removeItem("token");
  window.location.href = "/LifeBridgeHospital/login"; // ✅ Make sure this is consistent with basename
};

/**
 * Checks if the user is authenticated.
 *
 * @returns {boolean} True if user is authenticated, false otherwise.
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
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
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.role || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
