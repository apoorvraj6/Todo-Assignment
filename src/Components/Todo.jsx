import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateTodo, updateTodoList } from "../features/todo/todoSlice";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import edit_icon from "../assets/edit_icon.png";
import delete_icon from "../assets/delete_icon.png";

function Todo() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [filter, setFilter] = useState("All"); 

  const handleEdit = (todo) => {
    setCurrentTodo(todo);
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(updateTodo({ id: currentTodo.id, updatedFields: currentTodo }));
    setIsEditing(false);
    setCurrentTodo(null);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return; 

    const reorderedTodos = Array.from(todos);
    const [removed] = reorderedTodos.splice(result.source.index, 1);
    reorderedTodos.splice(result.destination.index, 0, removed);

   
    dispatch(updateTodoList(reorderedTodos)); 
  };

  const handleDelete = (todo) => {
    setTodoToDelete(todo);
    setShowConfirmDelete(true);
  };

  const confirmDelete = () => {
    dispatch(removeTodo(todoToDelete.id));
    setShowConfirmDelete(false);
    setTodoToDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
    setTodoToDelete(null);
  };

  
  const filteredTodos = todos.filter((todo) => {
    if (filter === "All") return true;
    if (filter === "Completed" && todo.status.toLowerCase() === "completed") return true;
    if (filter === "Ongoing" && todo.status.toLowerCase() === "ongoing") return true;
    if (filter === "Overdue" && todo.status.toLowerCase() === "overdue") return true;
    return false;
  });

  return (
    <>
      <div className="flex justify-end mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)} 
          className="border border-gray-300 rounded px-3 py-2 m-5 "
        >
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Overdue">Overdue</option>
        </select>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <ul
              className="list-none"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {filteredTodos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                  {(provided) => (
                    <li
                      className="mt-4 flex justify-between items-center bg-white px-4 py-2 rounded border-2 border-gray-400 m-10 shadow-2xl"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="flex flex-col ">
                        <div className="text-black text-2xl font-bold">{todo.title}</div>
                        <p className="text-lg font-md my-3 text-[#5d5e61]">{todo.text}</p>
                        <div className="flex flex-row justify-start">
                          <p
                            className={`${todo.priority.toLowerCase() === "low"
                                ? "text-green-400 mr-20"
                                : todo.priority.toLowerCase() === "moderate"
                                  ? "text-blue-400 mr-20"
                                  : "text-red-500 mr-20"
                              }`}
                          >
                            <span className="text-black">Priority:</span> {todo.priority}
                          </p>
                          <p
                            className={`${todo.status.toLowerCase() === "overdue"
                                ? "text-red-500"
                                : todo.status.toLowerCase() === "completed"
                                  ? "text-green-500"
                                  : "text-blue-500"
                              }`}
                          >
                            <span className="text-black">Status:</span> {todo.status}
                          </p>
                        </div>

                        <div className="flex md:flex-row my-6 gap-5">
                          <button
                            onClick={() => handleDelete(todo)}
                            className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                          >
                            <img src={delete_icon} alt="delete" className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleEdit(todo)}
                            className="bg-green-500 px-4 py-2 rounded-md"
                          >
                            <img src={edit_icon} alt="edit_icon" className="h-4 w-4" />
                          </button>
                        </div>


                      </div>


                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      {isEditing && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Todo</h2>

            <div className="mb-4">
              <label className="block mb-1">Title</label>
              <input
                type="text"
                value={currentTodo.title}
                onChange={(e) => setCurrentTodo({ ...currentTodo, title: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Text</label>
              <input
                type="text"
                value={currentTodo.text}
                onChange={(e) => setCurrentTodo({ ...currentTodo, text: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Priority</label>
              <select
                value={currentTodo.priority}
                onChange={(e) => setCurrentTodo({ ...currentTodo, priority: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              >
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Status</label>
              <select
                value={currentTodo.status}
                onChange={(e) => setCurrentTodo({ ...currentTodo, status: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              >
                <option value="overdue">Overdue</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-[#FF6767] text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmDelete && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Are you sure you want to delete this todo?</h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Todo;
