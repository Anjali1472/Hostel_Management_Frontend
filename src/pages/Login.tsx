import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import api from "../api/api";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: string;
  role: "STUDENT" | "ADMIN";
  exp: number;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"STUDENT" | "ADMIN">("STUDENT"); // UI ONLY
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await api.post("/api/auth/login", {
        email,
        password,
      });

      // 🔥 IMPORTANT FIX
      localStorage.clear();

      const token = res.data.token;
      console.log("token "+token)
      localStorage.setItem("token", token);

      const decoded = jwtDecode<JwtPayload>(token);
      const backendRole = decoded.role;

      localStorage.setItem("role", backendRole);
      console.log("backendRole "+backendRole)
      // ✅ ROLE BASED REDIRECT (BACKEND ROLE ONLY)
      if (backendRole === "ADMIN") {
        console.log("navigate to Admin")
        navigate("/admin", { replace: true });
      } else {
         console.log("navigate to student")
        navigate("/student", { replace: true });
      }

    } catch (error) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4 relative overflow-hidden">
      
      {/* Decorative Circles */}
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-120px] right-[-100px] w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

      <div className="relative bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md transform transition-transform hover:scale-105">
        
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to Hostel Mess System
        </p>

        {/* Role Toggle (UI ONLY) */}
        <div className="flex mb-6 rounded-xl overflow-hidden border border-gray-200">
          <button
            className={`w-1/2 py-2 font-semibold transition-colors ${
              role === "STUDENT"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setRole("STUDENT")}
          >
            Student
          </button>
          <button
            className={`w-1/2 py-2 font-semibold transition-colors ${
              role === "ADMIN"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
            onClick={() => setRole("ADMIN")}
          >
            Admin
          </button>
        </div>

        {/* Email */}
        <div className="relative mb-4">
          <FaEnvelope className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            placeholder="Email address"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="relative mb-6">
          <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          © {new Date().getFullYear()} Hostel Mess Management
        </p>
      </div>
    </div>
  );
}
