"use client";

import React, { useState } from "react";
import logo from "../../images/logo.svg";
import Link from "next/link";
import menuOpenIcon from "../../images/icon-menu.svg"
import menuCloseIcon from "../../images/icon-menu-close.svg"

export default function Navbar() {
  const [open, setOpen] = useState(false);

  function handleClick() {
    setOpen(!open);
  }

  function handleMenuClose() {
    setOpen(!open)
  }

  const menuIcon = open ? menuCloseIcon : menuOpenIcon;

  return (
    <>
      <nav className="  mx-auto ">
        <div className=" flex justify-around items-center">
          <header className="header-logo p-2">
            <Link href="/">
              <img src={logo.src} className="logo w-16 " alt="LogoIcon" />
            </Link>
            
          </header>

          <button onClick={handleClick} className="text-black toggle-button ">
            <img src={menuIcon.src} />
          </button>

          <ul
            id="primary-navigation"
            className={`primary-navigation p-2 flex gap-4 ${open && "active"} `}
          >
            <li>
              <Link onClick={handleMenuClose} className="px-2 py-2 nav-item" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link onClick={handleMenuClose} className="px-2 py-2 nav-item" href="/search">
                Search
              </Link>
            </li>
            <li>
              <Link onClick={handleMenuClose} className="px-2 py-2 nav-item" href="/popular">
                Popular
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}
