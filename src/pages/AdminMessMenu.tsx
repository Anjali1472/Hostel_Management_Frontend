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
        <h1 className="text-2xl font-bold mb-4">Thali Management</h1>

        {/* FORM */}
        <input
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          placeholder="Thali Name"
          className="border p-2 w-full rounded mb-2"
        />

        <input
          value={form.bhaji1}
          onChange={e => setForm({ ...form, bhaji1: e.target.value })}
          placeholder="Bhaji 1"
          className="border p-2 w-full rounded mb-2"
        />

        <input
          value={form.bhaji2}
          onChange={e => setForm({ ...form, bhaji2: e.target.value })}
          placeholder="Bhaji 2"
          className="border p-2 w-full rounded mb-2"
        />

        <input
          value={form.rice}
          onChange={e => setForm({ ...form, rice: e.target.value })}
          placeholder="Rice"
          className="border p-2 w-full rounded mb-2"
        />

        <input
          value={form.dal}
          onChange={e => setForm({ ...form, dal: e.target.value })}
          placeholder="Dal"
          className="border p-2 w-full rounded mb-2"
        />

        <input
          value={form.roti}
          onChange={e => setForm({ ...form, roti: e.target.value })}
          placeholder="Roti"
          className="border p-2 w-full rounded mb-2"
        />

        <input
          value={form.sweet}
          onChange={e => setForm({ ...form, sweet: e.target.value })}
          placeholder="Sweet"
          className="border p-2 w-full rounded mb-2"
        />

        {/* IMAGE INPUT */}
        <input
          type="file"
          accept="image/*"
          onChange={e =>   setForm({
                      ...form,
                      image: e.target.files ? e.target.files[0] : null,
                    })}
          className="border p-2 w-full rounded mb-2"
        />

        <button
          onClick={saveThali}
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          Add Thali
        </button>

        <hr className="my-6" />

        {/* LIST */}
        <h2 className="font-semibold mb-2">Current Thalis</h2>

        {thalis.map(t => (
          <div key={t.id} className="border p-3 rounded mb-3">
            <p className="font-bold">{t.name}</p>
            <p>
              {t.bhaji1}, {t.bhaji2}, {t.rice}, {t.dal}, {t.roti}, {t.sweet}
            </p>

            <img
              src={`http://localhost:8080${t.image}`}
              alt={t.name}
              className="w-full h-40 object-cover rounded mt-2"
            />

            <p className="text-blue-600 font-semibold mt-1">
              {t.voteCount} votes
            </p>
          </div>
        ))}

        <button
          onClick={deleteAll}
          className="bg-red-600 text-white w-full py-2 rounded mt-3"
        >
          Delete All
        </button>
      </div>
    </div>
  );
}
