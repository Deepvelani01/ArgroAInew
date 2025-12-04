import React, { useState } from "react";

const TaskManagement = () => {
  const [farms, setFarms] = useState(["Farm A", "Farm B", "Farm C"]);
  const [showAddFarm, setShowAddFarm] = useState(false);
  const [newFarmName, setNewFarmName] = useState("");

  const [tasks, setTasks] = useState([
    { id: 1, name: "Irrigate Field 1", crop: "Wheat", date: "2025-11-26", status: "Pending", farm: "Farm A" },
    { id: 2, name: "Fertilize Field 2", crop: "Corn", date: "2025-11-27", status: "In Progress", farm: "Farm B" },
    { id: 3, name: "Harvest Field 3", crop: "Rice", date: "2025-11-28", status: "Pending", farm: "Farm C" },
  ]);

  const [newTask, setNewTask] = useState({ name: "", crop: "", date: "", status: "Pending", farm: "" });

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTask, setEditingTask] = useState({ name: "", crop: "", date: "", status: "", farm: "" });

  // Add Farm Function
  const addFarm = () => {
    if (!newFarmName.trim()) return;
    const updatedFarms = [...farms, newFarmName];
    setFarms(updatedFarms);
    setNewTask({ ...newTask, farm: newFarmName });
    setNewFarmName("");
    setShowAddFarm(false);
  };

  // Add Task
  const addTask = () => {
    if (!newTask.name || !newTask.crop || !newTask.date || !newTask.farm) return;

    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    setNewTask({ name: "", crop: "", date: "", status: "Pending", farm: "" });
  };

  // Edit
  const startEdit = (task) => {
    setEditingTaskId(task.id);
    setEditingTask({ ...task });
  };

  const saveEdit = () => {
    setTasks(tasks.map((task) => (task.id === editingTaskId ? editingTask : task)));
    setEditingTaskId(null);
  };

  const cancelEdit = () => setEditingTaskId(null);

  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Task Management</h1>

      {/* Farm Selection Dropdown */}
      <select
        value={newTask.farm}
        onChange={(e) => {
          if (e.target.value === "ADD_FARM") {
            setShowAddFarm(true);
          } else {
            setNewTask({ ...newTask, farm: e.target.value });
          }
        }}
        className="border p-2 rounded flex-1 mb-4"
      >
        <option value="">Select Farm</option>

        {farms.map((farm, idx) => (
          <option key={idx} value={farm}>
            {farm}
          </option>
        ))}

        <option value="ADD_FARM" className="text-blue-600 font-bold">
          + Add New Farm
        </option>
      </select>

      {/* Add New Farm Input Box */}
      {showAddFarm && (
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter Farm Name"
            value={newFarmName}
            onChange={(e) => setNewFarmName(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <button onClick={addFarm} className="bg-green-600 text-white px-4 py-2 rounded">
            Add
          </button>
          <button
            onClick={() => {
              setShowAddFarm(false);
              setNewFarmName("");
            }}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Add Task Form */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6 flex flex-col md:flex-row gap-4 items-end">
        <input
          type="text"
          placeholder="Task Name"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          className="border p-2 rounded flex-1"
        />

        <input
          type="text"
          placeholder="Crop / Field"
          value={newTask.crop}
          onChange={(e) => setNewTask({ ...newTask, crop: e.target.value })}
          className="border p-2 rounded flex-1"
        />

        <input
          type="date"
          value={newTask.date}
          onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
          className="border p-2 rounded"
        />

        <button
          onClick={addTask}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Add Task
        </button>
      </div>

      {/* Task List Table */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2">Farm</th>
              <th className="px-4 py-2">Task</th>
              <th className="px-4 py-2">Crop/Field</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {tasks.map((task) => (
              <tr key={task.id}>
                {/* Farm Column */}
                <td className="px-4 py-2 text-gray-700">
                  {editingTaskId === task.id ? (
                    <select
                      value={editingTask.farm}
                      onChange={(e) => setEditingTask({ ...editingTask, farm: e.target.value })}
                      className="border p-1 rounded"
                    >
                      {farms.map((farm) => (
                        <option key={farm} value={farm}>
                          {farm}
                        </option>
                      ))}
                    </select>
                  ) : (
                    task.farm
                  )}
                </td>

                <td className="px-4 py-2">{editingTaskId === task.id ? (
                  <input
                    type="text"
                    value={editingTask.name}
                    onChange={(e) => setEditingTask({ ...editingTask, name: e.target.value })}
                    className="border p-1 rounded w-full"
                  />
                ) : task.name}</td>

                <td className="px-4 py-2">{editingTaskId === task.id ? (
                  <input
                    type="text"
                    value={editingTask.crop}
                    onChange={(e) => setEditingTask({ ...editingTask, crop: e.target.value })}
                    className="border p-1 rounded w-full"
                  />
                ) : task.crop}</td>

                <td className="px-4 py-2">{editingTaskId === task.id ? (
                  <input
                    type="date"
                    value={editingTask.date}
                    onChange={(e) => setEditingTask({ ...editingTask, date: e.target.value })}
                    className="border p-1 rounded w-full"
                  />
                ) : task.date}</td>

                <td className="px-4 py-2">
                  {editingTaskId === task.id ? (
                    <select
                      value={editingTask.status}
                      onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
                      className="border p-1 rounded"
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        task.status === "Pending"
                          ? "bg-red-500"
                          : task.status === "In Progress"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    >
                      {task.status}
                    </span>
                  )}
                </td>

                <td className="px-4 py-2 space-x-2">
                  {editingTaskId === task.id ? (
                    <>
                      <button onClick={saveEdit} className="bg-green-600 text-white px-3 py-1 rounded">
                        Save
                      </button>
                      <button onClick={cancelEdit} className="bg-gray-400 text-white px-3 py-1 rounded">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(task)} className="bg-blue-600 text-white px-3 py-1 rounded">
                        Edit
                      </button>
                      <button onClick={() => deleteTask(task.id)} className="bg-red-600 text-white px-3 py-1 rounded">
                        Delete
                      </button>
                    </>
                  )}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskManagement;
