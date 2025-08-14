import React, { useState } from "react";

export default function CompanyPage({ onBack }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = e.target.elements;
    if (username.value === "company" && password.value === "123456") {
      setLoggedIn(true);
    } else {
      alert("Invalid login");
    }
  };

  return (
    <div className="form-container">
      {!loggedIn ? (
        <div className="content-box">
          <h2>Company Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username</label>
              <input name="username" type="text" required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input name="password" type="password" required />
            </div>
            <div className="button-container">
              <button className="verify-button" type="submit">Login</button>
            </div>
          </form>
          <button className="back-button" onClick={onBack}>Back</button>
        </div>
      ) : (
        <div className="content-box">
          <h2>Candidate Verification</h2>
          <form>
            <div className="form-group">
              <label>College Name</label>
              <input type="text" required />
            </div>
            <div className="form-group">
              <label>Year Passed Out</label>
              <select required>
                <option value="">Select year</option>
                {[...Array(16)].map((_, i) => {
                  const yr = 2025 - i;
                  return <option key={yr} value={yr}>{yr}</option>;
                })}
              </select>
            </div>
            <div className="form-group">
              <label>Certificate ID</label>
              <input type="text" required />
            </div>
            <div className="button-container">
              <button className="verify-button">Verify Details</button>
            </div>
          </form>
          <button className="back-button" onClick={onBack}>Back</button>
        </div>
      )}
    </div>
  );
}
