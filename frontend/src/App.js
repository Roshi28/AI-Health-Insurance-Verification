import React, { useState } from "react";
import "./style.css";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import NewVerification from "./components/Newverification";
import BatchProcessing from "./components/Batchprocessing";
import Analytics from "./components/Analytics";
import AiAssistant from "./components/AiAssistant";

export default function App() {
  const [currentTab, setCurrentTab] = useState("dashboard");

  const renderTab = () => {
    switch (currentTab) {
      case "dashboard":
        return <Dashboard />;
      case "new-verification":
        return <NewVerification />;
      case "batch-processing":
        return <BatchProcessing />;
      case "analytics":
        return <Analytics />;
      case "ai-assistant":
        return <AiAssistant />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      {/* Navbar handles tab changes */}
      <Navbar currentTab={currentTab} onTabChange={setCurrentTab} />

      {/* Main content switches based on currentTab */}
      <main className="main-content">{renderTab()}</main>
    </div>
  );
}
