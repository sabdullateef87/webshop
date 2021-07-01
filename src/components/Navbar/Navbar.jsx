import React, { useContext } from "react";
import { GlobalContext } from "../../GlobalContext";
import Cart from "../../icons/shoppingCartWhite.svg";
import Menu from "../../icons/bars-solid.svg";
import axios from "axios";
import "./Navbar.css";
import { Link } from "react-router-dom";
import LoggedLinks from "./LoggedLinks";
import AdminLinks from "./AdminLinks";
function Navbar({ style }) {
  const [isAdmin, setIsAdmin] = useContext(GlobalContext).user.admin;
  const [isLogged, setIsLogged] = useContext(GlobalContext).user.logged;
  const [cart, setCart] = useContext(GlobalContext).user.cart;

  const adminRouter = () => {
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
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/" onClick={logout}>
            Logout
          </Link>
        </li>
      </>
    );
  };

  const logout = async () => {
    await axios.get("/user/logout");
    localStorage.clear();
    setIsLogged(false);
    setIsAdmin(false);
  };

  return (
    <div style={{ ...style }} className={`navbar__main`}>
      <div className={`navbar__container`}>
        <div className={`logo`}>
          <Link to="/">
            <h1>Shopp</h1>
          </Link>
        </div>

        <nav>
          <ul>
            <li>
              <Link to="/product">{isAdmin ? "Product" : "Shop"}</Link>
            </li>
            {isAdmin && adminRouter()}
            {isLogged ? (
              loggedRouter()
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>

        <img
          className={`close`}
          src={Menu}
          alt="navigation for mobile view"
          width="30px"
        />

        {isAdmin ? (
          ""
        ) : (
          <div className={`icons`}>
            <span>{cart.length}</span>

            <Link to="/cart">
              <img
                className={`cart__icon`}
                src={Cart}
                width="30px"
                alt="SHopping here for best products"
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
