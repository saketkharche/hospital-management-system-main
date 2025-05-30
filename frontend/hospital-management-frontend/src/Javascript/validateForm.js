// utils/validateForm.js

/**
 * Validate the form data for a patient.
 * @param {Object} patientData - The patient data to validate.
 * @returns {Object} - An object containing validation errors (if any).
 */
export const validateForm = (patientData) => {
    const errors = {};
  
    // Validate first name
    if (!patientData.firstName) errors.firstName = "First name is required";
  
    // Validate last name
    if (!patientData.lastName) errors.lastName = "Last name is required";
  
    // Validate email
    if (!patientData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(patientData.email)) {
      errors.email = "Email is invalid";
    }
  
    // Validate phone number
    if (!patientData.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(patientData.phoneNumber)) {
      errors.phoneNumber = "Phone number must be 10 digits";
    }
  
    // Validate gender
    if (!patientData.gender) errors.gender = "Gender is required";
  
    // Validate date of birth
    if (!patientData.dateOfBirth) errors.dateOfBirth = "Date of Birth is required";
  
    return errors;
  };
  