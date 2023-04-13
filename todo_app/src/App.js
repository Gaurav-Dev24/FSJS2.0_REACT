import React from "react";
import PageTitle from "./components/PageTitle";
import AppHeader from "./components/AppHeader";
import AppContent from "./components/AppContent";
import TodoModel from "./components/TodoModel";
import styles from "./styles/modules/app.module.css";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      {/* App main container */}
      <div className="container">
        {/* App title */}
        <PageTitle>TODO LIST</PageTitle>
        {/* hero section */}
        <div className={styles.app_wrapper}>
          <AppHeader />
          <AppContent />
          {/* Fixed model to show all the tasks of todo list */}
          <TodoModel />
        </div>
      </div>
      <Toaster
        position= "bottom-right"
        toastOptions={{
          style: {
            fontSize: "1.4rem",
          },
        }}
      />
    </>
  );
}

export default App;
