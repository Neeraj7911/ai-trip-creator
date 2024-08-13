/* eslint-disable no-unused-vars */
import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoDocumentTextSharp } from "react-icons/io5";

function Footer() {
  return (
    <>
      <hr className="m-5"></hr>
      <footer className="footer text-center gap-2">
        <div className="footer__content text-center">
          <div className="footer__content__left text-center">
            <p className="font-bold">© 2024 TRAVELIO AI</p>
            <p className="font-semibold">Created by Neeraj Kumar</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              marginTop: "10px",
            }}
          >
            <Link
              to={"https://www.instagram.com/kumarneeraj791"}
              target="_blank"
            >
              <FaInstagram />
            </Link>
            <Link to={"https://www.linkedin.com/in/neeraj791"} target="_blank">
              <FaLinkedin />
            </Link>
            <Link to={"https://github.com/Neeraj7911"} target="_blank">
              <FaGithub />
            </Link>
            <Link
              to={
                "https://drive.google.com/file/d/1_1w28HtFFwOFKQuw8tb60JpKl7wAhYAj/view?usp=sharing"
              }
            >
              <IoDocumentTextSharp />
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
