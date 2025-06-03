// AppointmentDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [prescription, setPrescription] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/appointments/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setAppointment(response.data);
        setStatus(response.data.status);
      } catch (error) {
        console.error('Error fetching appointment details:', error);
      }
    };

    fetchAppointment();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/appointments/${id}/update`,
        { prescription, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      alert('Appointment updated successfully');
      navigate('/doctor/appointments');
    } catch (error) {
      console.error('Error updating appointment:', error);
      alert('Failed to update appointment');
    }
  };

  if (!appointment) return <p>Loading appointment details...</p>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Appointment Details</h2>

      <div className="card p-3">
        <p><strong>Patient Name:</strong> {appointment.patientName}</p>
        <p><strong>Date & Time:</strong> {appointment.date} at {appointment.time}</p>
        <p><strong>Reason:</strong> {appointment.reason}</p>

        <div className="form-group mt-3">
          <label htmlFor="prescription">Prescription</label>
          <textarea
            id="prescription"
            className="form-control"
            rows="4"
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="status">Appointment Status</label>
          <select
            id="status"
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        <button className="btn btn-primary mt-4" onClick={handleUpdate}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AppointmentDetails;
