import React, { useState } from "react";

export const FeedNutrition = () => {
  const [feed, setFeed] = useState([
    { id: 1, type: "Dry Feed", qty: 120, unit: "kg", price: 2400, date: "2025-11-28" }
  ]);

  const [newFeed, setNewFeed] = useState({
    type: "",
    qty: "",
    unit: "kg",
    price: "",
    date: ""
  });

  const addFeed = () => {
    if (!newFeed.type || !newFeed.qty || !newFeed.price) return;

    setFeed([...feed, { ...newFeed, id: Date.now() }]);
    setNewFeed({ type: "", qty: "", unit: "kg", price: "", date: "" });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-green-700 mb-4">
        Feed & Nutrition Tracking
      </h2>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
        <input
          className="border p-2 rounded"
          placeholder="Feed Type"
          value={newFeed.type}
          onChange={(e) => setNewFeed({ ...newFeed, type: e.target.value })}
        />

        <input
          className="border p-2 rounded"
          placeholder="Quantity"
          value={newFeed.qty}
          onChange={(e) => setNewFeed({ ...newFeed, qty: e.target.value })}
        />

        <select
          className="border p-2 rounded"
          value={newFeed.unit}
          onChange={(e) => setNewFeed({ ...newFeed, unit: e.target.value })}
        >
          <option>kg</option>
          <option>liters</option>
          <option>bags</option>
        </select>

        {/* NEW — Price Input */}
        <input
          className="border p-2 rounded"
          placeholder="Price (₹)"
          value={newFeed.price}
          onChange={(e) => setNewFeed({ ...newFeed, price: e.target.value })}
        />

        <input
          type="date"
          className="border p-2 rounded"
          value={newFeed.date}
          onChange={(e) => setNewFeed({ ...newFeed, date: e.target.value })}
        />
      </div>

      <button
        onClick={addFeed}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Add Entry
      </button>

      {/* Table */}
      <table className="w-full mt-5 border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Quantity</th>
            <th className="p-2 border">Unit</th>
            <th className="p-2 border">Price (₹)</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>

        <tbody>
          {feed.map((f) => (
            <tr key={f.id}>
              <td className="p-2 border">{f.type}</td>
              <td className="p-2 border">{f.qty}</td>
              <td className="p-2 border">{f.unit}</td>
              <td className="p-2 border">₹{f.price}</td>
              <td className="p-2 border">{f.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
