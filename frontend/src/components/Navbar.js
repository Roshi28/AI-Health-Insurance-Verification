// src/components/Navbar.js
import React from "react";

export default function Navbar({ currentTab, onTabChange }) {
  const tabs = [
    { id: "dashboard", icon: "fa-home", label: "Dashboard" },
    { id: "new-verification", icon: "fa-plus", label: "New Verification" },
    { id: "batch-processing", icon: "fa-upload", label: "Batch Upload" },
    { id: "ai-assistant", icon: "fa-robot", label: "AI Assistant" },
    { id: "analytics", icon: "fa-chart-bar", label: "Analytics" }
  ];

  return (
    <header className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <i className="fas fa-shield-alt"></i>
          <span>VerifyAI</span>
        </div>
        <nav className="navbar-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-btn ${currentTab === tab.id ? "active" : ""}`}
              onClick={() => onTabChange(tab.id)}
            >
              <i className={`fas ${tab.icon}`}></i> {tab.label}
            </button>
          ))}
        </nav>
        <div className="navbar-user">
          <div className="user-avatar">
            <i className="fas fa-user"></i>
          </div>
          <span>Dr. Smith</span>
        </div>
      </div>
    </header>
  );
}
