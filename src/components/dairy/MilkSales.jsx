import React, { useState } from "react";

export const MilkSales = () => {

  // ---------------- DAILY MILK ENTRY ---------------- //
  const [milkEntries, setMilkEntries] = useState([
    { id: 1, cow: "C001", morning: 5, evening: 4, total: 9, date: "2025-11-28" }
  ]);

  const [milkRecord, setMilkRecord] = useState({
    cow: "", morning: "", evening: "", total: 0, date: ""
  });

  const addMilkEntry = () => {
    if (!milkRecord.cow || !milkRecord.date) return;

    const total = Number(milkRecord.morning || 0) + Number(milkRecord.evening || 0);

    setMilkEntries([
      ...milkEntries,
      { ...milkRecord, id: Date.now(), total }
    ]);

    setMilkRecord({ cow: "", morning: "", evening: "", total: 0, date: "" });
  };

  // ---------------- BUYER LIST ---------------- //
  const [buyers, setBuyers] = useState([
    { id: 1, name: "Local Dairy", defaultRate: 38 }
  ]);

  const [buyerRecord, setBuyerRecord] = useState({ name: "", defaultRate: "" });

  const addBuyer = () => {
    if (!buyerRecord.name) return;
    setBuyers([...buyers, { ...buyerRecord, id: Date.now() }]);
    setBuyerRecord({ name: "", defaultRate: "" });
  };

  // ---------------- MILK SALES ENTRY ---------------- //
  const [sales, setSales] = useState([
    { id: 1, buyer: "Local Dairy", quantity: 8, rate: 38, amount: 304, date: "2025-11-28" }
  ]);

  const [saleRecord, setSaleRecord] = useState({
    buyer: "", quantity: "", rate: "", amount: 0, date: ""
  });

  const handleBuyerSelect = (buyerName) => {
    const buyer = buyers.find(b => b.name === buyerName);
    setSaleRecord({
      ...saleRecord,
      buyer: buyerName,
      rate: buyer ? buyer.defaultRate : ""
    });
  };

  const addSale = () => {
    if (!saleRecord.buyer || !saleRecord.quantity) return;

    const amount = Number(saleRecord.quantity) * Number(saleRecord.rate);

    setSales([
      ...sales,
      { ...saleRecord, id: Date.now(), amount }
    ]);

    setSaleRecord({ buyer: "", quantity: "", rate: "", amount: 0, date: "" });
  };

  // ---------------- SUMMARY TOTALS ---------------- //
  const totalMilkProduced = milkEntries.reduce((s, e) => s + Number(e.total), 0);
  const totalMilkSold = sales.reduce((s, e) => s + Number(e.quantity), 0);
  const remainingMilk = totalMilkProduced - totalMilkSold;

  return (
    <div className="space-y-10">

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-green-100 border-l-4 border-green-600 rounded">
          <h3 className="text-sm text-gray-600">Total Milk Produced</h3>
          <p className="text-2xl font-bold text-green-700">{totalMilkProduced} L</p>
        </div>

        <div className="p-4 bg-blue-100 border-l-4 border-blue-600 rounded">
          <h3 className="text-sm text-gray-600">Total Milk Sold</h3>
          <p className="text-2xl font-bold text-blue-700">{totalMilkSold} L</p>
        </div>

        <div className="p-4 bg-yellow-100 border-l-4 border-yellow-600 rounded">
          <h3 className="text-sm text-gray-600">Remaining Milk</h3>
          <p className="text-2xl font-bold text-yellow-700">{remainingMilk} L</p>
        </div>
      </div>

      {/* DAILY MILK ENTRY
      <section>
        <h2 className="text-xl font-bold text-green-700 mb-4">Daily Milk Collection</h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
          <input className="border p-2 rounded shadow-sm" placeholder="Cow Tag"
            value={milkRecord.cow}
            onChange={(e) => setMilkRecord({ ...milkRecord, cow: e.target.value })}
          />

          <input className="border p-2 rounded shadow-sm" placeholder="Morning (L)"
            value={milkRecord.morning}
            onChange={(e) => setMilkRecord({ ...milkRecord, morning: e.target.value })}
          />

          <input className="border p-2 rounded shadow-sm" placeholder="Evening (L)"
            value={milkRecord.evening}
            onChange={(e) => setMilkRecord({ ...milkRecord, evening: e.target.value })}
          />

          <input type="date" className="border p-2 rounded shadow-sm"
            value={milkRecord.date}
            onChange={(e) => setMilkRecord({ ...milkRecord, date: e.target.value })}
          />

          <button onClick={addMilkEntry} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            Add Entry
          </button>
        </div>

        <table className="w-full border rounded shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Cow</th>
              <th className="p-2 border">Morning</th>
              <th className="p-2 border">Evening</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {milkEntries.map(m => (
              <tr key={m.id} className="hover:bg-gray-50">
                <td className="p-2 border">{m.cow}</td>
                <td className="p-2 border">{m.morning}</td>
                <td className="p-2 border">{m.evening}</td>
                <td className="p-2 border font-semibold">{m.total}</td>
                <td className="p-2 border">{m.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section> */}

      {/* BUYER LIST */}
      <section>
        <h2 className="text-xl font-bold text-green-700 mb-4">Milk Buyers</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <input className="border p-2 rounded shadow-sm" placeholder="Buyer Name"
            value={buyerRecord.name}
            onChange={(e) => setBuyerRecord({ ...buyerRecord, name: e.target.value })}
          />

          <input className="border p-2 rounded shadow-sm" placeholder="Default Rate (₹/L)"
            value={buyerRecord.defaultRate}
            onChange={(e) => setBuyerRecord({ ...buyerRecord, defaultRate: e.target.value })}
          />

          <button onClick={addBuyer} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            Add Buyer
          </button>
        </div>

        <table className="w-full border rounded shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Rate (₹/L)</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map(b => (
              <tr key={b.id} className="hover:bg-gray-50">
                <td className="p-2 border">{b.name}</td>
                <td className="p-2 border">₹{b.defaultRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* MILK SALES ENTRY */}
      <section>
        <h2 className="text-xl font-bold text-green-700 mb-4">Milk Sales</h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
          <select className="border p-2 rounded shadow-sm"
            value={saleRecord.buyer}
            onChange={(e) => handleBuyerSelect(e.target.value)}
          >
            <option value="">Select Buyer</option>
            {buyers.map(b => (
              <option key={b.id}>{b.name}</option>
            ))}
          </select>

          <input className="border p-2 rounded shadow-sm" placeholder="Quantity (L)"
            value={saleRecord.quantity}
            onChange={(e) => setSaleRecord({ ...saleRecord, quantity: e.target.value })}
          />

          <input className="border p-2 rounded shadow-sm" placeholder="Rate (₹)"
            value={saleRecord.rate}
            onChange={(e) => setSaleRecord({ ...saleRecord, rate: e.target.value })}
          />

          <input type="date" className="border p-2 rounded shadow-sm"
            value={saleRecord.date}
            onChange={(e) => setSaleRecord({ ...saleRecord, date: e.target.value })}
          />

          <button onClick={addSale} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
            Sell Milk
          </button>
        </div>

        <table className="w-full border rounded shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Buyer</th>
              <th className="p-2 border">Qty (L)</th>
              <th className="p-2 border">Rate (₹)</th>
              <th className="p-2 border">Amount (₹)</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {sales.map(s => (
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="p-2 border">{s.buyer}</td>
                <td className="p-2 border">{s.quantity}</td>
                <td className="p-2 border">₹{s.rate}</td>
                <td className="p-2 border font-semibold text-green-700">₹{s.amount}</td>
                <td className="p-2 border">{s.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

    </div>
  );
};

export default MilkSales;
