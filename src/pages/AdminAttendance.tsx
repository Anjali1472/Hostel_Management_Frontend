import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";
import { FaUserCheck, FaCalendarDay, FaSync } from "react-icons/fa";

interface Attendance {
  id: number;
  student: {
    name: string;
    email: string;
  };
  date: string;
}

export default function AdminAttendance() {
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchToday();
  }, []);

  const fetchToday = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/admin/attendance/today");
      setAttendance(res.data);
    } catch (error) {
      console.error("Failed to fetch attendance", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <Navbar />

      <div className="p-8 max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Today's Attendance
          </h1>

          <button
            onClick={fetchToday}
            className="mt-4 md:mt-0 flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            <FaSync />
            Refresh
          </button>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Present Students</p>
              <h2 className="text-4xl font-bold text-green-600">
                {attendance.length}
              </h2>
            </div>
            <div className="bg-green-100 p-4 rounded-full">
              <FaUserCheck className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Date</p>
              <h2 className="text-xl font-semibold text-gray-800">
                {new Date().toDateString()}
              </h2>
            </div>
            <div className="bg-blue-100 p-4 rounded-full">
              <FaCalendarDay className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Status</p>
              <h2 className="text-xl font-semibold text-gray-800">
                {loading ? "Loading..." : "Updated"}
              </h2>
            </div>
          </div>
        </div>

        {/* ATTENDANCE TABLE */}
        <div className="bg-white shadow rounded-2xl p-6">
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Student Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {!loading && attendance.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-5 text-center text-gray-500">
                    No attendance recorded today
                  </td>
                </tr>
              )}

              {attendance.map((a) => (
                <tr key={a.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{a.student.name}</td>
                  <td className="p-3 text-gray-600">{a.student.email}</td>
                  <td className="p-3">
                    {new Date(a.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
