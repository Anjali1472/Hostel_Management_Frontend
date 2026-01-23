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
    const res = await api.get("/api/student/messmenu?type=DAILY");
    setMenu(res.data);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // ✅ FIXED VOTE FUNCTION
  const [hasVoted, setHasVoted] = useState(false);

const vote = async () => {
  try {
    if (hasVoted) {
      alert("You already voted today");
      return;
    }

    const itemIds = Object.values(selected);

    if (itemIds.length === 0) {
      alert("Please select at least one item");
      return;
    }

    await api.post("/api/student/vote", {
    itemId: itemIds,

    
  });

    alert("Votes submitted successfully!");
    setHasVoted(true);
    setSelected({});
    fetchMenu();
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
                  <p className="font-medium text-gray-800">{item.name}</p>
                  
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
  disabled={hasVoted}
  onClick={vote}
  className={`w-full py-3 rounded-lg font-semibold
    ${hasVoted ? "bg-gray-400" : "bg-blue-600 text-white"}`}
>
  {hasVoted ? "Already Voted" : "Submit Vote"}
</button>
      </div>
    </div>
  );
}
