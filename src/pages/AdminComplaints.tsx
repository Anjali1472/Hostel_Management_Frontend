import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

interface Complaint {
  id: number;
  studentEmail: string;
  title: string;
  description: string;
  status: "PENDING" | "RESOLVED";
}

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  // Fetch complaints
  const fetchComplaints = async () => {
    try {
      const res = await fetch("/api/admin/complaints"); // Replace with your API
      const data = await res.json();
      setComplaints(data);
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

        {complaints.length === 0 ? (
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
                    Student: {c.studentEmail}
                  </p>
                  <p className="font-semibold">{c.title}</p>
                  <p className="text-gray-600">{c.description}</p>
                </div>
                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold ${
                    c.status === "RESOLVED"
                      ? "text-green-600 bg-green-100"
                      : "text-yellow-600 bg-yellow-100"
                  }`}
                >
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
