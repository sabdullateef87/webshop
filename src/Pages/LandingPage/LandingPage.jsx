import React from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import Hero from "../../Images/undraw_successful_purchase_uyin.svg";
function LandingPage() {
  return (
    <div className={`landingpage`}>
      <div className={`circle`}></div>
      <div className={`circle2`}></div>
      <div className={`landingpage__container`}>
        <Nav />
        <div className={`hero`}>
          <div className={`left__hero`}>
            <h1>
              Any Variation that <br />
              fits your image
            </h1>

            <p>
              Each purchase will be made with pleasure Lorem ipsum dolor sit
              amet consectetur adipisicing elit.
            </p>

            <div style={{ display: "flex", gap: "1em" }}>
              <button>Start Now</button>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <button className={`register__btn--sm`}>Login</button>
              </Link>
            </div>
          </div>
          <div className={`right__hero`}>
            <img src={Hero} alt="successful purchase" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
