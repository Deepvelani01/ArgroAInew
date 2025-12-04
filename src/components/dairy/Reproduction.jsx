import React, { useState } from "react";


export const Reproduction = () => {
const [records, setRecords] = useState([
{ id: 1, cow: "C001", lastHeat: "2025-11-15", pregnant: true, dryStart: "2025-11-01" }
]);


const [newRecord, setNewRecord] = useState({ cow: "", lastHeat: "", pregnant: false, dryStart: "" });


const addRecord = () => {
if (!newRecord.cow) return;
setRecords([...records, { ...newRecord, id: Date.now() }]);
setNewRecord({ cow: "", lastHeat: "", pregnant: false, dryStart: "" });
};


return (
<div>
<h2 className="text-xl font-bold text-green-700 mb-4">Reproduction & Dry Period</h2>


<div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
<input className="border p-2 rounded" placeholder="Cow Tag" value={newRecord.cow} onChange={(e)=>setNewRecord({...newRecord,cow:e.target.value})} />
<input type="date" className="border p-2 rounded" value={newRecord.lastHeat} onChange={(e)=>setNewRecord({...newRecord,lastHeat:e.target.value})} />
<input type="date" className="border p-2 rounded" value={newRecord.dryStart} onChange={(e)=>setNewRecord({...newRecord,dryStart:e.target.value})} />
<select className="border p-2 rounded" value={newRecord.pregnant} onChange={(e)=>setNewRecord({...newRecord,pregnant:e.target.value === "true"})}>
<option value="false">Not Pregnant</option>
<option value="true">Pregnant</option>
</select>
</div>


<button onClick={addRecord} className="bg-green-600 text-white px-4 py-2 rounded">Add Record</button>


<table className="w-full mt-5 border">
<thead className="bg-gray-100"><tr>
<th className="p-2 border">Cow</th><th className="p-2 border">Last Heat</th>
<th className="p-2 border">Pregnant</th><th className="p-2 border">Dry Start</th>
</tr></thead>
<tbody>
{records.map(r => (
<tr key={r.id}>
<td className="p-2 border">{r.cow}</td>
<td className="p-2 border">{r.lastHeat}</td>
<td className="p-2 border">{r.pregnant ? "Yes" : "No"}</td>
<td className="p-2 border">{r.dryStart}</td>
</tr>
))}
</tbody>
</table>
</div>
);
};