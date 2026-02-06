import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";

interface Thali {
  id: number;
  name: string;
  bhaji1: string;
  bhaji2: string;
  rice: string;
  dal: string;
  roti: string;
  sweet: string;
  image: string;
   voteCount: number;
}

export default function AdminMessMenu() {
  const [thalis, setThalis] = useState<Thali[]>([]);
  
  
  const [form, setForm] = useState<{
    name : string;
    bhaji1: string;
  bhaji2: string;
  rice: string;
  dal: string;
  roti: string;
  sweet: string;
  image: File | null;
   voteCount: number;
  }>({
    name: "",
    bhaji1: "",
    bhaji2: "",
    rice: "",
    dal: "",
    roti: "",
    sweet: "",
    image: null,
     voteCount: 0,
   });

  // ================= FETCH =================
  const fetchThalis = async () => {
    const res = await api.get("/api/admin/messmenu");
    setThalis(res.data);
  };

  useEffect(() => {
  const interval = setInterval(fetchThalis, 5000);
  return () => clearInterval(interval);
}, []);


  // ================= SAVE THALI =================
const saveThali = async () => {
  const formData = new FormData();
  // try {
    if (!form.image) {
      alert("Please select an imagePath");
    
      return;
    }

    // const data = new FormData();
   
  formData.append("image",form.image)
  formData.append("name", form.name);
  formData.append("bhaji1", form.bhaji1);
  formData.append("bhaji2", form.bhaji2);
  formData.append("rice", form.rice);
  formData.append("dal", form.dal);
  formData.append("roti", form.roti);
   formData.append("sweet", form.sweet);
   formData.append("voteCount", form.voteCount+"");
    console.log(formData +"...data")
    console.log("image: "+form.image)

try {
    await api.post("/api/admin/messmenu", formData);
    
    alert("Thali added");
    fetchThalis();
  } catch (e: any) {
    console.error(e);
    alert("Failed to add thali");
  }
};


  // ================= DELETE =================
  const deleteAll = async () => {
    if (!confirm("Delete all thalis?")) return;
    await api.delete("/api/admin/messmenu");
    fetchThalis();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto bg-white p-6 mt-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6">🍽️ Thali Management</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ["name", "Thali Name"],
            ["bhaji1", "Bhaji 1"],
            ["bhaji2", "Bhaji 2"],
            ["rice", "Rice"],
            ["dal", "Dal"],
            ["roti", "Roti"],
            ["sweet", "Sweet"],
          ].map(([key, placeholder]) => (
            <input
              key={key}
              value={(form as any)[key]}
              onChange={e => setForm({ ...form, [key]: e.target.value })}
              placeholder={placeholder}
              className="border p-2 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            />
          ))}
        </div>

        {/* Image Upload */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">Thali Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={e =>
              setForm({
                ...form,
                image: e.target.files ? e.target.files[0] : null,
              })
            }
            className="block w-full text-sm border rounded-lg file:bg-green-600 file:text-white file:px-4 file:py-2 file:border-0 file:rounded-lg"
          />
        </div>

        <button
          onClick={saveThali}
          className="mt-5 bg-green-600 hover:bg-green-700 text-white w-full py-3 rounded-xl font-semibold transition"
        >
          ➕ Add Thali
        </button>


                <hr className="my-6" />

                {/* LIST */}
        <h2 className="font-semibold text-lg mb-3">📋 Current Thalis</h2>

        <div className="space-y-4">
          {thalis.map(t => (
            <div
              key={t.id}
              className="flex gap-4 bg-gray-50 border rounded-xl p-4 shadow-sm hover:shadow transition"
            >
              {/* Image */}
              <div className="w-36 h-24 overflow-hidden rounded-lg flex-shrink-0">
                <img
                  src={`http://localhost:8080${t.image}`}
                  alt={t.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-800">{t.name}</h3>

                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    👍 {t.voteCount} votes
                  </span>
                </div>

                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  {t.bhaji1}, {t.bhaji2}, {t.rice}, {t.dal}, {t.roti}, {t.sweet}
                </p>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={deleteAll}
          className="mt-6 bg-red-600 hover:bg-red-700 text-white w-full py-3 rounded-xl font-semibold transition"
        >
          🗑️ Delete All Thalis
        </button>
      </div>
    </div>
  );
}
