// import { createSlice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
// here we are grabing the local storage and using as initialValue for that we have created "getInitialTodo" in line 13
const getInitialTodo = () => {
  // here we will return the todolist but before return we are parsing to jSON
  // the local storage is stored in "todoList" which is initialised in line 14

  const localTodoList = window.localStorage.getItem("todoList");

  // checking the local storage for existing todo item and parsing it in line 12
  if (localTodoList) {
    return JSON.parse(localTodoList);
  }
  // after that if there will not be any existing todo we parse it to empty in line 15
  // after that returning an empty array
  window.localStorage.setItem("todoList", JSON.stringify([]));
  return [];
};

// setting the initial value of "todolist" and "filter" using "getInitialTodo" and "filterStatus" in line 4
const initialValue = {
  filterStatus: 'all',
  todoList: getInitialTodo(),
};

// creating the slice and its reducers
export const todoSlice = createSlice({
  name: "todo",
  initialState: initialValue,
  reducers: {
    // Using arrow function for adding the task and storing it to local storage
    addTodo: (state, action) => {
      // fetching the new task from model in line 25
      state.todoList.push(action.payload);
      // storing it to local storage
      const todoList = window.localStorage.getItem("todoList");

      //   if todolist is present then parsing it in array of task list
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        //  pushing the value to list array in line 41
        todoListArr.push({ ...action.payload });
        // storing the task values to local storage line 43
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
      } else {
        // if not present then
        window.localStorage.setItem(
          "todoList",
          JSON.stringify([{ ...action.payload }])
        );
      }
    },

    // Using arrow function for deleting the task from local storage
    deleteTodo: (state, action) => {
      // fetching the local storage
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        // logic to delete the index item and deleting only one item
        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload) {
            todoListArr.splice(index, 1);
          }
        });
        // after deleting set the local storage
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        // once delete we need to update our initial state
        state.todoList = todoListArr;
      }
    },

    // reducer for updating the todo list
    updateTodo: (state, action) => {
      // fetching todolist as string then parse it to object
      const todoList = window.localStorage.getItem("todoList");
      if (todoList) {
        // here we parse the fetched array and then loop through it
        const todoListArr = JSON.parse(todoList);
        // in loop we will check todolist-id with the action-id everytime then update
        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload.id) {
            todo.title = action.payload.title;
            todo.status = action.payload.status;
          }
        });
        window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
        // here we are updating the redux state
        state.todoList = todoListArr;
      } 
    },
    // creating a reducer to handle the filter update and matching it with the action payload
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    }
  },
});

// exporting all the actions
export const { addTodo, deleteTodo, updateTodo, updateFilterStatus } = todoSlice.actions;

// export the default slice and reducer
export default todoSlice.reducer;
