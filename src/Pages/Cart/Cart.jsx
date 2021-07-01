import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../GlobalContext";
import Delete from "../../icons/trash-solid.svg";
import Paypal from "./Paypal";

function Cart() {
  const [cart, setCart] = useContext(GlobalContext).user.cart;
  const [token, setToken] = useContext(GlobalContext).token;
  const [total, setTotal] = useState(0);
  const getTotal = () => {
    let result = cart.reduce(
      (sum, current) => sum + current.price * current.quantity,
      0
    );
    setTotal(result);
  };

  const increment = (product) => {
    cart.forEach((item) => {
      if (item._id === product._id) {
        item.quantity += 1;
      }
    });
    setCart([...cart]);
  };
  const decrement = (product) => {
    cart.forEach((item) => {
      if (item._id === product._id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });
    setCart([...cart]);
  };
  const remove = (product) => {
    const newCart = cart.filter((item) => item._id !== product._id);
    console.log(newCart.length);
    setCart(newCart);
  };

  useEffect(() => {
    if (cart && cart.length > 0) {
      getTotal();
    }

    axios.patch("/user/cart", { cart }, { headers: { Authorization: token } });
  }, [cart]);

  return (
    <div className={`cart__container`}>
      <div className={`total`}>
        <h2> Total: $ {total} </h2> <Paypal total={total} />
      </div>
      {cart.map((item, index) => (
        <div className={`item__container`}>
          <div className={`img`}>
            <img src={item.images.secure_url} alt={item.title} />{" "}
          </div>{" "}
          <div className={`description`}>
            <h2> {item.title} </h2> <h4> $ {item.price * item.quantity} </h4>{" "}
            <p> {item.content} </p> <p> {item.description} </p>{" "}
            <div className={`btn__cont`}>
              <button onClick={() => decrement(item)}> - </button>{" "}
              <p> {item.quantity} </p>{" "}
              <button onClick={() => increment(item)}> + </button>{" "}
            </div>
          </div>
          <img
            onClick={() => remove(item)}
            src={Delete}
            alt="delete button"
            width="20px"
            className={`del__button`}
          />
        </div>
      ))}
    </div>
  );
}

export default Cart;
