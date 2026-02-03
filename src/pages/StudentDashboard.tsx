import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaCalendarCheck } from "react-icons/fa";
import { FaBuilding, FaUtensils, FaCalendarDay, FaMoon, FaClipboardList } from "react-icons/fa";

export default function StudentDashboard() {
  // Mock student info (later from backend)
  const studentInfo = {
    name: "John Doe",
    // hostel: "Maple Hostel",
    // room: "A-101",
    // status: "Approved",
  };

  // const stats = [
  //   { label: "Attendance %", value: "92%", icon: <FaCalendarDay className="mx-auto text-3xl text-blue-500" /> },
  //   { label: "Mess Votes", value: 18, icon: <FaUtensils className="mx-auto text-3xl text-green-500" /> },
  //   { label: "Complaints", value: 2, icon: <FaClipboardList className="mx-auto text-3xl text-red-500" /> },
  // ];

  const cards = [
    { name: "View Hostels", link: "/student/hostels", color: "from-blue-500 to-indigo-600", desc: "Browse hostels & rooms", icon: <FaBuilding /> },
    { name: "Mess Menu", link: "/student/messmenu", color: "from-green-500 to-emerald-600", desc: "View & vote menu", icon: <FaUtensils /> },
    { name: "Attendance", link: "/student/attendance", color: "from-yellow-500 to-orange-500", desc: "Daily attendance record", icon: <FaCalendarDay /> },
    { name: "Night Out", link: "/student/nightout", color: "from-red-500 to-pink-500", desc: "Request night out", icon: <FaMoon /> },
    { name: "Complaints", link: "/student/complaints", color: "from-purple-500 to-fuchsia-600", desc: "Raise food complaints", icon: <FaClipboardList /> },
    { name: "Holiday Request", link: "/student/holidays", color: "from-cyan-500 to-sky-600", desc: "Apply for holidays", icon: <FaCalendarCheck />, },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* ===== WELCOME ===== */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 flex flex-col md:flex-row justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-1">
              Welcome, {studentInfo.name} 👋
            </h1>
            <p className="text-gray-600">
              Here’s a quick overview of your hostel and mess activities
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-gray-500">
            {new Date().toDateString()}
          </div>
        </div>

        {/* ===== ALLOCATION STATUS ===== */}
        {/* <div className="bg-white rounded-2xl shadow p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Hostel</p>
            <h3 className="text-xl font-semibold text-gray-800">{studentInfo.hostel}</h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">Room</p>
            <h3 className="text-xl font-semibold text-gray-800">{studentInfo.room}</h3>
          </div>

          <div>
            <p className="text-sm text-gray-500">Allocation Status</p>
            <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm ${
              studentInfo.status === "Approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
            }`}>
              {studentInfo.status}
            </span>
          </div>
        </div> */}

        {/* ===== STATS ===== */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl shadow p-5 text-center hover:shadow-lg transition">
              {stat.icon}
              <p className="text-gray-500 text-sm mt-2 mb-1">{stat.label}</p>
              <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
            </div>
          ))}
        </div> */}

        {/* ===== ACTION CARDS ===== */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Student Services</h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <Link key={card.name} to={card.link} className="group">
              <div className={`bg-gradient-to-r ${card.color} text-white p-6 rounded-2xl shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl`}>
                <div className="text-5xl mb-4">{card.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{card.name}</h3>
                <p className="text-sm text-white/90 mb-4">{card.desc}</p>
                <div className="text-sm font-medium opacity-80 group-hover:opacity-100">
                  Open →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
