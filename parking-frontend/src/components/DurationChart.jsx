// src/components/DurationChart.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function DurationChart({ sessions }) {
  if (!sessions?.length) return null;

  // X-axis labels like "ABC123 #1"
  const labels = sessions.map((s, idx) => `${s.carPlate} #${idx + 1}`);

  // Data in minutes
  const durations = sessions.map(
    s => Math.round((new Date(s.endTime) - new Date(s.startTime)) / 60000)
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Duration (min)",
        data: durations,
        // (no custom colors/not default)
        backgroundColor: "#05d280ff",
        borderRadius: 6,
        borderWidth: 2,
        borderColor: "#898888ff"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true }
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: "Minutes" } },
      x: { ticks: { autoSkip: false, maxRotation: 0, minRotation: 0 } }
    }
  };

  return (
    <div className="section card">
      <h4 style={{ marginBottom: 12 }}>Session Durations</h4>
      <Bar data={data} options={options} />
    </div>
  );
}