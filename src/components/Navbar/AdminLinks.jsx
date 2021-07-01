import React from "react";
import { Link } from "react-router-dom";
function AdminLinks() {
  return (
    <>
      <li>
        <Link to="/create_product">Create Products</Link>
      </li>
      <li>
        <Link to="/category">Category</Link>
      </li>
    </>
  );
}

export default AdminLinks;
