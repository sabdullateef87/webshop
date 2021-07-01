import React from "react";
import { Link } from "react-router-dom";
function LoggedLinks() {
  return (
    <>
      <li>
        <Link to="/history">History</Link>
      </li>
      <li>
        <Link to="/">Logout</Link>
      </li>
    </>
  );
}

export default LoggedLinks;
