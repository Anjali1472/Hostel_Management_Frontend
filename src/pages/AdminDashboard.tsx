import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaBuilding, FaBed, FaClipboardList, FaUtensils, FaCalendarAlt, FaExclamationCircle } from "react-icons/fa";

export default function AdminDashboard() {
  // const stats = [
  //   { label: "My Hostels", value: 2, icon: <FaBuilding className="w-6 h-6 text-white" />, color: "bg-blue-500" },
  //   { label: "Total Rooms", value: 120, icon: <FaBed className="w-6 h-6 text-white" />, color: "bg-green-500" },
  //   { label: "Occupied Rooms", value: 85, icon: <FaBed className="w-6 h-6 text-white" />, color: "bg-yellow-500" },
  //   { label: "Pending Requests", value: 12, icon: <FaClipboardList className="w-6 h-6 text-white" />, color: "bg-red-500" },
  // ];

  const cards = [
    {
      name: "Hostel Management",
      link: "/admin/hostels",
      color: "from-blue-500 to-indigo-600",
      desc: "Add & manage hostel details",
      icon: <FaBuilding className="w-10 h-10" />,
    },
    {
      name: "Room Management",
      link: "/admin/rooms",
      color: "from-green-500 to-emerald-600",
      desc: "Add rooms hostel-wise",
      icon: <FaBed className="w-10 h-10" />,
    },
    {
      name: "Room Requests",
      link: "/admin/requests",
      color: "from-yellow-500 to-orange-500",
      desc: "Approve / reject student requests",
      icon: <FaClipboardList className="w-10 h-10" />,
    },
    {
      name: "Mess Menu",
      link: "/admin/messmenu",
      color: "from-pink-500 to-red-500",
      desc: "Daily & weekly food menu",
      icon: <FaUtensils className="w-10 h-10" />,
    },
    {
      name: "Night Out Requests",
      link: "/admin/nightout",
      color: "from-purple-500 to-indigo-500",
      desc: "Approve / reject student night out requests",
       icon: <FaUtensils className="w-10 h-10" />,
    },
    {
      name: "Holiday Requests",
      link: "/admin/holidays",
      color: "from-cyan-500 to-blue-500",
      desc: "Approve / reject holiday requests",
      icon: <FaCalendarAlt className="w-10 h-10" />,
    },
     {
      name: "Complaints",
      link: "/admin/complaints",
      color: "from-red-500 to-pink-500",
      desc: "View & manage student complaints",
      icon: <FaExclamationCircle className="w-10 h-10" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* WELCOME */}
        <div className="bg-white rounded-2xl shadow p-6 mb-10 flex flex-col md:flex-row justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-1">
              Welcome, Hostel Admin 👋
            </h1>
            <p className="text-gray-600">
              Manage hostels, rooms, students & mess efficiently
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-gray-500">
            {new Date().toDateString()}
          </div>
        </div>

        {/* STATS */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow p-5 flex flex-col items-center hover:shadow-xl transition"
            >
              <div className={`p-3 rounded-full ${stat.color} mb-3`}>
                {stat.icon}
              </div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <h3 className="text-3xl font-bold text-gray-800">
                {stat.value}
              </h3>
            </div>
          ))}
        </div> */}

        {/* MODULES */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Management Modules
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <Link key={card.name} to={card.link}>
              <div
                className={`bg-gradient-to-r ${card.color} text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition transform`}
              >
                <div className="flex justify-center mb-4">{card.icon}</div>
                <h3 className="text-xl font-semibold">{card.name}</h3>
                <p className="text-sm opacity-90 mt-1">{card.desc}</p>
                <p className="mt-4 text-sm font-medium">Open →</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
