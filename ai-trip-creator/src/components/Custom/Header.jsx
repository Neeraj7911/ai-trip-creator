/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <div className="header p-3 shadow-sm flex justify-between items-center">
      <div className="logo-container">
        <a href="/">
          <img src="/logo1.svg" alt="Logo" className="logo" />{" "}
        </a>
      </div>
      <div>
        <Button>Sign In</Button>
      </div>
    </div>
  );
}

export default Header;
