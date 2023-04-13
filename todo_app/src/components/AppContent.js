// this component will render all the list of todo

import React from "react";
// here I am using useSelector of redux to get the states of todolist to show all the list of todo in line 8
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import styles from "../styles/modules/app.module.css";
import { AnimatePresence, motion } from "framer-motion";

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const AppContent = () => {
  const todoList = useSelector((state) => state.todo.todoList);
  const filterStatus = useSelector((state) => state.todo.filterStatus);

  //capturing the list of todo using rest and then sorting it with time period in line 11
  const sortedTodoList = [...todoList];
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time));

  // Changing the app content on the basis of filter
  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === "all") {
      return true;
    }
    return item.status === filterStatus;
  });

  return (
    // here we check whether there is existing todo items are there or not
    // once we check we map all the list of todo to sortedTodoList and show it below as a list
    <motion.div
      className={styles.content__wrapper}
      vcariants={container}
      initial="hidden"
      animate="visible"
      >
      <AnimatePresence>

      {filteredTodoList && filteredTodoList.length > 0 ? (
        filteredTodoList.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        ) : (
          <motion.p className={styles.emptyText} variants={child}>
          No Todo Found
        </motion.p>
      )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AppContent;
