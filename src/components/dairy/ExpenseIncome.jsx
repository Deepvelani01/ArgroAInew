import React, { useState, useEffect } from "react";

const ExpenseIncome = ({ autoIncome = [], autoExpense = [] }) => {
  const [manualIncome, setManualIncome] = useState([]);
  const [manualExpense, setManualExpense] = useState([]);

  const [newIncome, setNewIncome] = useState({ title: "", amount: "", date: "" });
  const [newExpense, setNewExpense] = useState({ title: "", amount: "", date: "" });

  // ---- TOTALS ----
  const totalIncome =
    autoIncome.reduce((sum, i) => sum + Number(i.amount || 0), 0) +
    manualIncome.reduce((sum, i) => sum + Number(i.amount || 0), 0);

  const totalExpense =
    autoExpense.reduce((sum, e) => sum + Number(e.amount || 0), 0) +
    manualExpense.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  const profit = totalIncome - totalExpense;

  // ---- ADD MANUAL ENTRIES ----
  const addManualIncome = () => {
    if (!newIncome.title || !newIncome.amount) return;
    setManualIncome([...manualIncome, { ...newIncome, id: Date.now() }]);
    setNewIncome({ title: "", amount: "", date: "" });
  };

  const addManualExpense = () => {
    if (!newExpense.title || !newExpense.amount) return;
    setManualExpense([...manualExpense, { ...newExpense, id: Date.now() }]);
    setNewExpense({ title: "", amount: "", date: "" });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-green-700 mb-6">
        Expense & Income Management
      </h1>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-green-100 rounded shadow">
          <h2 className="text-gray-700 font-medium">Total Income</h2>
          <p className="text-2xl font-bold text-green-800">₹ {totalIncome}</p>
        </div>

        <div className="p-4 bg-red-100 rounded shadow">
          <h2 className="text-gray-700 font-medium">Total Expense</h2>
          <p className="text-2xl font-bold text-red-700">₹ {totalExpense}</p>
        </div>

        <div className="p-4 bg-blue-100 rounded shadow">
          <h2 className="text-gray-700 font-medium">Profit</h2>
          <p className={`text-2xl font-bold ${profit >= 0 ? "text-blue-700" : "text-red-700"}`}>
            ₹ {profit}
          </p>
        </div>
      </div>

      {/* ADD MANUAL INCOME */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-green-700 mb-3">➕ Add Manual Income</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <input
            className="border p-2 rounded"
            placeholder="Income Title"
            value={newIncome.title}
            onChange={(e) => setNewIncome({ ...newIncome, title: e.target.value })}
          />

          <input
            className="border p-2 rounded"
            placeholder="Amount"
            type="number"
            value={newIncome.amount}
            onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
          />

          <input
            className="border p-2 rounded"
            type="date"
            value={newIncome.date}
            onChange={(e) => setNewIncome({ ...newIncome, date: e.target.value })}
          />
        </div>

        <button
          onClick={addManualIncome}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Income
        </button>
      </div>

      {/* ADD MANUAL EXPENSE */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-red-700 mb-3">➖ Add Manual Expense</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <input
            className="border p-2 rounded"
            placeholder="Expense Title"
            value={newExpense.title}
            onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
          />

          <input
            className="border p-2 rounded"
            placeholder="Amount"
            type="number"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
          />

          <input
            className="border p-2 rounded"
            type="date"
            value={newExpense.date}
            onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
          />
        </div>

        <button
          onClick={addManualExpense}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Add Expense
        </button>
      </div>

      {/* AUTO INCOME TABLE */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-green-800 mb-4">Auto Income (Milk Sales, Others)</h2>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Source</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>

          <tbody>
            {autoIncome.map((inc) => (
              <tr key={inc.id}>
                <td className="p-2 border">{inc.source}</td>
                <td className="p-2 border">₹ {inc.amount}</td>
                <td className="p-2 border">{inc.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* AUTO EXPENSE TABLE */}
      <div>
        <h2 className="text-xl font-bold text-red-800 mb-4">Auto Expenses (Feed, Vet, Stock)</h2>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Source</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>

          <tbody>
            {autoExpense.map((exp) => (
              <tr key={exp.id}>
                <td className="p-2 border">{exp.source}</td>
                <td className="p-2 border">₹ {exp.amount}</td>
                <td className="p-2 border">{exp.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default ExpenseIncome;
