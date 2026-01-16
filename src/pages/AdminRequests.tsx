import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";

interface RoomRequest {
  id: number;
  status: "PENDING" | "APPROVED" | "REJECTED";

  student: {
    name: string;
    email: string;
  };

  hostel: {
    name: string;
  };

  room: {
    roomNumber: string;
  };
}

export default function AdminRequests() {
  const [requests, setRequests] = useState<RoomRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  // ✅ Fetch pending requests
  const fetchRequests = async () => {
    try {
      const res = await api.get("/api/admin/room-requests");
      setRequests(res.data);
    } catch (err) {
      console.error("Failed to fetch requests", err);
    } finally {
      setLoading(false);
    }
  };

  const approveRequest = async (id: number) => {
    try {
      await api.post(`/api/admin/room-requests/${id}/approve`);
      setRequests(prev =>
        prev.map(r =>
          r.id === id ? { ...r, status: "APPROVED" } : r
        )
      );
    } catch {
      alert("Approval failed");
    }
  };

  const rejectRequest = async (id: number) => {
    try {
      await api.post(`/api/admin/room-requests/${id}/reject`);
      setRequests(prev =>
        prev.map(r =>
          r.id === id ? { ...r, status: "REJECTED" } : r
        )
      );
    } catch {
      alert("Reject failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Room Requests</h1>

        {loading ? (
          <p>Loading...</p>
        ) : requests.length === 0 ? (
          <p className="text-gray-500">No pending requests</p>
        ) : (
          <table className="w-full bg-white rounded-xl shadow">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Student</th>
                <th>Hostel</th>
                <th>Room</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {requests.map(r => (
                <tr key={r.id} className="border-t text-center">
                  <td className="p-3">{r.student?.name}</td>
                  <td>{r.hostel?.name}</td>
                  <td>{r.room?.roomNumber}</td>
                  <td className="font-semibold">{r.status}</td>

                  <td>
                    {r.status === "PENDING" ? (
                      <>
                        <button
                          onClick={() => approveRequest(r.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => rejectRequest(r.id)}
                          className="bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-500">Done</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
