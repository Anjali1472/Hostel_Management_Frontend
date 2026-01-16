import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";

type MenuType = "DAILY" | "WEEKLY";
type Category = "DAL" | "RICE" | "BHAJI" | "ROTI" | "SWEET" | "OTHER";

interface MenuItem {
  category: Category;
  name: string;
}

export default function AdminMessMenu() {
  const [menuType, setMenuType] = useState<MenuType>("DAILY");
  const [category, setCategory] = useState<Category>("DAL");
  const [itemName, setItemName] = useState("");
  const [items, setItems] = useState<MenuItem[]>([]);
  const [existing, setExisting] = useState<any[]>([]);

  const fetchExisting = async () => {
    const res = await api.get("/api/messmenu?type=DAILY");
    setExisting(res.data);
  };

  useEffect(() => {
    fetchExisting();
  }, []);

  const addItem = () => {
    if (!itemName.trim()) return;
    setItems([...items, { category, name: itemName }]);
    setItemName("");
  };

  const saveMenu = async () => {
    if (items.length < 6) {
      alert("Minimum 6 food items required");
      return;
    }

    const payload = items.map(i => ({
      menuType,
      category: i.category,
      name: i.name
    }));

    try {
      await api.post("/api/admin/messmenu", payload);
      alert("Mess Menu saved successfully!");
      setItems([]);
      fetchExisting(); // 🔥 refresh immediately
    } catch {
      alert("Failed to save menu");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto bg-white p-6 mt-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">Mess Menu Management</h1>

        {/* EXISTING MENU */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Current Menu</h2>
          {existing.map(i => (
            <p key={i.id} className="text-sm text-gray-600">
              {i.category} – {i.name} (Votes: {i.voteCount})
            </p>
          ))}
        </div>

        {/* MENU TYPE */}
        <select
          value={menuType}
          onChange={e => setMenuType(e.target.value as MenuType)}
          className="border p-2 w-full rounded mb-3"
        >
          <option value="DAILY">Daily</option>
          <option value="WEEKLY">Weekly</option>
        </select>

        {/* CATEGORY */}
        <select
          value={category}
          onChange={e => setCategory(e.target.value as Category)}
          className="border p-2 w-full rounded mb-3"
        >
          <option value="DAL">Dal</option>
          <option value="RICE">Rice</option>
          <option value="BHAJI">Bhaji</option>
          <option value="ROTI">Roti</option>
          <option value="SWEET">Sweet</option>
          <option value="OTHER">Other</option>
        </select>

        <div className="flex gap-2 mb-4">
          <input
            value={itemName}
            onChange={e => setItemName(e.target.value)}
            placeholder="Food item"
            className="border p-2 rounded w-full"
          />
          <button onClick={addItem} className="bg-blue-600 text-white px-4 rounded">
            Add
          </button>
        </div>

        <button
          onClick={saveMenu}
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          Save Menu
        </button>
      </div>
    </div>
  );
}
