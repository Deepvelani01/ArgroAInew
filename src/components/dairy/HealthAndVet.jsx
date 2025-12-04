import React, { useState } from "react";

const HealthAndVet = () => {
  const [history, setHistory] = useState([
    {
      id: 1,
      cow: "C001",
      issue: "Fever",
      treatment: "Antibiotics",
      vet: "Dr. Mehta",
      cost: 500,
      date: "2025-11-20"
    }
  ]);

  const [record, setRecord] = useState({
    cow: "",
    issue: "",
    treatment: "",
    vet: "",
    cost: "",
    date: ""
  });

  const addHistory = () => {
    if (!record.cow || !record.issue) return;

    setHistory([...history, { ...record, id: Date.now() }]);

    setRecord({
      cow: "",
      issue: "",
      treatment: "",
      vet: "",
      cost: "",
      date: ""
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-green-700 mb-4">
        Veterinary & Health Tracking
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-4">
        <input
          className="border p-2 rounded"
          placeholder="Cow Tag"
          value={record.cow}
          onChange={(e) => setRecord({ ...record, cow: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Issue"
          value={record.issue}
          onChange={(e) => setRecord({ ...record, issue: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Treatment"
          value={record.treatment}
          onChange={(e) => setRecord({ ...record, treatment: e.target.value })}
        />
        <input
          className="border p-2 rounded"
          placeholder="Veterinarian"
          value={record.vet}
          onChange={(e) => setRecord({ ...record, vet: e.target.value })}
        />

        {/* NEW — Cost Field */}
        <input
          className="border p-2 rounded"
          placeholder="Fees / Cost (₹)"
          value={record.cost}
          onChange={(e) => setRecord({ ...record, cost: e.target.value })}
        />

        <input
          type="date"
          className="border p-2 rounded"
          value={record.date}
          onChange={(e) => setRecord({ ...record, date: e.target.value })}
        />
      </div>

      <button
        onClick={addHistory}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Add Record
      </button>

      <table className="w-full mt-5 border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Cow</th>
            <th className="p-2 border">Issue</th>
            <th className="p-2 border">Treatment</th>
            <th className="p-2 border">Vet</th>
            <th className="p-2 border">Cost (₹)</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>

        <tbody>
          {history.map((h) => (
            <tr key={h.id}>
              <td className="p-2 border">{h.cow}</td>
              <td className="p-2 border">{h.issue}</td>
              <td className="p-2 border">{h.treatment}</td>
              <td className="p-2 border">{h.vet}</td>
              <td className="p-2 border">₹{h.cost}</td>
              <td className="p-2 border">{h.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HealthAndVet;
