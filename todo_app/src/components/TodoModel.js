// this the model which holds all the task and it is fixed on the app.js
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { MdOutlineClose } from "react-icons/md";
import { v4 as uuid } from "uuid";
import { addTodo, updateTodo } from "../slices/todoSlice";
import styles from "../styles/modules/modal.module.css";
import Button from "./Button";
import { AnimatePresence, motion } from "framer-motion";

const dropIn = {
  hidden: {
    opacity: 0,
    transform: "scale(0.9)",
  },
  visible: {
    transform: "scale(1)",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: "scale(0.9)",
    opacity: 0,
  },
};

// using the state which has defined in appHeader at line 8 to use open functionality
function TodoModel({ type, modelOpen, setModelOpen, todo }) {
  // creating two states for handling the data inside the "title" and "status" in todomodel
  const [title, setTitle] = useState("");
  //   by default the initial status will be incomplete
  const [status, setStatus] = useState("incomplete");
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "update" && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
    } else {
      setTitle("");
      setStatus("incomplete");
    }
  }, [type, todo, modelOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // checking if the title is empty or not and generating an error message
    if (title === "") {
      toast.error("Please enter a TItle");
      return;
    }
    // adding the reducer addTodo in the model
    // before adding checking the title and status and use dispatch () to use the reducer
    if (title && status) {
      // using uuid package for unique id
      //grabbing the title, status and time of adding the task in line 30,31,32,33
      // disptaching the actions
      // adding it to app content
      if (type === "add") {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            status,
            time: new Date().toLocaleString(),
          })
        );
        // using toast package to show success message
        toast.success("Task Added Succesfully");
      }
      // Updating the new task
      if (type === "update") {
        //checking if the old title and status are same or not if not then update
        if (todo.title !== title || todo.status !== status) {
          //if there is an update then it will catch all the item and also the title and status
          dispatch(
            updateTodo({
              ...todo,
              title,
              status,
            })
          );
          toast.success("Task Updated Succesfully");
        } else {
          toast.error("No Changes are made");
          return;
        }
      }
      // once the task will be added or updated the model should close so we assign its value to false
      setModelOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {/* // if our modelOpen is true then show the below stuff else not */}
      {modelOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* here is the close button which we import from react-icons package and the item name is "md" */}
            {/* whenever we declare button in div we use "tabIndex" to access the button in line 21 */}
            {/* "role" as button to tell system it is a button in line 22 */}
            {/* we are using onclick and onkeydown eventlisteners to open and close the button */}
            <motion.div
              className={styles.closeButton}
              onClick={() => setModelOpen(false)}
              onKeyDown={() => setModelOpen(false)}
              tabIndex={0}
              role="button"
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>

            {/* here is form */}

            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <h1 className={styles.formTitle}>
                {type === "update" ? "Update" : "Add"} Task
              </h1>
              {/* using the title and setTitle states for handling the data in line 40 and 41 */}
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>

              {/* using the status and setStatus states for handling the data in line 51 and 52 */}
              <label htmlFor="status">
                Status
                <select
                  name="status"
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="complete">Complete</option>
                </select>
              </label>

              {/* Add task Button of primary variant */}
              <div className={styles.buttonContainer}>
                <Button type="submit" variant="primary">
                  {/* checking if the type is update then show the button according in todo model */}
                  {type === "update" ? "Update" : "Add"} Task
                </Button>
                {/* on clicking cancel we need to close the model so using onClick here also */}
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setModelOpen(false)}
                  onKeyDown={() => setModelOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TodoModel;
