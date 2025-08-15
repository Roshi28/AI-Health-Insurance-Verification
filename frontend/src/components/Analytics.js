// src/components/Analytics.js
import React, { useState } from "react";
import { appData } from "../data";
import Modal from "./Modal";

export default function Analytics() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState(null);

  const openPatternModal = (pattern) => {
    setSelectedPattern(pattern);
    setModalOpen(true);
  };

  return (
    <div className="container">
      <div className="page-header">
        <h1>Analytics</h1>
        <p className="page-subtitle">
          Performance metrics and risk patterns
        </p>
      </div>

      <h2>Risk Patterns</h2>
      <table className="data-table">
        <thead>
          <tr>
            <th>Provider</th>
            <th>Risk</th>
            <th>Frequency</th>
            <th>Avg Score</th>
          </tr>
        </thead>
        <tbody>
          {appData.riskPatterns.map((pattern, idx) => (
            <tr
              key={idx}
              style={{ cursor: "pointer" }}
              onClick={() => openPatternModal(pattern)}
            >
              <td>{pattern.provider}</td>
              <td>{pattern.risk}</td>
              <td>{pattern.frequency}</td>
              <td>{pattern.avgScore}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>AI Model Performance</h2>
      <ul>
        <li>OCR Accuracy: {appData.aiPerformance.ocrAccuracy}%</li>
        <li>Insurance Cards: {appData.aiPerformance.insuranceCards}%</li>
        <li>ID Cards: {appData.aiPerformance.idCards}%</li>
        <li>Handwritten Notes: {appData.aiPerformance.handwrittenNotes}%</li>
        <li>Precision: {appData.aiPerformance.precision}%</li>
        <li>Recall: {appData.aiPerformance.recall}%</li>
        <li>AUC Score: {appData.aiPerformance.aucScore}</li>
      </ul>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Risk Pattern Details"
      >
        {selectedPattern && (
          <>
            <p><strong>Provider:</strong> {selectedPattern.provider}</p>
            <p><strong>Risk:</strong> {selectedPattern.risk}</p>
            <p><strong>Frequency:</strong> {selectedPattern.frequency}</p>
            <p><strong>Average Score:</strong> {selectedPattern.avgScore}</p>
          </>
        )}
      </Modal>
    </div>
  );
}