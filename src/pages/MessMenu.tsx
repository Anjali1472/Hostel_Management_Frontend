import { useEffect, useState } from "react";
import api from "../api/api";
import Navbar from "../components/Navbar";

interface MenuItem {
  id: number;
  category: string;
  name: string;
  voteCount: number;
}

export default function MessMenu() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [selected, setSelected] = useState<Record<string, number>>({});

  const fetchMenu = async () => {
    const res = await api.get("/api/messmenu?type=DAILY")
;
    setMenu(res.data);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const vote = async () => {
    try {
      for (const itemId of Object.values(selected)) {
        await api.post("/api/student/vote", { itemId });
      }
      alert("Votes submitted successfully!");
      setSelected({});
      fetchMenu(); // 🔥 refresh counts
    } catch (e: any) {
      alert(e.response?.data?.message || "Voting failed");
    }
  };

  const grouped = menu.reduce((acc: any, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Mess Menu Voting</h1>

        {Object.keys(grouped).map(cat => (
          <div key={cat} className="mb-6 bg-white p-4 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-3">{cat}</h2>

            {grouped[cat].map((item: MenuItem) => (
              <label
                key={item.id}
                className={`flex justify-between items-center p-3 border rounded mb-2 cursor-pointer
                ${selected[cat] === item.id ? "bg-blue-100 border-blue-400" : ""}`}
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Votes: {item.voteCount}
                  </p>
                </div>

                <input
                  type="radio"
                  name={`menu-${cat}`}
                  checked={selected[cat] === item.id}
                  onChange={() =>
                    setSelected(prev => ({ ...prev, [cat]: item.id }))
                  }
                  className="w-5 h-5 accent-blue-600"
                />
              </label>
            ))}
          </div>
        ))}

        <button
          onClick={vote}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
        >
          Submit Vote
        </button>
      </div>
    </div>
  );
}
