import React, { useState } from "react";
import Button, {SelectButton} from "./Button";
import styles from "../styles/modules/app.module.css"
import { useDispatch, useSelector } from "react-redux";
import TodoModel from "./TodoModel";
import { updateFilterStatus } from "../slices/todoSlice";

const AppHeader = () => {
  // using state to handle the different functionality of model such as "open"
  const [modelOpen, setModelOpen] = useState(false);

  // the initial value of the filter we will get it from slice so lets do it
  const filterStatus = useSelector((state) => state.todo.filterStatus);

  const dispatch = useDispatch();
  
  // here is the filter to handle the updated filter
  // update will have the current status of the filter
  // so we will target the value in line 20
  const updateFilter = (e) =>{
    dispatch(updateFilterStatus(e.target.value));
  }

  return (
    <div className={styles.appHeader}>
      {/* here we can use type="button" or if we will not specify the type by default it is button */}
      {/* on clicking the add task the model should open so we use onClick here */}
      <Button variant="primary" onClick= {() => setModelOpen(true)}>Add Task</Button>
      {/* here i have created filter as select and provided all the filters such as "incomplete","complete" */}
      <SelectButton id="status" value= {filterStatus} onChange = {updateFilter}>
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Complete</option>
      </SelectButton>
      {/* using the existing state which is defined in line 8*/}
      <TodoModel type="add" modelOpen={modelOpen} setModelOpen = {setModelOpen}/>
    </div>
  );
};

export default AppHeader;
