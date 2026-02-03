import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const studentLinks = [
    { name: "Dashboard", path: "/student" },
    { name: "Hostels", path: "/student/hostels" },
    { name: "Mess Menu", path: "/student/messmenu" },
    { name: "Attendance", path: "/student/attendance" },
    { name: "Night Out", path: "/student/nightout" },
    { name: "Complaints", path: "/student/complaints" },
    
  ];

  const adminLinks = [
    { name: "Dashboard", path: "/admin" },
    { name: "Hostels", path: "/admin/hostels" },
    { name: "Rooms", path: "/admin/rooms" },
    { name: "Requests", path: "/admin/requests" },
    { name: "Mess Menu", path: "/admin/messmenu" },
  ];

  const links = role === "STUDENT" ? studentLinks : adminLinks;

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between shadow-md">
      <div className="flex items-center space-x-3">
        <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate(role === "ADMIN" ? "/admin" : "/student")}>
          Hostel Mess System
        </h1>
        <span className="hidden md:inline-block text-gray-300">| {role}</span>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-4">
        {links.map((link) => (
          <button
            key={link.name}
            onClick={() => navigate(link.path)}
            className="hover:text-blue-400 transition"
          >
            {link.name}
          </button>
        ))}

        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-800 flex flex-col px-6 py-4 space-y-2 md:hidden">
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => { navigate(link.path); setMenuOpen(false); }}
              className="text-left hover:text-blue-400 transition"
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={logout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
