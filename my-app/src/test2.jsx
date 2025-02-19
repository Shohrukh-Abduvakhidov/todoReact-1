import { useState } from "react";
export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Купить молоко" },
    { id: 2, text: "Сделать домашку" },
  ]);
  const [isOpen, setIsOpen] = useState(false); // Состояние
  const [currentTask, setCurrentTask] = useState(null); // Редактируемая задача
  const [inputValue, setInputValue] = useState(""); // Значение ввода
  const openModal = (task = null) => {
    setCurrentTask(task);
    setInputValue(task?.text || "");
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setCurrentTask(null);
    setInputValue("");
  };
  const handleSave = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    if (currentTask) {
      setTasks(
        tasks.map((t) =>
          t.id === currentTask.id ? { ...t, text: inputValue } : t
        )
      );
    } else {
      setTasks([...tasks, { id: Date.now(), text: inputValue }]);
    }
    closeModal();
  };
  const handleDelete = (id) => setTasks(tasks.filter((t) => t.id !== id));
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {" "}
      <h1 className="text-3xl font-bold mb-6">To-Do List</h1>{" "}
      <button
        onClick={() => openModal()}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {" "}
        ➕ Добавить задачу{" "}
      </button>{" "}
      <ul className="w-full max-w-md">
        {" "}
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center bg-white p-3 mb-2 rounded shadow"
          >
            {" "}
            <span>{task.text}</span>{" "}
            <div>
              {" "}
              <button
                onClick={() => openModal(task)}
                className="px-3 py-1 bg-yellow-400 text-white rounded mr-2"
              >
                {" "}
                ✏️{" "}
              </button>{" "}
              <button
                onClick={() => handleDelete(task.id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                {" "}
                🗑️{" "}
              </button>{" "}
            </div>{" "}
          </li>
        ))}{" "}
      </ul>{" "}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          {" "}
          <div className="bg-white p-6 rounded shadow-md">
            {" "}
            <form onSubmit={handleSave} className="flex flex-col">
              {" "}
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                required
                className="border p-2 mb-2"
                placeholder="Введите задачу"
              />{" "}
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                {" "}
                {currentTask ? "💾 Сохранить" : "➕ Добавить"}{" "}
              </button>{" "}
            </form>{" "}
            <button
              onClick={closeModal}
              className="mt-2 px-4 py-2 bg-gray-400 text-white rounded"
            >
              {" "}
              ❌ Отмена{" "}
            </button>{" "}
          </div>{" "}
        </div>
      )}{" "}
    </div>
  );
}
