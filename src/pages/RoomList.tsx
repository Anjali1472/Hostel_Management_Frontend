import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/api";

interface Room {
  id: number;
  roomNumber: string;
  roomType: "Single" | "Double";
  capacity: number;
  services: string[];
  status: "Available" | "Occupied";
}

export default function StudentRoom() {
  const { hostelId } = useParams<{ hostelId: string }>();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [requestedRoomIds, setRequestedRoomIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hostelId) {
      fetchRooms();
      fetchMyRequests();
    }
  }, [hostelId]);

  // ✅ Fetch rooms
  const fetchRooms = async () => {
    try {
      const res = await api.get(`/api/student/rooms/${hostelId}`);
      setRooms(res.data);
    } catch (err) {
      console.error("Failed to fetch rooms", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch student's existing requests
  const fetchMyRequests = async () => {
    try {
      const res = await api.get("/api/student/room-requests/my");
      setRequestedRoomIds(res.data.map((r: any) => r.roomId));
    } catch (err) {
      console.error("Failed to fetch requests", err);
    }
  };

  // ✅ Request room
  const requestRoom = async (roomId: number) => {
    try {
      await api.post(`/api/student/room-requests/${roomId}`);
      alert("Room request sent");
      setRequestedRoomIds(prev => [...prev, roomId]);
    } catch (err: any) {
      alert(err.response?.data || "Request failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Available Rooms</h1>

        {loading ? (
          <p>Loading rooms...</p>
        ) : rooms.length === 0 ? (
          <p className="text-gray-500">No rooms available</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rooms.map(room => {
              const alreadyRequested = requestedRoomIds.includes(room.id);

              return (
                <div key={room.id} className="bg-white p-6 rounded-xl shadow">
                  <h2 className="text-xl font-semibold">
                    Room {room.roomNumber}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Type: {room.roomType}
                  </p>

                  <p className="text-gray-500">
                    Capacity: {room.capacity}
                  </p>

                  <p className="text-sm mt-2">
                    Services: {room.services?.join(", ") || "-"}
                  </p>

                  <p className={`mt-3 font-medium ${
                    room.status === "Available"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}>
                    {room.status}
                  </p>

                  {room.status === "Available" && (
                    <button
                      disabled={alreadyRequested}
                      onClick={() => requestRoom(room.id)}
                      className={`mt-4 w-full py-2 rounded text-white ${
                        alreadyRequested
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-600"
                      }`}
                    >
                      {alreadyRequested ? "Requested" : "Request Room"}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
