import React from 'react';

function DoctorProfile() {
  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-success text-white text-center">
          <h3>Doctor Profile</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 text-center">
              <img
                src={`${process.env.PUBLIC_URL}/doctor.jpg`}
                alt="Doctor"
                className="img-fluid rounded-circle"
                width="150"
              />
              <h4 className="mt-3">Dr. John Doe</h4>
            </div>
            <div className="col-md-8">
              <ul className="list-group">
                <li className="list-group-item">
                  <strong>Specialization:</strong> Cardiologist
                </li>
                <li className="list-group-item">
                  <strong>Email:</strong> doctor@example.com
                </li>
                <li className="list-group-item">
                  <strong>Phone:</strong> +91 8765432109
                </li>
              </ul>
              <button className="btn btn-success mt-4">View Appointments</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;
