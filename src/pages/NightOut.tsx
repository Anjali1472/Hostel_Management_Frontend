import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

// ✅ FRONTEND TYPE (not DTO)
interface NightOutRequest {
  id: number;
  date: string;
  returnTime: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export default function NightOut() {
  const [date, setDate] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [returnTime, setReturnTime] = useState<string>("");

  // ✅ FIXED: typed state
  const [myRequests, setMyRequests] = useState<NightOutRequest[]>([]);

  // ================= SUBMIT =================
  const submitRequest = async () => {
    if (!date || !reason || !returnTime) {
      alert("Please fill all fields");
      return;
    }

    try {
      await api.post("api/student/nightout", {
        date,
        reason,
        returnTime,
      });

      alert("Night out request submitted ✅");

      setDate("");
      setReason("");
      setReturnTime("");

      fetchMyRequests();
    } catch (err) {
      alert("Failed to submit request");
    }
  };

  // ================= FETCH =================
  const fetchMyRequests = async () => {
    try {
      const res = await api.get<NightOutRequest[]>("api/student/nightout/my");
      setMyRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyRequests();
  }, []);

  // ================= STATUS COLOR =================
  const statusColor = (
    status: "PENDING" | "APPROVED" | "REJECTED"
  ): string => {
    if (status === "APPROVED") return "text-green-600 bg-green-100";
    if (status === "REJECTED") return "text-red-600 bg-red-100";
    return "text-yellow-600 bg-yellow-100";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Night Out Request
        </h1>

        {/* ================= FORM ================= */}
        <div className="bg-white p-6 rounded-2xl shadow-md space-y-4 mb-10">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            placeholder="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="time"
            value={returnTime}
            onChange={(e) => setReturnTime(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={submitRequest}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Submit Request
          </button>
        </div>

        {/* ================= MY REQUESTS ================= */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          My Night Out Requests
        </h2>

        {myRequests.length === 0 ? (
          <p className="text-gray-500">No requests submitted yet.</p>
        ) : (
          <div className="space-y-4">
            {myRequests.map((req) => (
              <div
                key={req.id}
                className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    📅 {req.date}
                  </p>
                  <p className="text-sm text-gray-600">
                    ⏰ Return by {req.returnTime}
                  </p>
                  <p className="text-sm text-gray-600">
                    📝 {req.reason}
                  </p>
                </div>

                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold ${statusColor(
                    req.status
                  )}`}
                >
                  {req.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
