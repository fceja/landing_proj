import "../css/components/HamburgerMenu.css";

import React, { useState, useEffect, useRef } from "react";

const HamburgerMenu = () => {
  /* state variables */
  const [burgerClass, setBurgerClass] = useState("hamburger-bar unclicked");
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const [menuClass, setMenuClass] = useState("menu hidden");
  const menuRef = useRef(null);

  /* handles closure of menu if clicked outside menu container */
  const handleClickOutsideMenu = (event) => {
    if (
      isMenuClicked &&
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      event.target.className !==
        "hamburger-menu-bar-container" /* exclude since handled in onClick */ &&
      event.target.className !==
        "hamburger-bar clicked" /* exclude since handled in onClick */
    ) {
      updateMenuVisibility();
    }
  };

  /* adds click listener if hamburger menu is opened */
  useEffect(() => {
    if (isMenuClicked) {
      document.addEventListener("click", handleClickOutsideMenu, true);
    } else {
      document.removeEventListener("click", handleClickOutsideMenu, true);
    }
  });

  /* update hamburger menu visibility */
  const updateMenuVisibility = () => {
    if (!isMenuClicked) {
      /* make visible */
      setBurgerClass("hamburger-bar clicked");
      setMenuClass("menu visible");
    } else {
      /* hide */
      setBurgerClass("hamburger-bar unclicked");
      setMenuClass("menu hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  };

  return (
    <>
      <div className="hamburger-menu-container">
        <div
          className="hamburger-menu-bar-container"
          onClick={updateMenuVisibility}
        >
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
          <div className={burgerClass}></div>
        </div>
      </div>
      <div className={menuClass} ref={menuRef}></div>
    </>
  );
};

export default HamburgerMenu;
