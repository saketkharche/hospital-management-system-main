import React, { useState } from "react";
import axios from "axios";

const DrugInfo = () => {
  const [drugName, setDrugName] = useState("");
  const [drugData, setDrugData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${encodeURIComponent(drugName)}`,
      );

      if (response.data?.rxcui) {
        setDrugData(response.data);
        setError("");
      } else {
        setError("No results found.");
        setDrugData(null);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch drug information.");
      setDrugData(null);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>💊 Medicine Information</h2>
      <input
        type="text"
        placeholder="Enter medicine name..."
        value={drugName}
        onChange={(e) => setDrugName(e.target.value)}
        style={{ width: "300px", padding: "8px" }}
      />
      <button
        onClick={handleSearch}
        style={{ marginLeft: "10px", padding: "8px 15px" }}
      >
        Search
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {drugData && (
        <div
          style={{
            marginTop: "20px",
            border: "1px solid #ccc",
            padding: "15px",
          }}
        >
          <h3>{drugName}</h3>
          <p>
            <strong>RxCUI:</strong> {drugData.rxcui}
          </p>
          <p>
            <strong>Name:</strong> {drugData.name || "N/A"}
          </p>
          <p>
            <strong>Status:</strong> {drugData.status || "Active"}
          </p>
          <p>
            <strong>Term Type:</strong> {drugData.termline || "N/A"}
          </p>
        </div>
      )}
    </div>
  );
};

export default DrugInfo;
