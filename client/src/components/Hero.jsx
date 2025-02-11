import React from "react";
import image from "../images/heroimg.jpg";
import "../styles/home.css";

const Hero = () => {
  return (
    <section className="hero container home-section">
      <div className="hero-content">
        <h1>CareCircle</h1>
        <h2>Because caregivers deserve care too</h2>
        <p>
        CareCircle is a support platform designed to uplift caregivers facing the challenges of caretaker syndrome. From booking therapy sessions to accessing paramedical support and healthcare resources, CareCircle ensures that caregivers receive the help they need while providing care to their loved ones
        </p>
      </div>
      <div className="hero-img">
        <img
          src={image}
          alt="hero"
        />
      </div>
    </section>
  );
};

export default Hero;
