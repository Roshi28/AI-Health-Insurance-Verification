// src/components/NewVerification.js
import React, { useState } from "react";
import Modal from "./Modal";

export default function NewVerification() {
  const [fileName, setFileName] = useState("");
  const [riskScore, setRiskScore] = useState(null);
  const [status, setStatus] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      // Simulate verification result
      setTimeout(() => {
        const score = Math.floor(Math.random() * 100);
        setRiskScore(score);
        setStatus(score > 50 ? "Verified" : "Needs Review");
        setModalOpen(true); // Open modal when result is ready
      }, 1500);
    }
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>New Verification</h1>
        <p className="page-subtitle">
          Upload patient insurance documents for verification
        </p>
      </div>

      <div className="upload-card">
        <input
          type="file"
          id="file-upload"
          className="file-input"
          onChange={handleFileUpload}
        />
        <label htmlFor="file-upload" className="upload-label">
          <i className="fas fa-cloud-upload-alt"></i> Choose a file to upload
        </label>
        {fileName && <p className="file-name">{fileName}</p>}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Verification Result"
      >
        {fileName && (
          <>
            <p><strong>File Name:</strong> {fileName}</p>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Risk Score:</strong> {riskScore}%</p>
          </>
        )}
      </Modal>
    </div>
  );
}