"use client";

import React, { useEffect, useState } from "react";
import logo from "../../images/logo.svg";
import Link from "next/link";
import menuOpenIcon from "../../images/icon-menu.svg";
import menuCloseIcon from "../../images/icon-menu-close.svg";
import { UserAuth } from "../context/AuthContext";
import { FaAngleDown,FaAngleUp  } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";



export default function Navbar() {
  const { user, googleSignIn, logOut } = UserAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuBtnClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuBtnClose = () => {
    setMenuOpen(false);
    handleSignOut();
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  function handleClick() {
    setOpen(!open);
  }

  function handleMenuClose() {
    setOpen(!open);
  }

  const menuIcon = open ? menuCloseIcon : menuOpenIcon;

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

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
              <Link
                onClick={handleMenuClose}
                className="px-2 py-2 nav-item"
                href="/"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={handleMenuClose}
                className="px-2 py-2 nav-item"
                href="/search"
              >
                Search
              </Link>
            </li>
            <li>
              <Link
                onClick={handleMenuClose}
                className="px-2 py-2 nav-item"
                href="/bookmark"
              >
                Bookmark
              </Link>
            </li>
            {/* <li>
              <Link
                onClick={handleMenuClose}
                className="px-2 py-2 nav-item"
                href="/popular"
              >
                Popular
              </Link>
            </li> */}
            {loading ? null : !user ? (
              <li
                onClick={handleSignIn}
                className="px-2 py- nav-item cursor-pointer"
              >
                Login
              </li>
            ) : (
              <>
                <div className="menu-container">
                  <button
                    id="basic-button"
                    aria-controls={menuOpen ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={menuOpen ? "true" : undefined}
                    onClick={handleMenuBtnClick}
                    className="menu-container-btn flex"
                  >
                    Account{menuOpen ? <FaAngleUp className="m-1"/>:<FaAngleDown className="m-1"/>}
                  </button>
                  {menuOpen && (
                    <div className="menu" id="basic-menu">
                      <div className="menu-item text-sm">Welcome, {user.displayName}</div>
                      <div onClick={handleMenuBtnClose} className="menu-item flex gap-1 hover:text-red-500">
                        Logout <FiLogOut className="mt-1"/>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
