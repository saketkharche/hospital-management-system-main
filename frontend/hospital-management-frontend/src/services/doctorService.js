import axiosInstance from "../api/axiosConfig";


export const loginDoctor = async (doctorData) => {
  try {
    const response = await axiosInstance.post('/api/doctors/loginDoctor', doctorData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to login doctor');
  }
};

export const fetchDoctorByEmail = async (email) => {
  try {
    const response = await axiosInstance.get(`/api/doctors/details/${email}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch doctor');
  }
};

export const fetchDoctorDetails=async()=>{
  try {
    const response = await axiosInstance.get('/api/doctors/mydetails');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch doctor details');
  }
}


export const fetchAllDoctors = async () => {
  try {
    const response = await axiosInstance.get('/api/doctors/fetchAllDoctors');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch doctors');
  }
};

export const registerDoctor = async (doctorData) => {
  try {
    const response = await axiosInstance.post('/api/doctors/registerDoctor', doctorData);
    return response.data;
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

export const updateDoctor = async (email, doctorData) => {
  try {
    const response = await axiosInstance.put(`api/doctors/update/${email}`, doctorData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update doctor');
  }
};

export const deleteDoctor = async (email) => {
  try {
    const response = await axiosInstance.delete(`'/api/doctors/delete'/${email}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete doctor');
  }
};
