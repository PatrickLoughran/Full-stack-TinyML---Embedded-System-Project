import { parkingSessions } from "../mockData";

// Mocked fetch (simulates backend API call)
export async function fetchParkingData() {
  return new Promise(resolve => setTimeout(() => resolve(parkingSessions), 400));
}

// Later, when backend is ready, replace with real fetch:
// export async function fetchParkingData() {
//   const res = await fetch(import.meta.env.VITE_API_URL + "/parking-sessions");
//   if (!res.ok) throw new Error("Failed to fetch");
//   return res.json();
// }