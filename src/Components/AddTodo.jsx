import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";

function AddTodo({ isAddTodoVisible, toggleAddTodo }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("ongoing");
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();

    
    const newTodo = {
      id: Date.now(), 
      title, 
      text: content, 
      status, 
      priority, 
    };

    
    dispatch(addTodo(newTodo));

    
    setTitle("");
    setContent("");
    setPriority("Low"); 
    setStatus("ongoing");

    
    toggleAddTodo();
  };

  if (!isAddTodoVisible) return null; 

  return (
    <div className="relative p-6 bg-white rounded shadow-md w-full max-w-md mx-auto mt-10 sm:max-w-lg md:max-w-xl lg:max-w-2xl">
      
      <button
        className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        onClick={toggleAddTodo}
      >
        &#x2715;
      </button>

      <form onSubmit={addTodoHandler} className="space-y-4">
        
        <div>
          <label htmlFor="title" className="block text-lg font-medium">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title..."
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

       
        <div>
          <label htmlFor="content" className="block text-lg font-medium">
            Content:
          </label>
          <input
            type="text"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter content..."
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        
        <div>
          <label htmlFor="priority" className="block text-lg font-medium">
            Priority:
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
          </select>
        </div>

        
        <div>
          <label htmlFor="status" className="block text-lg font-medium">
            Status:
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="overdue">Overdue</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        
        <button
          type="submit"
          className="w-full bg-[#FF6767] text-white py-2 px-4 rounded mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Todo
        </button>
      </form>
    </div>
  );
}

export default AddTodo;
