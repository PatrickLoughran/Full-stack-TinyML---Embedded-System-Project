import React from "react";

export default function ParkingSessionCard({ session }) {
  const start = new Date(session.startTime);
  const end = new Date(session.endTime);
  const durationMin = Math.round((end - start) / 60000);

  let statusClass = "";
  let statusLabel = "";
  if (durationMin >= 100) {
    statusClass = "long";
    statusLabel = "🚨 Overstay";
  } else if (durationMin >= 60) {
    statusClass = "medium";
    statusLabel = "⚠️ Medium/Long Stay";
  } else {
    statusClass = "short";
    statusLabel = "✅ Short Stay";
  }
console.log("statusClass =", statusClass);
  return (
    <div className={"card"}>
      <span className={"badge ${statusClass}"}>{statusLabel}</span>
      <h4>Car: {session.carPlate}</h4>
      <div className="row">Start: {start.toLocaleString()}</div>
      <div className="row">End: {end.toLocaleString()}</div>
      <div className="row">
        <strong>Duration:</strong> {durationMin} min
      </div>
    </div>
  );
}
