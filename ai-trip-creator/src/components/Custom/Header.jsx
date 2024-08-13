/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Link, useNavigation } from "react-router-dom";
import "./Header.css";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from "@react-oauth/google";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  //const navigation = useNavigation();

  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <div className="header p-3 shadow-sm flex justify-between items-center">
      <div className="logo-container">
        <a href="/">
          <img src="/logo1.svg" alt="Logo" className="logo" />{" "}
        </a>
      </div>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full">
                My Trip
              </Button>
            </a>

            <Popover>
              <PopoverTrigger>
                {" "}
                <img
                  src={user.picture}
                  className="h-[35px] w-[35px] rounded-full"
                  alt=""
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <a href="/create-trip">
            <Button title="Create your trip now">Create Now</Button>
          </a>
        )}
      </div>
    </div>
  );
}

export default Header;
