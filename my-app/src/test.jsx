import React, { useState } from "react";

const App = () => {
  let data = [
    {
      id: 1,
      name: "Shohrukh",
      age: 16,
      status: false,
    },
    {
      id: 2,
      name: "Ali",
      age: 18,
      status: false,
    },
    {
      id: 3,
      name: "Aub",
      age: 18,
      status: false,
    },
    {
      id: 4,
      name: "Haidar",
      age: 19,
      status: true,
    },
  ];
  const [users, setUsers] = useState(data);
  function deleteUSer(id) {
    setUsers(users.filter((user) => user.id != id));
  }
  return (
    <>
      <div className="flex flex-wrap gap-10">
        {users.length > 0 &&
          users.map((user) => {
            return (
              <div className="border-2 w-[400px] m-auto" key={user.id}>
                <h1 className="text-[35px]">{user.name}</h1>
                <p className="">{user.age}</p>
                <div className="">{user.status ? "Active" : "Inactive"}</div>
                <button
                  className="border-2-black cursor-pointer bg-[red]  p-2 text-[#fff]"
                  onClick={() => deleteUSer(user.id)}
                >
                  delete
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default App;
