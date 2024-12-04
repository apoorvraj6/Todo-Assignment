import React, { useState } from "react";
import Todo from "../Components/Todo";
import AddTodo from "../Components/AddTodo";
import add_icon from "../assets/add_icon.png";

function Dashboard() {
  const [isAddTodoVisible, setIsAddTodoVisible] = useState(false);

  const toggleAddTodo = () => {
    setIsAddTodoVisible(!isAddTodoVisible);
  };

  return (
    <div>
      <p>
        <span className="text-4xl font-bold pr-2">Welcome</span>{" "}
        <span className="text-[#FF6767] font-bold text-4xl">Back</span>
      </p>

      <div className="w-5/6 border-2 border-gray-500 h-full ml-9 mt-8 relative">
        <div className="flex flex-row justify-between align-middle">
          <p className="ml-6 mt-7">
            <span className="text-2xl font-semibold">To</span>
            <span className="text-2xl text-[#FF6767] font-extrabold">-</span>
            <span className="text-2xl font-semibold">Do</span>
          </p>
          <div
            className="flex mr-6 mt-7 bg-[#FF6767] px-4 py-2 rounded-md cursor-pointer"
            onClick={toggleAddTodo}
          >
            <img src={add_icon} alt="add_icon" className="h-6 w-6" />
            <span>Add Task</span>
          </div>
        </div>

        <Todo />

        {isAddTodoVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
              <button
                onClick={toggleAddTodo}
                className="text-gray-500 hover:text-gray-700 absolute top-4 right-4 text-xl"
              >
                ✕
              </button>
              
              <AddTodo isAddTodoVisible={isAddTodoVisible} toggleAddTodo={toggleAddTodo} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
