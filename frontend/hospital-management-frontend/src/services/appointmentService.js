import axiosInstance from "../api/axiosConfig";

export const bookAppointment = async (req) => {
  const { name, email, phone, date, time, message } = req.body;

  // Validate the input fields
  if (!name || !email || !phone || !date || !time || !message) {
    return { message: "Please fill all the fields" };
  }

  try {
    // Prepare the appointment data
    const newAppointment = { name, email, phone, date, time, message };

    // Send the request to the API
    const response = await axiosInstance.post("/api/appointments/book", newAppointment);

    // Return the response data
    return response.data;
  } catch (error) {
    console.error("Error booking appointment:", error);

    // Handle the error properly and return a meaningful message
    return { message: "Failed to book appointment. Please try again later." };
  }
};
