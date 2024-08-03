/* eslint-disable no-unused-vars */
import React from "react";
import { Button } from "../ui/button";
import "./Header.css";
function Header() {
  return (
    <>
      <div className="p-3 shadow-sm flex justify-between items-center">
        <div className="logo">
          <img src="/logo.svg" alt="" />
        </div>

        <div>
          <Button>Sign In</Button>
        </div>
      </div>
    </>
  );
}

export default Header;
