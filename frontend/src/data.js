export const appData = {
  recentVerifications: [
    {"patient": "John Smith", "insurance": "Blue Cross Blue Shield", "status": "Verified", "riskScore": 85, "time": "2 min ago"},
    {"patient": "Maria Garcia", "insurance": "Aetna", "status": "Needs Auth", "riskScore": 25, "time": "5 min ago"},
    {"patient": "David Wilson", "insurance": "United Healthcare", "status": "Verified", "riskScore": 92, "time": "8 min ago"},
    {"patient": "Sarah Johnson", "insurance": "Cigna", "status": "Pending", "riskScore": 67, "time": "12 min ago"}
  ],
  todayStats: {
    verifications: 127,
    successRate: 94,
    avgResponseTime: "2.3s",
    highRiskAlerts: 12
  },
  dashboardStats: {
    avgProcessingTime: "1.8s",
    preventedDenials: "$47K",
    verifications: 127,
    successRate: "94%",
    responseTime: "2.3s",
    alerts: 12
  },
  riskPatterns: [
    {"provider": "Anthem", "risk": "Missing Prior Auth", "frequency": "23 cases", "avgScore": "15%"},
    {"provider": "Cigna", "risk": "Out-of-Network", "frequency": "18 cases", "avgScore": "35%"},
    {"provider": "United Healthcare", "risk": "Expired Coverage", "frequency": "12 cases", "avgScore": "78%"}
  ],
  aiPerformance: {
    ocrAccuracy: 96.8,
    insuranceCards: 98.2,
    idCards: 95.4,
    handwrittenNotes: 89.1,
    precision: 87.3,
    recall: 82.1,
    aucScore: 0.84
  },
  batchFiles: [
    {"fileName": "insurance_card_001.jpg", "patient": "John Smith", "status": "Complete", "progress": 100, "result": "Verified"},
    {"fileName": "insurance_card_002.jpg", "patient": "Maria Garcia", "status": "Processing", "progress": 75, "result": "OCR"},
    {"fileName": "insurance_card_003.jpg", "patient": "David Wilson", "status": "Error", "progress": 0, "result": "Unreadable"},
    {"fileName": "insurance_card_004.jpg", "patient": "Sarah Johnson", "status": "Queued", "progress": 0, "result": "Waiting"}
  ],
  chatMessages: [
    {"type": "bot", "message": "Hi! I'm your AI verification assistant. I can help you with complex insurance cases, explain denial reasons, or guide you through prior authorization requirements. What can I help you with today?"},
    {"type": "user", "message": "I have a patient with United Healthcare, but their card shows they're in a different state. How do I verify if they're still covered here?"},
    {"type": "bot", "message": "Great question! For out-of-state United Healthcare coverage, here's what I recommend:<br><br>1. Check the plan type - PPO plans typically offer nationwide coverage, while HMO plans are often state-specific<br>2. Verify the network - I can run a real-time eligibility check to see if your facility is in-network<br>3. Review benefits - Out-of-state coverage may have different copays or deductibles<br><br>Would you like me to run the verification now? I'll need the member ID and group number."}
  ]
};