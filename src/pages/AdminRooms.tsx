import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";

interface Hostel {
  id: number;
  name: string;
}

interface Room {
  id: number;
  roomNumber: string;
  roomType: "Single" | "Double";
  capacity: number;
  services: string[];
  status: "Available" | "Occupied";
}

export default function AdminRooms() {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [selectedHostel, setSelectedHostel] = useState<number | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    roomNumber: "",
    roomType: "Single" as "Single" | "Double",
    capacity: "",
    services: {
      bed: false,
      fan: false,
      wifi: false,
      table: false,
    },
  });

  // ✅ Fetch hostels
  const fetchHostels = async () => {
    try {
      // const token = localStorage.getItem("token");
      // if (!token) {
      //   console.error("JWT token missing");
      //   return;
      // }
      const token = localStorage.getItem("token");
          if (!token) {
          console.error("JWT token missing");
          return;
        }
      const res = await api.get("/api/admin/hostels");
      setHostels(res.data);
    } catch (err) {
      console.error("Failed to fetch hostels", err);
    }
  };

  // ✅ Fetch rooms for selected hostel
  const fetchRooms = async (hostelId: number) => {
    try {
      const res = await api.get(`/api/admin/rooms/${hostelId}`);
      setRooms(res.data);
    } catch (err) {
      console.error("Failed to fetch rooms", err);
    }
  };

  useEffect(() => {
    fetchHostels();
  }, []);

  useEffect(() => {
    if (selectedHostel !== null) {
      fetchRooms(selectedHostel);
    }
  }, [selectedHostel]);

  // ✅ Add room
  const addRoom = async () => {
    if (!selectedHostel) {
      alert("Please select a hostel");
      return;
    }

    if (!form.roomNumber || !form.capacity) {
      alert("Please fill required fields");
      return;
    }

    const payload = {
      roomNumber: form.roomNumber,
      roomType: form.roomType,
      capacity: Number(form.capacity),
      services: Object.keys(form.services).filter(
        (s) => form.services[s as keyof typeof form.services]
      ),
    };

    try {
      await api.post(`/api/admin/rooms/${selectedHostel}`, payload);

      setShowForm(false);
      setForm({
        roomNumber: "",
        roomType: "Single",
        capacity: "",
        services: { bed: false, fan: false, wifi: false, table: false },
      });

      fetchRooms(selectedHostel);
    } catch (err) {
      console.error("Failed to add room", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">
          Hostel-wise Room Management
        </h1>

        {/* Hostel Select */}
        <select
          className="border p-2 rounded w-64 mb-4"
          value={selectedHostel ?? ""}
          onChange={(e) =>
            setSelectedHostel(e.target.value ? Number(e.target.value) : null)
          }
        >
          <option value="">Select Hostel</option>
          {hostels.map((h) => (
            <option key={h.id} value={h.id}>
              {h.name}
            </option>
          ))}
        </select>

        {selectedHostel && (
          <>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
            >
              + Add Room
            </button>

            <table className="w-full bg-white shadow rounded">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2">Room No</th>
                  <th>Type</th>
                  <th>Capacity</th>
                  <th>Services</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rooms.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center p-4">
                      No rooms added yet
                    </td>
                  </tr>
                ) : (
                  rooms.map((room) => (
                    <tr key={room.id} className="border-t text-center">
                      <td className="p-2">{room.roomNumber}</td>
                      <td>{room.roomType}</td>
                      <td>{room.capacity}</td>
                      <td>{room.services.join(", ") || "-"}</td>
                      <td
                        className={
                          room.status === "Available"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {room.status}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </>
        )}

        {/* Add Room Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Add Room</h2>

              <input
                className="border p-2 w-full mb-3"
                placeholder="Room Number"
                value={form.roomNumber}
                onChange={(e) =>
                  setForm({ ...form, roomNumber: e.target.value })
                }
              />

              <select
                className="border p-2 w-full mb-3"
                value={form.roomType}
                onChange={(e) =>
                  setForm({ ...form, roomType: e.target.value as any })
                }
              >
                <option value="Single">Single</option>
                <option value="Double">Double</option>
              </select>

              <input
                type="number"
                className="border p-2 w-full mb-3"
                placeholder="Capacity"
                value={form.capacity}
                onChange={(e) =>
                  setForm({ ...form, capacity: e.target.value })
                }
              />

              <div className="grid grid-cols-2 gap-2 mb-4">
                {Object.keys(form.services).map((service) => (
                  <label key={service} className="flex gap-2">
                    <input
                      type="checkbox"
                      checked={
                        form.services[
                          service as keyof typeof form.services
                        ]
                      }
                      onChange={(e) =>
                        setForm({
                          ...form,
                          services: {
                            ...form.services,
                            [service]: e.target.checked,
                          },
                        })
                      }
                    />
                    {service.toUpperCase()}
                  </label>
                ))}
              </div>

              <div className="flex justify-end gap-3">
                <button onClick={() => setShowForm(false)}>Cancel</button>
                <button
                  onClick={addRoom}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
