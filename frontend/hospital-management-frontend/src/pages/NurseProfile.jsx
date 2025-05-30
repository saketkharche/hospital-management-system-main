import React from 'react';

function NurseProfile() {
  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-warning text-white text-center">
          <h3>Nurse Profile</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 text-center">
              <img
                src={`${process.env.PUBLIC_URL}/nurse.jpg`}
                alt="Nurse"
                className="img-fluid rounded-circle"
                width="150"
              />
              <h4 className="mt-3">Nurse Alice</h4>
            </div>
            <div className="col-md-8">
              <ul className="list-group">
                <li className="list-group-item">
                  <strong>Email:</strong> nurse@example.com
                </li>
                <li className="list-group-item">
                  <strong>Phone:</strong> +91 6543210987
                </li>
                <li className="list-group-item">
                  <strong>Shift:</strong> Night
                </li>
              </ul>
              <button className="btn btn-warning mt-4">View Duty Schedule</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NurseProfile;
