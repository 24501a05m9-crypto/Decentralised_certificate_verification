import React, { useState } from "react";

export default function CollegePage({ onBack }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [connectedAccount, setConnectedAccount] = useState("");
  const [branch, setBranch] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [file, setFile] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = e.target.elements;
    if (username.value === "college" && password.value === "123456") {
      setLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const connectPetraWallet = async () => {
    if (!window.aptos) {
      alert("Please install Petra Wallet");
      return;
    }
    try {
      const account = await window.aptos.connect();
      setConnectedAccount(account.address);
    } catch (err) {
      console.error(err);
    }
  };

  const uploadAndMint = async (e) => {
    e.preventDefault();
    if (!connectedAccount) {
      alert("Connect wallet first");
      return;
    }
    if (!file) {
      alert("Please select a file");
      return;
    }

    const PINATA_API_KEY = "YOUR_PINATA_API_KEY";
    const PINATA_SECRET = "YOUR_PINATA_SECRET_API_KEY";

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: {
          pinata_api_key: PINATA_API_KEY,
          pinata_secret_api_key: PINATA_SECRET
        },
        body: formData
      });
      const data = await res.json();
      const ipfsHash = data.IpfsHash;
      alert("Uploaded to IPFS: " + ipfsHash);

      await window.aptos.signAndSubmitTransaction({
        sender: connectedAccount,
        data: {
          function: "my_addr::certificate_nft::mint_certificate",
          typeArguments: [],
          functionArguments: [rollNo, branch, ipfsHash]
        }
      });
      alert("Minted on Aptos blockchain!");
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="form-container">
      {!loggedIn ? (
        <div className="content-box">
          <h2>College Login</h2>
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
              <button type="submit" className="verify-button">Login</button>
            </div>
          </form>
          <button className="back-button" onClick={onBack}>Back</button>
        </div>
      ) : (
        <div className="content-box">
          <h2>Certificate Uploading</h2>
          <div className="wallet-connection">
            <button className="wallet-button" onClick={connectPetraWallet}>
              Connect Petra Wallet
            </button>
            {connectedAccount && (
              <div className="wallet-address">Connected: {connectedAccount}</div>
            )}
          </div>
          <form onSubmit={uploadAndMint}>
            <div className="form-group">
              <label>Course</label>
              <select value={branch} onChange={(e) => setBranch(e.target.value)} required>
                <option value="">Select a course</option>
                <option value="CSE">Computer Science</option>
                <option value="IT">Information Technology</option>
                <option value="EEE">Electrical Engineering</option>
                <option value="ECE">Electronics & Communication</option>
                <option value="ME">Mechanical Engineering</option>
                <option value="CE">Civil Engineering</option>
              </select>
            </div>
            <div className="form-group">
              <label>Roll Number</label>
              <input value={rollNo} onChange={(e) => setRollNo(e.target.value)} required />
            </div>
            <div className="form-group">
              <label>Upload Certificate</label>
              <input type="file" accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) => setFile(e.target.files[0])} required />
            </div>
            <div className="button-container">
              <button type="submit" className="verify-button">Upload & Mint</button>
            </div>
          </form>
          <button className="back-button" onClick={onBack}>Back</button>
        </div>
      )}
    </div>
  );
}
