import React, { useState } from "react";

export const ExpenseManagement = () => {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      title: "Feed Purchase",
      amount: 3200,
      category: "Feed",
      date: "2025-11-20",
    },
  ]);

  const [record, setRecord] = useState({
    title: "",
    amount: "",
    category: "Feed",
    date: "",
  });

  const addExpense = () => {
    if (!record.title || !record.amount) return;

    setExpenses([...expenses, { ...record, id: Date.now() }]);
    setRecord({
      title: "",
      amount: "",
      category: "Feed",
      date: "",
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-green-700 mb-4">
        Expense Management
      </h2>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <input
          className="border p-2 rounded"
          placeholder="Title"
          value={record.title}
          onChange={(e) =>
            setRecord({ ...record, title: e.target.value })
          }
        />

        <input
          className="border p-2 rounded"
          placeholder="Amount"
          type="number"
          value={record.amount}
          onChange={(e) =>
            setRecord({ ...record, amount: e.target.value })
          }
        />

        <select
          className="border p-2 rounded"
          value={record.category}
          onChange={(e) =>
            setRecord({ ...record, category: e.target.value })
          }
        >
          <option>Feed</option>
          <option>Vet</option>
          <option>Maintenance</option>
          <option>Labor</option>
        </select>

        <input
          type="date"
          className="border p-2 rounded"
          value={record.date}
          onChange={(e) =>
            setRecord({ ...record, date: e.target.value })
          }
        />
      </div>

      {/* Add Button */}
      <button
        onClick={addExpense}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Add Expense
      </button>

      {/* Table */}
      <table className="w-full mt-5 border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((ex) => (
            <tr key={ex.id}>
              <td className="p-2 border">{ex.title}</td>
              <td className="p-2 border">₹{ex.amount}</td>
              <td className="p-2 border">{ex.category}</td>
              <td className="p-2 border">{ex.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
