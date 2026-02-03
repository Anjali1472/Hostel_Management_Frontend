import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

// ✅ FRONTEND TYPE FOR HOLIDAY REQUEST
interface HolidayRequest {
  id: number;
  fromDate: string;
  toDate: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export default function StudentHoliday() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  // ✅ Typed state for my requests
  const [myRequests, setMyRequests] = useState<HolidayRequest[]>([]);

  // ================= SUBMIT =================
  const submitRequest = async () => {
    if (!fromDate || !toDate || !reason) {
      alert("Please fill all fields");
      return;
    }

    try {
      await api.post("api/student/holidays", { fromDate, toDate, reason });

      alert("Holiday request submitted 🎉");

      setFromDate("");
      setToDate("");
      setReason("");

      fetchMyRequests();
    } catch (err) {
      alert("Failed to submit request");
    }
  };

  // ================= FETCH =================
  const fetchMyRequests = async () => {
    try {
      const res = await api.get<HolidayRequest[]>("api/student/holidays/my");
      setMyRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyRequests();
  }, []);

  // ================= STATUS COLOR =================
  const statusColor = (status: "PENDING" | "APPROVED" | "REJECTED"): string => {
    if (status === "APPROVED") return "text-green-600 bg-green-100";
    if (status === "REJECTED") return "text-red-600 bg-red-100";
    return "text-yellow-600 bg-yellow-100";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-blue-200">
      <Navbar />

      <div className="max-w-xl mx-auto mt-14 px-4">
        

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4 mb-10">
          <div>
            <label className="text-sm font-semibold text-gray-600">From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-600">Reason</label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Family function, medical, personal..."
              className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            onClick={submitRequest}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
          >
            Submit Request 🚀
          </button>
        </div>

        {/* ================= MY REQUESTS ================= */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">My Holiday Requests</h2>

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
                    📅 {req.fromDate} → {req.toDate}
                  </p>
                  <p className="text-sm text-gray-600">📝 {req.reason}</p>
                </div>

                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold ${statusColor(req.status)}`}
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
