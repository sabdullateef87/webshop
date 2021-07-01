import axios from "axios";
import React, { useState, useEffect } from "react";

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (token) {
      const getUserInfo = async () => {
        const user = await axios.get("/user/infor", {
          headers: { Authorization: token },
        });
        setIsLogged(true);
        user.data.role === 0 ? setIsAdmin(false) : setIsAdmin(true);
        setCart(user.data.cart);
      };
      getUserInfo();
    }
  }, [token]);

  const updateCart = async (product) => {
    if (!isLogged) {
      alert("please login in to continue the purchase");
      return;
    }
    const check = cart.every((item) => item._id !== product._id);
    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);

      await axios.patch(
        "/user/cart",
        {
          cart: [...cart, { ...product, quantity: 1 }],
        },
        { headers: { Authorization: token } }
      );
    } else {
      alert("item already exist in the cart");
    }
  };

  return {
    logged: [isLogged, setIsLogged],
    admin: [isAdmin, setIsAdmin],
    updateCart: updateCart,
    cart: [cart, setCart],
  };
}

export default UserAPI;
