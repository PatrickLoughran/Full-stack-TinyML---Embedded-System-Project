import React, { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import "./index.css"; // Make sure you have this for styling

export default function App() {
  // 🔘 Dark mode state and toggle function
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="container">
        {/* 🔘 Toggle button */}
        <button onClick={toggleTheme} className="theme-toggle">
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        {/* 🔘 Main dashboard */}
        <Dashboard />
      </div>
    </div>
  );
}