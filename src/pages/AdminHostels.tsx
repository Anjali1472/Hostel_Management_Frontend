import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";

interface Hostel {
  id: number;
  name: string;
  location: string;
  totalRooms: number;
  allottedRooms: number;
  availableRooms: number;
  description: string;
  image: string;
}

export default function AdminHostels() {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🔴 image changed to File | null
  const [form, setForm] = useState<{
    name: string;
    location: string;
    totalRooms: string;
    allottedRooms: string;
    availableRooms: string;
    description: string;
    image: File | null;
  }>({
    name: "",
    location: "",
    totalRooms: "",
    allottedRooms: "",
    availableRooms: "",
    description: "",
    image: null,
  });

  /* ================= FETCH HOSTELS ================= */
  const fetchHostels = async () => {
    try {
      const res = await api.get("/api/admin/hostels");
      setHostels(res.data);
    } catch (error) {
      console.error("Failed to fetch hostels", error);
      alert("Failed to load hostels");
    }
  };

  useEffect(() => {
    fetchHostels();
  }, []);

  /* ================= ADD HOSTEL ================= */
  const addHostel = async () => {
  setLoading(true);

  const formData = new FormData();
  formData.append("name", form.name);
  formData.append("location", form.location);
  formData.append("totalRooms", form.totalRooms);
  formData.append("allottedRooms", form.allottedRooms || "0");
  formData.append("availableRooms", form.availableRooms || "0");
  formData.append("description", form.description);

  if (form.image) {
    formData.append("image", form.image);
  }

  try {
    await api.post("/api/admin/hostels", formData);

    await fetchHostels();   // refresh list
    resetForm();            // clear form
    setShowForm(false);     // ✅ CLOSE POPUP
  } catch (err) {
    console.error("Failed to add hostel", err);
    alert("Failed to add hostel");
  } finally {
    setLoading(false);
  }
};


  const resetForm = () => {
    setForm({
      name: "",
      location: "",
      totalRooms: "",
      allottedRooms: "",
      availableRooms: "",
      description: "",
      image: null,
    });
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">Hostel Management</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Hostel
          </button>
        </div>

        {/* HOSTEL CARDS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hostels.map((h) => (
            <div
              key={h.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              {h.image && (
                <img
                  src={`http://localhost:8080${h.image}`}
                  alt={h.name}
                  className="h-40 w-full object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="font-bold text-xl">{h.name}</h2>
                <p className="text-gray-500">{h.location}</p>
                <p className="text-sm mt-2">{h.description}</p>
                <div className="mt-3 flex justify-between text-sm">
                  <span>Total: {h.totalRooms}</span>
                  <span>Allotted: {h.allottedRooms}</span>
                  <span>Available: {h.availableRooms}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ADD HOSTEL MODAL */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-3xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Add New Hostel</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  placeholder="Hostel Name *"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  className="border p-2 rounded"
                />

                <input
                  placeholder="Location *"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  className="border p-2 rounded"
                />

                <input
                  type="number"
                  placeholder="Total Rooms *"
                  value={form.totalRooms}
                  onChange={(e) =>
                    setForm({ ...form, totalRooms: e.target.value })
                  }
                  className="border p-2 rounded"
                />

                <input
                  type="number"
                  placeholder="Allotted Rooms"
                  value={form.allottedRooms}
                  onChange={(e) =>
                    setForm({ ...form, allottedRooms: e.target.value })
                  }
                  className="border p-2 rounded"
                />

                <input
                  type="number"
                  placeholder="Available Rooms"
                  value={form.availableRooms}
                  onChange={(e) =>
                    setForm({ ...form, availableRooms: e.target.value })
                  }
                  className="border p-2 rounded"
                />

                {/* 🔴 FILE UPLOAD INPUT */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      image: e.target.files ? e.target.files[0] : null,
                    })
                  }
                  className="border p-2 rounded"
                />
              </div>

              <textarea
                rows={3}
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="border p-2 rounded w-full mt-4"
              />

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowForm(false)}
                  className="border px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={addHostel}
                  disabled={loading}
                  className="bg-blue-600 text-white px-5 py-2 rounded"
                >
                  {loading ? "Saving..." : "Save Hostel"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
