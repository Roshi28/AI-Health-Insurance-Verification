// src/components/Modal.js
import React from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null; // Don't render if closed

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="modal-body">{children}</div>

        <div className="modal-footer">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
