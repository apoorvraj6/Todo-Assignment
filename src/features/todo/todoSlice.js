import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    { id: 1, title: "Complete Assignment", text: "Complete the react assignment", status: "Overdue", priority: "Low" },
    { id: 2, title: "Create Repository", text: "Create the repository on the github and push all code to github", status: "completed", priority: "high" },
    { id: 3, title: "Submit the Assignment", text: "Submit the assignment as per the requirments", status: "ongoing", priority: "moderate" }
    
  ],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, updatedFields } = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        state.todos[todoIndex] = { ...state.todos[todoIndex], ...updatedFields };
      }
    },
    updateTodoList: (state, action) => {
     
      state.todos = action.payload;
    },
  },
});

export const { addTodo, removeTodo, updateTodo, updateTodoList } = todoSlice.actions;
export default todoSlice.reducer;
