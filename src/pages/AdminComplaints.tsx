import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

interface Complaint {
  id: number;
  student: {
    id: number;
    email: string;
    name: string;
  };
  title: string;
  description: string;
  status: "PENDING" | "RESOLVED";
  createdAt: string;
}

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("token"); // 🔑 JWT TOKEN

  // Fetch all complaints
  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/admin/complaints", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ FIX
        },
      });

      if (!res.ok) {
        console.error("Failed to fetch complaints:", res.status);
        setComplaints([]);
        return;
      }

      const data = await res.json();
      setComplaints(data);
    } catch (err) {
      console.error("Error fetching complaints:", err);
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  };

  // Approve complaint
  const handleApprove = async (id: number) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/admin/complaints/${id}/approve`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`, // ✅ FIX
          },
        }
      );

      if (res.ok) fetchComplaints();
      else console.error("Failed to approve complaint");
    } catch (err) {
      console.error(err);
    }
  };

  // Reject complaint
  const handleReject = async (id: number) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/admin/complaints/${id}/reject`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`, // ✅ FIX
          },
        }
      );

      if (res.ok) fetchComplaints();
      else console.error("Failed to reject complaint");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Student Complaints
        </h1>

        {loading ? (
          <p className="text-gray-500">Loading complaints...</p>
        ) : complaints.length === 0 ? (
          <p className="text-gray-500">No complaints found</p>
        ) : (
          <div className="space-y-4">
            {complaints.map((c) => (
              <div
                key={c.id}
                className="bg-white p-5 rounded-xl shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    Student Email: {c.student.email}
                  </p>
                  <p className="font-semibold">{c.title}</p>
                  <p className="text-gray-600">{c.description}</p>
                </div>

                <div className="flex items-center space-x-2">
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold ${
                      c.status === "RESOLVED"
                        ? "text-green-600 bg-green-100"
                        : "text-yellow-600 bg-yellow-100"
                    }`}
                  >
                    {c.status}
                  </span>

                  {c.status === "PENDING" && (
                    <>
                      <button
                        onClick={() => handleApprove(c.id)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => handleReject(c.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Reject
                      </button>
                    </>
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
