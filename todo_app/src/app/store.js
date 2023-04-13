// we are using react redux for storing the task after save in local storage instead of console log it
// as we have exported the reducer in "todoslice.js" as default in line 53
//so we can name it as per our convenience and here i have named it as "todoReducer"

import todoReducer from "../slices/todoSlice.js"
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        todo: todoReducer,
    },
})