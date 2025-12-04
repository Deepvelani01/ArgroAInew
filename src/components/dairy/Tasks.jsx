import { useState } from "react";

 const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    priority: "",
    dueDate: "",
    assignedTo: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addTask = () => {
    if (!formData.title) return alert("Task title is required");

    setTasks([...tasks, { ...formData, id: Date.now(), completed: false }]);
    setFormData({
      title: "",
      category: "",
      priority: "",
      dueDate: "",
      assignedTo: "",
      notes: "",
    });
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const totalTasks = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = totalTasks - completed;

  return (
    <div className="space-y-6 p-5">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded-xl shadow">
          <h2 className="text-lg font-bold">Total Tasks</h2>
          <p className="text-2xl">{totalTasks}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-xl shadow">
          <h2 className="text-lg font-bold">Completed</h2>
          <p className="text-2xl">{completed}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-xl shadow">
          <h2 className="text-lg font-bold">Pending</h2>
          <p className="text-2xl">{pending}</p>
        </div>
      </div>

      {/* Add Task Form */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-3">Add New Task</h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Category</option>
            <option>Feeding</option>
            <option>Cleaning</option>
            <option>Health Check</option>
            <option>Milking</option>
            <option>Inventory</option>
            <option>Other</option>
          </select>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Priority</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="assignedTo"
            placeholder="Assigned To"
            value={formData.assignedTo}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        <textarea
          name="notes"
          placeholder="Notes (optional)"
          value={formData.notes}
          onChange={handleChange}
          className="border p-2 w-full rounded mt-3"
        ></textarea>

        <button
          onClick={addTask}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Add Task
        </button>
      </div>

      {/* Task List */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-3">Task List</h2>

        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks added yet.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between border-b py-2"
            >
              <div>
                <h3 className={`font-bold ${task.completed ? "line-through" : ""}`}>
                  {task.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {task.category} • {task.priority} • Due: {task.dueDate || "N/A"}
                </p>
              </div>

              <div className="space-x-2">
                <button
                  onClick={() => toggleComplete(task.id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  {task.completed ? "Undo" : "Done"}
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default Tasks
