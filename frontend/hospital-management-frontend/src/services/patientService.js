import axiosInstance from "../api/axiosConfig";

// Register a new patient
export const registerPatient = async (patientData) => {
  try {
    const response = await axiosInstance.post('api/patients/register', patientData);
    return response.data; // On successful registration
  } catch (error) {
    

    if (error.response) {
      // Structured error response from the server
      const errorData = error.response.data;

      // Check if the error message is related to email already existing
      if (errorData === "Email is already registered.") {
        throw new Error("Email is already registered");
      } else {
        throw new Error(errorData.message || 'An unknown error occurred during registration');
      }
    } else if (error.request) {
      // Network error or no response from server
      throw new Error('No response from server. Please check your network connection.');
    } else {
      // Other types of errors (like config errors)
      throw new Error(error.message || 'An error occurred during registration');
    }
  }
};

// Update existing patient details
export const updatePatient = async (email, patientData) => {
  try {
    const response = await axiosInstance.put(`api/patients/update/${email}`, patientData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchPatientDetails = async () => {
  try {
    const response = await axiosInstance.get("/api/patients/mydetails");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch patient details by email
export const fetchPatientByEmail = async (email) => {
  try {
    const response = await axiosInstance.get(`/patients/email/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching patient by email:", error);

    if (error.response) {
      const errorData = error.response.data;
      throw new Error(errorData.message || 'Error fetching patient details');
    } else if (error.request) {
      throw new Error('No response from server. Please check your network connection.');
    } else {
      throw new Error(error.message || 'An error occurred while fetching patient details');
    }
  }
};

// Fetch all patients
export const fetchAllPatients = async () => {
  try {
    const response = await axiosInstance.get('/api/patients/fetchAllPatients');
    return response.data;
  } catch (error) {
    console.error("Error fetching all patients:", error);

    if (error.response) {
      const errorData = error.response.data;
      throw new Error(errorData.message || 'Error fetching patient list');
    } else if (error.request) {
      throw new Error('No response from server. Please check your network connection.');
    } else {
      throw new Error(error.message || 'An error occurred while fetching all patients');
    }
  }
};

export const deletePatient = async (email) => {
  try {
    const response = await axiosInstance.delete(`api/patients/delete${email}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
