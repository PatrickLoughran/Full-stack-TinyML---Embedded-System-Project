import DurationChart from "./DurationChart";
import React, { useEffect, useMemo, useState } from "react";
import { fetchParkingData } from "../services/api";
import ParkingSessionCard from "./ParkingSessionCard";


export default function Dashboard() {
  const [sessions, setSessions] = useState([]);
  const [q, setQ] = useState("");
  const [sortBy, setSortBy] = useState("start"); // "start" | "duration"
  useEffect(() => {
    (async () => {
     setSessions(await fetchParkingData());
    })();
  }, []);

//Define filtered first
  const filtered = useMemo(() => {
    const items = sessions.filter(s =>
      s.carPlate.toLowerCase().includes(q.toLowerCase())
    );
    if (sortBy === "start") {
      return [...items].sort((a,b) => new Date(a.startTime) - new Date(b.startTime));
    }
    if (sortBy === "duration") {
      const d = s => (new Date(s.endTime) - new Date(s.startTime));
      return [...items].sort((a,b) => d(a) - d(b));
    }
    return items;
  }, [sessions, q, sortBy]);
 //calculate session count and total duration
  const sessionCount = filtered.length;
  filtered.forEach((s)=>{
    if (!s.duration && s.endTime && s.startTime) {
      const start = new Date(s.startTime);
      const end = new Date(s.endTime);
      s.duration = Math.round((end - start) / 60000);
    }
  });
  const totalDuration = filtered.reduce((sum, s) => sum + s.duration, 0);

  return (
    <>
      <h2>Parking Dashboard</h2>

      <div className="toolbar">
        <input
          className="input"
          placeholder="Filter by car plate..."
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <select
          className="select"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="start">Sort by start time</option>
          <option value="duration">Sort by duration</option>
        </select>
      </div>
      <section>
        <h2> Summary</h2>
        <div className="summary">
          <p>Total Sessions: <strong>{sessionCount}</strong></p>
          <p>Total Duration: <strong>{totalDuration} mins</strong></p>
        </div>
      </section>


      {/* List of sessions */}
      {filtered.length === 0 ? (
        <div className="card">No sessions (or loading)...</div>
      ) : (
        filtered.map(s => <ParkingSessionCard key={s.id} session={s} />)
      )}

      {/* Chart */}
      <DurationChart sessions={filtered} />
    </>
  );
}