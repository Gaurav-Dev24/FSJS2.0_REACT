import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//importing SidebarProvider
import { SidebarProvider } from './context/sidebarContext';
//importing MealProvider
import { MealProvider } from './context/mealContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SidebarProvider>
    <MealProvider>
      <App />
    </MealProvider>
  </SidebarProvider>
  
);



