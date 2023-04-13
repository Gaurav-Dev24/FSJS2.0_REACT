import { format } from "date-fns/esm";
import React, { useEffect, useState } from "react";
import styles from "../styles/modules/todoItem.module.css";
import { getClasses } from "../utils/getClasses";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../slices/todoSlice";
import { toast } from "react-hot-toast";
import TodoModel from "./TodoModel";
import CheckButton from "./CheckButton";
import { motion } from 'framer-motion'

const child ={
  hidden: { y: 20, opacity: 0},
  visible: {
    y:0,
    opacity: 1,
  }
};


const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  // declaring a state for handling the check box
  const [checked, setChecked] = useState(false);
  //creating a state to handle the update and using it in TodoModel in line 75
  const [upadateModelOpen, setUpdateModelOpen] = useState(false);

  useEffect(() =>{
    //checking if the status will be complete the checked else unchecked
    if(todo.status === 'complete'){
      setChecked(true);
    }else{
      setChecked(false);
    }
  },[todo.status]);

  // function to delete items declared as reducer
  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success("Todo item deleted succesfully");
  };

  // function to update items declared as reducer
  const handleUpadate = () => {
    // here we set model open function so that if we click on edit button it will open
    setUpdateModelOpen(true);
  };

  const handleCheck = () => {
    setChecked(!checked);
    // here we are handling the status of todo once we click on checkbox the status will automatically changed to completed
    // getting the state from our updateTodo
    dispatch(updateTodo({
      ...todo,
      status: checked ? 'incomplete' : 'complete' 
    }));
    
  };
  return (
    <>
      {/* main div for list of todo */}
      <motion.div className={styles.item} variants={child}>
        {/* todo list details */}
        <div className={styles.todoDetails}>
          <CheckButton checked={checked} handleCheck={handleCheck} />



          <div className={styles.texts}>
            {/* using our utility which getClsses for multiple styles */}
            {/* if the status of the item is complete we pass it or else we will not pass it -- line 18 */}
            <p
              className={getClasses([
                styles.todoText,
                todo.status === "complete" && styles["todoText--completed"],
              ])}
            >
              {todo.title}
            </p>
            {/* showing the time of task */}
            <p className={styles.time}>
              {/* Setting the desired format of date using the package "date-fns/ems" */}
              {format(new Date(todo.time), "p, MM/dd/yyyy")};
            </p>
          </div>
        </div>
        {/* Here are the actions such as edit and delete */}
        {/* We are using the package react-icon for the edit and delete options */}
        <div className={styles.todoActions}>
          <div
            className={styles.icon}
            onClick={handleDelete}
            onKeyDown={handleDelete}
            role="button"
            tabIndex={0}
          >
            <MdDelete />
          </div>
          <div
            className={styles.icon}
            onClick={handleUpadate}
            onKeyDown={handleUpadate}
            role="button"
            tabIndex={0}
          >
            <MdEdit />
          </div>
        </div>
      </motion.div>

      <TodoModel
        // so here detemining the type as update so that the model will show it accordingly
        type="update"
        todo={todo}
        modelOpen={upadateModelOpen}
        setModelOpen={setUpdateModelOpen}
      />
    </>
  );
};

export default TodoItem;
