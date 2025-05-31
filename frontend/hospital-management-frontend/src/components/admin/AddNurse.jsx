import React, { useState } from "react";

function AddNurse() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    shift: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Nurse Data:", formData);
    alert("Nurse added successfully!");
    setFormData({ name: "", email: "", phone: "", shift: "" });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-warning text-white text-center">
          <h3>Add Nurse</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone:</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Shift:</label>
              <select
                name="shift"
                value={formData.shift}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="">Select Shift</option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Night">Night</option>
              </select>
            </div>
            <button type="submit" className="btn btn-warning">
              Add Nurse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNurse;
