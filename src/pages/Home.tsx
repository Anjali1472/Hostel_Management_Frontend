import { useNavigate } from "react-router-dom";
import { FaUsers, FaUtensils, FaClipboardList, FaLock } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      
      {/* Decorative Background Circles */}
      <div className="absolute top-[-120px] left-[-80px] w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-150px] right-[-100px] w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

      {/* ================= NAVBAR ================= */}
      <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center relative z-10">
        <h1 className="text-2xl font-bold text-blue-600 tracking-wide">
          HostelMess
        </h1>
        <div className="flex gap-4">
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition transform hover:scale-105"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition transform hover:scale-105"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <main className="flex-grow bg-gradient-to-r from-blue-500 to-indigo-600 px-4 flex items-center relative z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          
          {/* LEFT CONTENT */}
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight drop-shadow-lg">
              Smart Hostel & <br /> Mess Management
            </h2>
            <p className="text-lg text-blue-100 mb-8">
              Manage hostel rooms, student attendance, mess menus, complaints,
              and night-out requests — all in one place.
            </p>
            {/* <div className="flex gap-4">
              <button
                className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg text-lg hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="bg-green-600 text-white font-semibold px-8 py-3 rounded-lg text-lg hover:bg-green-700 transition transform hover:scale-105 shadow-lg"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </div> */}
          </div>

          {/* RIGHT CARD */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Why Choose HostelMess?
            </h3>

            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center gap-3">
                <FaUsers className="text-blue-600 w-6 h-6" />
                Easy student & admin management
              </li>
              <li className="flex items-center gap-3">
                <FaUtensils className="text-green-500 w-6 h-6" />
                Digital mess menu & attendance tracking
              </li>
              <li className="flex items-center gap-3">
                <FaClipboardList className="text-yellow-500 w-6 h-6" />
                Online complaints & night-out requests
              </li>
              <li className="flex items-center gap-3">
                <FaLock className="text-red-500 w-6 h-6" />
                Secure role-based access system
              </li>
            </ul>
          </div>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-900 text-gray-300 text-center py-4 text-sm relative z-10">
        © {new Date().getFullYear()} Hostel Mess Management System. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
