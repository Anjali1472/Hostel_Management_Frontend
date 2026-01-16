import { useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

export default function NightOut() {
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");
  const [returnTime, setReturnTime] = useState("");

  const submitRequest = () => {
    if(!date || !reason || !returnTime) return alert("Please fill all fields");
    api.post("/student/nightout", { date, reason, returnTime })
       .then(() => alert("Request submitted!"));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-md mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Night Out Request</h1>

        <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
          <input 
            type="date" 
            value={date} 
            onChange={e=>setDate(e.target.value)} 
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input 
            type="text" 
            placeholder="Reason" 
            value={reason} 
            onChange={e=>setReason(e.target.value)} 
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input 
            type="time" 
            value={returnTime} 
            onChange={e=>setReturnTime(e.target.value)} 
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button 
            onClick={submitRequest} 
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
}
