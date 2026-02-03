
import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface HolidayRequest {
  id: number;
//   studentName: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  student: { id: number; email: string };
}

export default function AdminHolidayRequests() {
  const [requests, setRequests] = useState<HolidayRequest[]>([]);

  // Fetch all holiday requests
  const fetchRequests = async () => {
    try {
      const res = await api.get<HolidayRequest[]>("api/admin/holidays");
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Approve or reject a request
  const handleAction = async (id: number, type: "approve" | "reject") => {
    try {
      await api.put(`api/admin/holidays/${id}/${type}`);
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Pending Holiday Requests
        </h1>

        {requests.length === 0 ? (
          <p className="text-gray-500">No pending requests</p>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req.id}
                className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    Student: {req.student.email}
                  </p>
                  <p>📅 From: {req.fromDate}</p>
                  <p>📅 To: {req.toDate}</p>
                  <p>📝 Reason: {req.reason}</p>
                </div>

                <div className="flex gap-2">
                  {req.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => handleAction(req.id, "approve")}
                        className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        <FaCheckCircle /> Approve
                      </button>
                      <button
                        onClick={() => handleAction(req.id, "reject")}
                        className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        <FaTimesCircle /> Reject
                      </button>
                    </>
                  )}

                  {req.status !== "PENDING" && (
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-semibold ${
                        req.status === "APPROVED"
                          ? "text-green-600 bg-green-100"
                          : "text-red-600 bg-red-100"
                      }`}
                    >
                      {req.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
