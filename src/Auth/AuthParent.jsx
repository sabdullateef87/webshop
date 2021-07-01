import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import Log from "../Images/undraw_mobile_login_ikmv.svg";
import "./AuthParent.css";
function AuthParent({ children, style, pageName = "" }) {
  return (
    <div style={{ ...style }} className={`auth`}>
      <div className={`authParent__container`}>
        {children}
        <div className={`authParent__showcase`}>
          <div className={`header`}>
            <h1>
              {pageName} to get <br />
              some of our awesome offers{" "}
            </h1>
            <p>
              Not on our platform yet ?{" "}
              <Link to="/register">
                <span>Register Here</span>
              </Link>
            </p>
          </div>
          <img src={Log} alt="login for awesome offers" />
        </div>
      </div>
    </div>
  );
}

export default AuthParent;
