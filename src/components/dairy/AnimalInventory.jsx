import React, { useState } from "react";

const AnimalInventory = () => {
  const [animals, setAnimals] = useState([
    {
      id: 1,
      tag: "C001",
      breed: "Jersey",
      age: "5 years",
      lactation: 3,
      status: "Milking",
    },
  ]);

  const [newAnimal, setNewAnimal] = useState({
    tag: "",
    breed: "",
    age: "",
    lactation: "",
    status: "Milking",
  });

  const addAnimal = () => {
    if (!newAnimal.tag || !newAnimal.breed) return;
    setAnimals([...animals, { ...newAnimal, id: Date.now() }]);
    setNewAnimal({ tag: "", breed: "", age: "", lactation: "", status: "Milking" });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-green-700 mb-3">Animal Inventory</h2>

      {/* Add Form */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
        <input className="border p-2 rounded" placeholder="Tag ID"
          value={newAnimal.tag}
          onChange={(e) => setNewAnimal({ ...newAnimal, tag: e.target.value })} />

        <input className="border p-2 rounded" placeholder="Breed"
          value={newAnimal.breed}
          onChange={(e) => setNewAnimal({ ...newAnimal, breed: e.target.value })} />

        <input className="border p-2 rounded" placeholder="Age"
          value={newAnimal.age}
          onChange={(e) => setNewAnimal({ ...newAnimal, age: e.target.value })} />

        <input className="border p-2 rounded" placeholder="Lactation No."
          value={newAnimal.lactation}
          onChange={(e) => setNewAnimal({ ...newAnimal, lactation: e.target.value })} />

        <select className="border p-2 rounded"
          value={newAnimal.status}
          onChange={(e) => setNewAnimal({ ...newAnimal, status: e.target.value })}>
          <option>Milking</option>
          <option>Dry</option>
          <option>Pregnant</option>
        </select>
      </div>

      <button
        onClick={addAnimal}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Animal
      </button>

      {/* Table */}
      <table className="w-full mt-5 border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Tag</th>
            <th className="p-2 border">Breed</th>
            <th className="p-2 border">Age</th>
            <th className="p-2 border">Lactation</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((a) => (
            <tr key={a.id}>
              <td className="p-2 border">{a.tag}</td>
              <td className="p-2 border">{a.breed}</td>
              <td className="p-2 border">{a.age}</td>
              <td className="p-2 border">{a.lactation}</td>
              <td className="p-2 border">{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnimalInventory;
