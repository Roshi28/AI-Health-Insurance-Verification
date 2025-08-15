// src/components/BatchProcessing.js
import React, { useState } from "react";
import { appData } from "../data";
import Modal from "./Modal";

export default function BatchProcessing() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const openFileModal = (file) => {
    setSelectedFile(file);
    setModalOpen(true);
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Batch Processing</h1>
        <p className="page-subtitle">
          Manage and monitor batch document verification
        </p>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>File Name</th>
            <th>Patient</th>
            <th>Status</th>
            <th>Progress</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {appData.batchFiles.map((file, index) => (
            <tr
              key={index}
              style={{ cursor: "pointer" }}
              onClick={() => openFileModal(file)}
            >
              <td>{file.fileName}</td>
              <td>{file.patient}</td>
              <td>{file.status}</td>
              <td>
                <progress value={file.progress} max="100" />
              </td>
              <td>{file.result}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Batch File Details"
      >
        {selectedFile && (
          <>
            <p><strong>File Name:</strong> {selectedFile.fileName}</p>
            <p><strong>Patient:</strong> {selectedFile.patient}</p>
            <p><strong>Status:</strong> {selectedFile.status}</p>
            <p><strong>Progress:</strong> {selectedFile.progress}%</p>
            <p><strong>Result:</strong> {selectedFile.result}</p>
          </>
        )}
      </Modal>
    </div>
  );
}