import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../api/api";

type MenuType = "DAILY" | "WEEKLY";
type Category = "DAL" | "RICE" | "BHAJI" | "ROTI" | "SWEET" | "OTHER";

interface MenuItem {
  category: Category;
  name: string;
}

interface ExistingMenuItem {
  id: number;
  category: Category;
  name: string;
  voteCount: number;
}

interface VoteCount {
  itemId: number;
  voteCount: number;
}

export default function AdminMessMenu() {
  const [menuType, setMenuType] = useState<MenuType>("DAILY");
  const [category, setCategory] = useState<Category>("DAL");
  const [itemName, setItemName] = useState("");
  const [items, setItems] = useState<MenuItem[]>([]);
  const [existing, setExisting] = useState<ExistingMenuItem[]>([]);
  // const [voteCounts, setVoteCounts] = useState<VoteCount[]>([]);

  // ================= FETCH EXISTING MENU =================
  const fetchExisting = async () => {
    try {
      const res = await api.get(`/api/admin/messmenu?type=${menuType}`);
      setExisting(res.data);
    } catch (err) {
      console.error("Fetch failed", err);
      setExisting([]);
    }
  };

  // ================= FETCH VOTE COUNTS =================
  // const fetchVoteCounts = async () => {
  //   try {
  //     const res = await api.get(
  //       `/api/admin/votes/count?menuType=${menuType}`
  //     );
  //     setVoteCounts(res.data);
  //   } catch (err) {
  //     console.error("Vote count fetch failed", err);
  //     setVoteCounts([]);
  //   }
  // };

  useEffect(() => {
    fetchExisting();
    // fetchVoteCounts();
  }, [menuType]);

  // ================= ADD ITEM =================
  const addItem = () => {
    if (!itemName.trim()) return;

    setItems(prev => [...prev, { category, name: itemName }]);
    setItemName("");
  };

  // ================= SAVE MENU =================
  const saveMenu = async () => {
    if (items.length < 6) {
      alert("Minimum 6 food items required");
      return;
    }

    const payload = items.map(i => ({
      menuType,
      category: i.category,
      name: i.name,
    }));

    try {
      await api.post("/api/admin/messmenu", payload);
      alert("Mess Menu saved successfully!");
      setItems([]);
      fetchExisting();
      // fetchVoteCounts();
    } catch (err) {
      console.error("Save failed", err);
      alert("Failed to save menu");
    }
  };

  // ================= DELETE MENU =================
  const deleteMenu = async () => {
    if (!confirm("Are you sure you want to delete the menu?")) return;

    try {
      await api.delete(`/api/admin/messmenu?type=${menuType}`);
      alert("Menu deleted");
      setExisting([]);
      // setVoteCounts([]);
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete menu");
    }
  };

  // ================= MAP FOR FAST LOOKUP =================
  // const voteMap: Record<number, number> = {};
  // voteCounts.forEach(v => {
  //   voteMap[v.itemId] = v.voteCount;
  // });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto bg-white p-6 mt-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">Mess Menu Management</h1>

        {/* CURRENT MENU */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">
            Current Menu ({existing.length} items)
          </h2>

          {existing.length === 0 && (
            <p className="text-gray-500 text-sm">No menu available</p>
          )}

          {existing.map(i => (
            <p
              key={i.id}
              className="text-sm text-gray-700 flex justify-between"
            >
              <span>
                {i.category} - {i.name}
              </span>
              <span className="font-semibold text-blue-600">
                {i.voteCount} votes
              </span>
            </p>
          ))}
        </div>

        {/* ITEMS TO BE SAVED */}
        {items.length > 0 && (
          <div className="mb-4 p-3 bg-yellow-50 rounded">
            <p className="font-semibold text-sm">
              Items to be saved ({items.length})
            </p>
            {items.map((i, idx) => (
              <p key={idx} className="text-sm">
                {i.category} – {i.name}
              </p>
            ))}
          </div>
        )}

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

        {/* ADD ITEM */}
        <div className="flex gap-2 mb-4">
          <input
            value={itemName}
            onChange={e => setItemName(e.target.value)}
            placeholder="Food item"
            className="border p-2 rounded w-full"
          />
          <button
            onClick={addItem}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Add
          </button>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3">
          <button
            onClick={saveMenu}
            className="bg-green-600 text-white flex-1 py-2 rounded"
          >
            Save Menu
          </button>

          <button
            onClick={deleteMenu}
            className="bg-red-600 text-white flex-1 py-2 rounded"
          >
            Delete Menu
          </button>
        </div>
      </div>
    </div>
  );
}
