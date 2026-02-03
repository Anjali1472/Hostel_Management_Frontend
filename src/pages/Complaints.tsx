import { useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

export default function Complaints() {
  const [issueType, setIssueType] = useState("Quality");
  const [description, setDescription] = useState("");

  const submitComplaint = () => {
    if(!description) return alert("Please add a description");
    api.post("/student/complaint", { issueType, description })
       .then(() => alert("Complaint submitted!"));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-md mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Complaint</h1>

        <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
          {/* <select 
            value={issueType} 
            onChange={e=>setIssueType(e.target.value)} 
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option>Quality</option>
            <option>Quantity</option>
            <option>Hygiene</option>
            <option>Delay</option>
          </select> */}

          <textarea 
            placeholder="Description" 
            value={description} 
            onChange={e=>setDescription(e.target.value)} 
            className="w-full p-3 border rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <button 
            onClick={submitComplaint} 
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Submit Complaint
          </button>
        </div>
      </div>
    </div>
  );
}
