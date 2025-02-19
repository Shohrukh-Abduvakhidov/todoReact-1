import React, { useState, useRef } from "react";
import "./App.css";

const App = () => {
  const data = [
    { id: 1, name: "John Doe", age: 25, status: true, city: "New York" },
    { id: 2, name: "Jane Smith", age: 30, status: false, city: "Los Angeles" },
    { id: 3, name: "Mike Johnson", age: 35, status: true, city: "Chicago" },
    { id: 4, name: "Emily Davis", age: 28, status: false, city: "Houston" },
    { id: 5, name: "David Wilson", age: 32, status: true, city: "Miami" },
    { id: 6, name: "Sarah Thompson", age: 27, status: true, city: "Seattle" },
    {
      id: 7,
      name: "Michael Brown",
      age: 29,
      status: false,
      city: "San Francisco",
    },
    { id: 8, name: "Jessica Martinez", age: 31, status: true, city: "Dallas" },
    { id: 9, name: "Daniel Anderson", age: 33, status: false, city: "Denver" },
    { id: 10, name: "Olivia Taylor", age: 26, status: true, city: "Boston" },
  ];

  const [users, setUsers] = useState(data);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [editUser, setEditUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const AddModal = useRef(null);
  const EditModal = useRef(null);

  const openAddModal = () => AddModal.current.showModal();
  const closeAddModal = () => AddModal.current.close();
  const openEditModal = () => EditModal.current.showModal();
  const closeEditModal = () => EditModal.current.close();

  function deleteUser(id) {
    setUsers(users.filter((user) => user.id !== id));
  }

  function checkUser(id) {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: !user.status } : user
      )
    );
  }

  function handleAddUser(event) {
    event.preventDefault();
    const newUser = {
      id: new Date().getTime(),
      name,
      age,
      status: false,
      city,
    };
    setUsers([...users, newUser]);
    setName("");
    setAge("");
    setCity("");
    closeAddModal();
  }

  function handleEditUser(event) {
    event.preventDefault();
    const updatedUsers = users.map((user) =>
      user.id === editUser.id
        ? {
            ...user,
            name: editUser.name,
            age: editUser.age,
            city: editUser.city,
          }
        : user
    );
    setUsers(updatedUsers);
    setEditUser(null);
    closeEditModal();
  }

  function editUserF(user) {
    setEditUser(user);
    openEditModal();
  }
  const filteredData = users.filter((el) =>
    JSON.stringify(el).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="w-[90%] m-auto bg-gray-800 h-[80px] py-[20px] flex justify-between">
        <div className="flex gap-[20px] items-center">
          <input
            type="search"
            placeholder="Search note..."
            className="py-[10px] px-[20px] bg-[#fff] mx-[10px] rounded-2xl"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select className="bg-white py-2 px-5 cursor-pointer">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button className="border-2 bg-white mx-5 px-5" onClick={openAddModal}>
          + Add New
        </button>
      </div>

      <table className="w-[90%] m-auto text-center">
        <thead>
          <tr className="border-b-2 py-[20px]">
            <th>Name</th>
            <th>Age</th>
            <th>Status</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <h1 className="absolute top-[50%] left-[35%] text-[red] font-bold text-[80px]">
              Not Found
            </h1>
          ) : (
            filteredData.map((user) => (
              <tr key={user.id} className="border-b-2 py-[10px]">
                <td className="py-[10px]">
                  <h1 className="font-bold">{user.name}</h1>
                </td>
                <td className="w-[100px]">
                  <h1>{user.age}</h1>
                </td>
                <td className="w-[50px]">
                  <h1 className={user.status ? "active" : "inactive"}>
                    {user.status ? "Active" : "Inactive"}
                  </h1>
                </td>
                <td>
                  <h1 className="font-bold">{user.city}</h1>
                </td>
                <td className="w-[200px]">
                  <div className="flex gap-[20px] items-center">
                    <button
                      className="bg-red-600 text-white p-2 rounded-xl cursor-pointer"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="bg-yellow-600 text-white p-2 rounded-xl cursor-pointer"
                      onClick={() => editUserF(user)}
                    >
                      Edit
                    </button>
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      checked={user.status}
                      onChange={() => checkUser(user.id)}
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <dialog className="w-[550px] h-[300px] py-[10px] m-auto" ref={AddModal}>
        <form
          onSubmit={handleAddUser}
          className="flex flex-col items-center gap-[40px]"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 rounded-xl py-1 px-5"
            placeholder="Name..."
          />
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="border-2 rounded-xl py-1 px-5"
            placeholder="Age..."
          />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border-2 rounded-xl py-1 px-5"
            placeholder="City..."
          />
          <button
            type="submit"
            className="border-2 rounded-[10px] py-1 px-5 cursor-pointer"
          >
            Save
          </button>
        </form>
      </dialog>

      <dialog className="w-[550px] h-[300px] py-[10px] m-auto" ref={EditModal}>
        <form
          onSubmit={handleEditUser}
          className="flex flex-col items-center gap-[40px]"
        >
          <input
            type="text"
            value={editUser?.name}
            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
            className="border-2 rounded-xl py-1 px-5"
            placeholder="Name..."
          />
          <input
            type="number"
            value={editUser?.age}
            onChange={(e) => setEditUser({ ...editUser, age: e.target.value })}
            className="border-2 rounded-xl py-1 px-5"
            placeholder="Age..."
          />
          <input
            type="text"
            value={editUser?.city}
            onChange={(e) => setEditUser({ ...editUser, city: e.target.value })}
            className="border-2 rounded-xl py-1 px-5"
            placeholder="City..."
          />
          <button
            type="submit"
            className="border-2 rounded-[10px] py-1 px-5 cursor-pointer"
          >
            Save
          </button>
        </form>
      </dialog>
    </>
  );
};

export default App;
