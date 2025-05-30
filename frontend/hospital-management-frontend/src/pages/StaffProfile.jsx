import React from 'react';

function StaffProfile() {
  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-secondary text-white text-center">
          <h3>Staff Profile</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 text-center">
              <img
                src={`${process.env.PUBLIC_URL}/staff.jpg`}
                alt="Staff"
                className="img-fluid rounded-circle"
                width="150"
              />
              <h4 className="mt-3">Staff Member</h4>
            </div>
            <div className="col-md-8">
              <ul className="list-group">
                <li className="list-group-item">
                  <strong>Email:</strong> staff@example.com
                </li>
                <li className="list-group-item">
                  <strong>Phone:</strong> +91 5432109876
                </li>
                <li className="list-group-item">
                  <strong>Role:</strong> Support Staff
                </li>
              </ul>
              <button className="btn btn-secondary mt-4">Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffProfile;
