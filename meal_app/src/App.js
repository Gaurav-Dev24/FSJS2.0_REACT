import "./App.scss";
// react router dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages
import { Home, MealDetails, Category, Error } from "./pages/index";
// components
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
function App() {
  return (
    // using the components where routing is to be done such as Header and SideBar
    <BrowserRouter>
      <Header />
      <Sidebar/>
      <Routes>
        {/* creating all the navigation link with Routes */}
        <Route path="/" element= {<Home />} />
        <Route path="/meal/:id" element= {<MealDetails />} />
        <Route path="/meal/category/:name" element= {<Category />} />
        <Route path="*" element= {<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
