// src/components/Dashboard.js
import React from "react";
import { appData } from "../data";

export default function Dashboard() {
  return (
    <div className="container">
      <div className="page-header">
        <h1>Dashboard Overview</h1>
        <p className="page-subtitle">Real-time verification performance and insights</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card stat-card--primary">
          <div className="stat-card__icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-card__content">
            <div className="stat-card__value">{appData.todayStats.verifications}</div>
            <div className="stat-card__label">Verifications Today</div>
          </div>
        </div>
        <div className="stat-card stat-card--success">
          <div className="stat-card__icon">
            <i className="fas fa-percentage"></i>
          </div>
          <div className="stat-card__content">
            <div className="stat-card__value">{appData.todayStats.successRate}%</div>
            <div className="stat-card__label">Success Rate</div>
          </div>
        </div>
        <div className="stat-card stat-card--info">
          <div className="stat-card__icon">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-card__content">
            <div className="stat-card__value">{appData.todayStats.avgResponseTime}</div>
            <div className="stat-card__label">Avg Response Time</div>
          </div>
        </div>
        <div className="stat-card stat-card--warning">
          <div className="stat-card__icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <div className="stat-card__content">
            <div className="stat-card__value">{appData.todayStats.highRiskAlerts}</div>
            <div className="stat-card__label">High Risk Alerts</div>
          </div>
        </div>
      </div>
    </div>
  );
}