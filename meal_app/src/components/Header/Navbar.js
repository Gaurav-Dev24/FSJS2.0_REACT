// Navbar Section

// importing react, useState and useEffect

import React, { useState, useEffect } from "react";


// importing Link from react-router-dom
import { Link } from "react-router-dom";
import "./Header.scss";

//importing icons packages from react icons
import { MdFoodBank } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";

// importing useSidebarContext 
import { useSidebarContext } from "../../context/sidebarContext";

const Navbar = () => {
  // importing openSidebar prop from useSidebarContext
  const { openSidebar} = useSidebarContext();
  // using state to handle the scroll
  const [scrolled, setScrolled] = useState(false);

  // using the above state to open and close scroll
  const handleScroll = () =>{
    const offset = window.scrollY;
    if(offset > 60){
      setScrolled(true);
    }else{
      setScrolled(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  })

  return (
    <nav className={`navbar bg-orange flex align-center ${scrolled ? 'scrolled' : ''}`}>
      <div className='container w-100'>
        <div className='navbar-content text-white'>
          <div
            className='brand-and-toggler flex align-center justify-between'
          >
            <Link to="/" className="navbar-brand fw-3 fs-22 flex align-center">
              <MdFoodBank />
              <span className="navbar-brand-text fw-7">DevEat.</span>
            </Link>
            <div className="navbar-btns flex align-center">
              {/* onclick to side bar will open hence used openSider prop from useSidebar Context */}
              <button type="button" className="navbar-show-btn text-white" onClick={() => openSidebar()}>
                <IoMdMenu size={27} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
