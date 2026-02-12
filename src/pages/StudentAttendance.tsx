import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";

interface Attendance {
  id: number;
  date: string;
  status: "PRESENT" | "ABSENT";
}

export default function StudentAttendance() {
  const [todayStatus, setTodayStatus] = useState<"PRESENT" | "ABSENT">("ABSENT");
  const [history, setHistory] = useState<Attendance[]>([]);

  useEffect(() => {
    fetchToday();
    fetchHistory();
  }, []);

  const fetchToday = async () => {
    try {
      const res = await api.get("/api/student/attendance/today");
      setTodayStatus(res.data.status);
    } catch {
      setTodayStatus("ABSENT");
    }
  };

  const fetchHistory = async () => {
    const res = await api.get("/api/student/attendance/history");
    setHistory(res.data);
  };

  return (
    <>
      <Navbar />
      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Attendance</h1>

        {/* TODAY */}
        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <p className="text-gray-500">Today</p>
          <h2
            className={`text-3xl font-bold mt-2 ${
              todayStatus === "PRESENT" ? "text-green-600" : "text-red-600"
            }`}
          >
            {todayStatus}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Attendance is marked when you vote for mess menu
          </p>
        </div>

        {/* HISTORY */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Attendance History</h2>

          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="p-3">{a.date}</td>
                  <td
                    className={`p-3 font-semibold ${
                      a.status === "PRESENT"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {a.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
