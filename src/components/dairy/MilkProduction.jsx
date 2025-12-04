import React, { useState } from "react";


export const MilkProduction = () => {
const [records, setRecords] = useState([
{ id: 1, date: "2025-11-28", cow: "C001", morning: 8, evening: 7 }
]);


const [newRecord, setNewRecord] = useState({ date: "", cow: "", morning: "", evening: "" });


const addRecord = () => {
if (!newRecord.date || !newRecord.cow) return;
setRecords([...records, { ...newRecord, id: Date.now() }]);
setNewRecord({ date: "", cow: "", morning: "", evening: "" });
};


return (
<div>
<h2 className="text-xl font-bold text-green-700 mb-4">Milk Production</h2>


<div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
<input type="date" className="border p-2 rounded" value={newRecord.date} onChange={(e)=>setNewRecord({...newRecord,date:e.target.value})} />
<input className="border p-2 rounded" placeholder="Cow Tag" value={newRecord.cow} onChange={(e)=>setNewRecord({...newRecord,cow:e.target.value})} />
<input className="border p-2 rounded" placeholder="Morning Liters" value={newRecord.morning} onChange={(e)=>setNewRecord({...newRecord,morning:e.target.value})} />
<input className="border p-2 rounded" placeholder="Evening Liters" value={newRecord.evening} onChange={(e)=>setNewRecord({...newRecord,evening:e.target.value})} />
</div>


<button onClick={addRecord} className="bg-green-600 text-white px-4 py-2 rounded">Add Record</button>


<table className="w-full mt-5 border">
<thead className="bg-gray-100"><tr>
<th className="p-2 border">Date</th><th className="p-2 border">Cow</th>
<th className="p-2 border">Morning</th><th className="p-2 border">Evening</th><th className="p-2 border">Total</th>
</tr></thead>
<tbody>
{records.map(r => (
<tr key={r.id}>
<td className="p-2 border">{r.date}</td>
<td className="p-2 border">{r.cow}</td>
<td className="p-2 border">{r.morning}</td>
<td className="p-2 border">{r.evening}</td>
<td className="p-2 border font-bold">{Number(r.morning) + Number(r.evening)}</td>
</tr>
))}
</tbody>
</table>
</div>
);
};