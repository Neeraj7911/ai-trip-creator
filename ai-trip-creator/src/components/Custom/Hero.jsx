/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import "./Hero.css";

const videos = ["/bgvdo/1.mp4", "/bgvdo/21.mp4", "/bgvdo/31.mp4"];

function Hero() {
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * videos.length);
    setVideoSrc(videos[randomIndex]);
  }, []);

  useEffect(() => {
    const move = document.querySelector(".cursorr");
    const h2Element = document.querySelector("h2");

    const handleMouseMove = (event) => {
      const offsetX = -9; // Adjust the offset as needed
      const offsetY = -9; // Adjust the offset as needed
      move.style.left = `${event.clientX + offsetX}px`;
      move.style.top = `${event.clientY + offsetY}px`;
    };

    const handleMouseEnter = () => {
      move.style.display = "block";
    };

    const handleMouseLeave = () => {
      move.style.display = "none";
    };

    if (h2Element) {
      h2Element.addEventListener("mousemove", handleMouseMove);
      h2Element.addEventListener("mouseenter", handleMouseEnter);
      h2Element.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (h2Element) {
        h2Element.removeEventListener("mousemove", handleMouseMove);
        h2Element.removeEventListener("mouseenter", handleMouseEnter);
        h2Element.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    // Disable scroll on mount
    document.body.style.overflow = "hidden";
    // Re-enable scroll on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="hero-container">
      {videoSrc && (
        <video className="hero-video" autoPlay muted loop>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <div className="hero-content">
        <h2 className="hero-title">
          <span className="highlight">
            Effortlessly plan your perfect trip with AI:
            <br />
          </span>
          Get personalized <br />
          travel plans instantly.
        </h2>
        <p className="hero-description">
          Your Personal trip planner and travel curator, creating custom
          itineraries tailored to your interests and budget.
        </p>
        <div className="button-container">
          <Link to={"/create-trip"}>
            <Button className="btnn">Get Started, It's Free</Button>
          </Link>
        </div>
      </div>
      <div className="cursorr" style={{ display: "none" }}></div>
    </div>
  );
}

export default Hero;
