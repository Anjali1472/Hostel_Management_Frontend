import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/api";

interface Hostel {
  id: number;
  name: string;
  location: string;
  totalRooms: number;
  availableRooms: number;
  image?: string;
}

export default function HostelList() {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/student/hostels")
      .then(res => setHostels(res.data))
      .catch(err => console.error("Failed to load hostels", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Available Hostels</h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hostels.map(h => (
            <div key={h.id} className="bg-white p-6 rounded-2xl shadow">
              <img
                src={`http://localhost:8080${h.image}`}
                className="h-40 w-full object-cover rounded mb-3"
              />
              <h2 className="text-xl font-semibold">{h.name}</h2>
              <p className="text-gray-500">{h.location}</p>
              <p className="text-sm mt-2">
                Rooms: {h.availableRooms}/{h.totalRooms}
              </p>

              <button
                onClick={() => navigate(`/student/hostel/${h.id}/rooms`)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              >
                View Rooms
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
