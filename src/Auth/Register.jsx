import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { Link } from "react-router-dom";
import Avatar from "../icons/undraw_profile_pic_ic5t.svg";
import "./Register.css";
function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/user/register", { ...user });
      localStorage.setItem("firstLogin", true);
      window.location.href = "/product";
    } catch (err) {
      if (err) alert(err.response.data.message);
    }
  };
  return (
    <div className={`register__container`}>
      <div className={`register__right`}>
        <img src={Avatar} alt="profile picture" />
        <form className={`form`} onSubmit={handleSubmit}>
          <div className={`formField`}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          </div>
          <div className={`formField`}>
            <input
              type="text"
              placeholder="Email"
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

          <button>REGISTER</button>
          <div className={`footer`}>
            <p className={`no_acc`} style={{ marginTop: "20px" }}>
              Already Registered ? , <Link to="/login">Login Here !</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
