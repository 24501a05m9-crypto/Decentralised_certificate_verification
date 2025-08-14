import React from "react";

export default function StudentPage({ onBack }) {
  return (
    <div className="form-container">
      <div className="content-box">
        <h2>Retrieving Certificate</h2>
        <form>
          <div className="form-group">
            <label>Name</label>
            <input type="text" required />
          </div>
          <div className="form-group">
            <label>Roll Number</label>
            <input type="text" required />
          </div>
          <div className="form-group">
            <label>Certificate ID</label>
            <input type="text" required />
          </div>
          <div className="button-container">
            <button className="verify-button">Submit</button>
          </div>
        </form>
        <button className="back-button" onClick={onBack}>Back</button>
      </div>
    </div>
  );
}
