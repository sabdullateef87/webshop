import React, { useContext, useEffect, useState } from "react";
import "./Product.css";
import ProductCard from "./ProductCard";
import axios from "axios";
import { GlobalContext } from "../../GlobalContext";

function Products() {
  const [products, setProducts] = useContext(GlobalContext).productAPI.products;
  const [callback, setCallback] = useContext(GlobalContext).productAPI.callback;
  const updateCart = useContext(GlobalContext).user.updateCart;
  const [isAdmin] = useContext(GlobalContext).user.admin;
  const [checked, setChecked] = useState(false)
  const [isDel, setIsdel] = useState(false)
  const deleteProd = async (itemId) => {
    await axios.delete(`/api/product/${itemId}`);
    setCallback(!callback);
  };
  const deleteAll = () => {

  }
  const selectAll = () => {
    products.forEach((product) => {
        product.checked = !checked
    })
    setProducts([...products])
    setChecked(!checked)
  }

  const handleCheck = (id) => {
    products.forEach(product => {
      if (product._id === id) {
        product.checked = !product.checked
      }
    })
    setProducts([...products])
    setIsdel(!isDel)
  }
  const delAll = () => {
    products.forEach(product => {
      if (product.checked) {
      deleteProd(product._id)
    }
  })
}
  const btnStyle = {
    backgroundColor: checked ? "red" : "transparent",
    color: checked ?  "white" : "red"
  }
  return (
    <div  className={`product__container`}>
      <div className="select">
        <div className="select__btn">
          <label for="select">Select All</label>
          <input id="select" type="checkbox" onChange={selectAll} checked={checked} />
        </div>

        <div className="del__btn" >
          <button style={btnStyle} onClick={delAll}>Delete</button>
        </div>
      </div>
      <div style={{display:"flex", gap:"1em", flexWrap:"wrap", justifyContent:"center"}}>
        {products.map((product, index) => (
          <ProductCard
            key={product._id}
            product={product}
            updateCart={updateCart}
            isAdmin={isAdmin}
            deleteProd={deleteProd}
            callback={callback}
            checked={checked}
            handleCheck={handleCheck}
          />
        ))}
    </div>

    </div>

  );
}

export default Products;
