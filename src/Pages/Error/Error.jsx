import React from "react";
import { Link } from "react-router-dom";
import "./Error.css";
import Err from "../../Images/undraw_page_not_found_su7k.svg";
function Error() {
  return (
    <div className={`error`}>
      <img src={Err} alt="We cant find what you are lookin for" />
      <h5>Opps!! We can't find what you are looking for </h5>
      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </div>
  );
}

export default Error;
