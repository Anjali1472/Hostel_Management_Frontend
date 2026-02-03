import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface NightOutRequest {
  id: number;
  date: string;
  returnTime: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  student: { id: number; email: string };
}

export default function AdminNightOut() {
  const [requests, setRequests] = useState<NightOutRequest[]>([]);

  const fetchRequests = async () => {
    try {
      const res = await api.get<NightOutRequest[]>("api/admin/nightout");
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const approve = async (id: number) => {
    try {
      await api.post(`api/admin/nightout/${id}/approve`);
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const reject = async (id: number) => {
    try {
      await api.post(`api/admin/nightout/${id}/reject`);
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
          Pending Night Out Requests
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
                  <p>📅 Date: {req.date}</p>
                  <p>⏰ Return by: {req.returnTime}</p>
                  <p>📝 Reason: {req.reason}</p>
                </div>
                <div className="flex gap-2">
                  {req.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => approve(req.id)}
                        className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        <FaCheckCircle /> Approve
                      </button>
                      <button
                        onClick={() => reject(req.id)}
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
