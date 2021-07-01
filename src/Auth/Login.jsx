import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./Login.css";
import Avatar from "../icons/undraw_profile_pic_ic5t.svg";
import axios from "axios";

function Login() {
  let history = useHistory();
  let location = useLocation();
  const [user, setUser] = useState({
    email: "",
    password: "",
    err: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/login", { ...user });
      localStorage.setItem("firstLogin", true);
      window.location.href = "/product";
    } catch (err) {
      if (err) {
        alert(err.response.data.message);
      }
    }
  };

  return (
    <div className={`login__container`}>
      <div className={`login__right`}>
        <img src={Avatar} alt="profile picture" />
        <form className={`form`} onSubmit={handleSubmit}>
          <div className={`formField`}>
            <input
              type="text"
              placeholder="Enter your email address"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className={`formField`}>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>

          <button>Sign In</button>
          <div className={`footer`}>
            <p className={`fp`}>Don't have an account ?</p>
            <p className={`no_acc`}>
              <Link to="/register">Register Here !</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Login;
