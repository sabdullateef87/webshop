import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext";
import close from "../../icons/times-solid.svg";
import menu from "../../icons/bars-solid.svg";
import "./LandingPage.css";
function Nav() {
  const [isLogged, setIsLogged] = useContext(GlobalContext).user.logged;
  const [toggle, setToggle] = useState(false);
  const setOpen = () => {
    setToggle(!toggle);
  };

  const styleMenu = {
    left: toggle ? 0 : "-100%",
  };
  return (
    <div className={`navbar`}>
      <div className={`logo`}>
        <h2>Shopp</h2>
      </div>
      <ul style={styleMenu} onClick={() => setToggle(false)}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/product">Products</Link>
        </li>
        <li>
          <Link to="/faq">FAQ</Link>
        </li>
      </ul>

      {!isLogged && (
        <Link to="/login">
          <button className={`register__btn`}>LOGIN</button>
        </Link>
      )}

      <div className={`icon__div`}>
        {toggle ? (
          <img onClick={setOpen} src={close} alt="close" width="30px" />
        ) : (
          <img onClick={setOpen} src={menu} alt="Menu" width="30px" />
        )}
      </div>
    </div>
  );
}

export default Nav;
