import React, { useState } from "react";

const StockManagement = () => {

  // ---------------- STOCK LIST ---------------- //
  const [stock, setStock] = useState([
    { id: 1, name: "Dry Feed", category: "Feed", qty: 50, unit: "kg", price: 20, totalValue: 1000, date: "2025-11-20" },
    { id: 2, name: "Calcium Boost", category: "Supplements", qty: 10, unit: "bottle", price: 120, totalValue: 1200, date: "2025-11-25" },
  ]);

  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    qty: "",
    unit: "kg",
    price: "",
    date: ""
  });

  const addStock = () => {
    if (!newItem.name || !newItem.qty || !newItem.category) return;

    const totalValue = Number(newItem.qty) * Number(newItem.price || 0);

    setStock([
      ...stock,
      { ...newItem, id: Date.now(), totalValue }
    ]);

    setNewItem({ name: "", category: "", qty: "", unit: "kg", price: "", date: "" });
  };

  // ---------------- STOCK USAGE ---------------- //
  const [usage, setUsage] = useState([
    { id: 1, item: "Dry Feed", qtyUsed: 5, unit: "kg", date: "2025-11-26" }
  ]);

  const [useRecord, setUseRecord] = useState({
    item: "",
    qtyUsed: "",
    unit: "",
    date: ""
  });

  const useStock = () => {
    if (!useRecord.item || !useRecord.qtyUsed) return;

    const updatedStock = stock.map(s =>
      s.name === useRecord.item
        ? { ...s, qty: s.qty - Number(useRecord.qtyUsed) }
        : s
    );

    setStock(updatedStock);

    setUsage([
      ...usage,
      { ...useRecord, id: Date.now() }
    ]);

    setUseRecord({ item: "", qtyUsed: "", unit: "", date: "" });
  };

  // ---------------- CURRENT STOCK TOTAL VALUE ---------------- //
  const totalStockValue = stock.reduce((sum, item) => sum + item.totalValue, 0);


  return (
    <div className="space-y-10">

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-blue-100 border-l-4 border-blue-600 rounded">
          <h3 className="text-sm text-gray-600">Total Stock Items</h3>
          <p className="text-2xl font-bold text-blue-700">{stock.length}</p>
        </div>

        <div className="p-4 bg-green-100 border-l-4 border-green-600 rounded">
          <h3 className="text-sm text-gray-600">Total Stock Value</h3>
          <p className="text-2xl font-bold text-green-700">₹{totalStockValue}</p>
        </div>

        <div className="p-4 bg-yellow-100 border-l-4 border-yellow-600 rounded">
          <h3 className="text-sm text-gray-600">Items Low in Stock</h3>
          <p className="text-2xl font-bold text-yellow-700">
            {stock.filter(s => s.qty < 5).length}
          </p>
        </div>
      </div>


      {/* ------------------------------------------------------ */}
      {/* ADD STOCK */}
      {/* ------------------------------------------------------ */}
      <section>
        <h2 className="text-xl font-bold text-green-700 mb-4">Add Stock Item</h2>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-4">

          <input className="border p-2 rounded shadow-sm"
            placeholder="Item Name"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />

          <select className="border p-2 rounded shadow-sm"
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          >
            <option value="">Category</option>
            <option>Feed</option>
            <option>Medicines</option>
            <option>Supplements</option>
            <option>Tools</option>
            <option>Other</option>
          </select>

          <input className="border p-2 rounded shadow-sm"
            placeholder="Quantity"
            value={newItem.qty}
            onChange={(e) => setNewItem({ ...newItem, qty: e.target.value })}
          />

          <select className="border p-2 rounded shadow-sm"
            value={newItem.unit}
            onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
          >
            <option>kg</option>
            <option>liters</option>
            <option>packet</option>
            <option>bottle</option>
            <option>box</option>
          </select>

          <input className="border p-2 rounded shadow-sm"
            placeholder="Price per Unit (₹)"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          />

          <input type="date" className="border p-2 rounded shadow-sm"
            value={newItem.date}
            onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
          />
        </div>

        <button onClick={addStock}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
          Add to Stock
        </button>


        {/* STOCK LIST */}
        <table className="w-full mt-5 border rounded shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Item</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Qty</th>
              <th className="p-2 border">Unit</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Total Value</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>

          <tbody>
            {stock.map(item => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border">{item.category}</td>
                <td className="p-2 border">{item.qty}</td>
                <td className="p-2 border">{item.unit}</td>
                <td className="p-2 border">₹{item.price}</td>
                <td className="p-2 border font-semibold text-green-700">₹{item.totalValue}</td>
                <td className="p-2 border">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>


      {/* ------------------------------------------------------ */}
      {/* STOCK USAGE */}
      {/* ------------------------------------------------------ */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-green-700 mb-4">Stock Usage / Consumption</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">

          <select className="border p-2 rounded shadow-sm"
            value={useRecord.item}
            onChange={(e) => setUseRecord({ ...useRecord, item: e.target.value })}
          >
            <option value="">Select Item</option>
            {stock.map(s => (
              <option key={s.id}>{s.name}</option>
            ))}
          </select>

          <input className="border p-2 rounded shadow-sm"
            placeholder="Qty Used"
            value={useRecord.qtyUsed}
            onChange={(e) => setUseRecord({ ...useRecord, qtyUsed: e.target.value })}
          />

          <input className="border p-2 rounded shadow-sm"
            placeholder="Unit"
            value={useRecord.unit}
            onChange={(e) => setUseRecord({ ...useRecord, unit: e.target.value })}
          />

          <input type="date" className="border p-2 rounded shadow-sm"
            value={useRecord.date}
            onChange={(e) => setUseRecord({ ...useRecord, date: e.target.value })}
          />
        </div>

        <button onClick={useStock}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
          Use Stock
        </button>


        {/* USAGE HISTORY */}
        <table className="w-full mt-5 border rounded shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Item</th>
              <th className="p-2 border">Qty Used</th>
              <th className="p-2 border">Unit</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>

          <tbody>
            {usage.map(u => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="p-2 border">{u.item}</td>
                <td className="p-2 border">{u.qtyUsed}</td>
                <td className="p-2 border">{u.unit}</td>
                <td className="p-2 border">{u.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </section>
    </div>
  );
};

export default StockManagement;
