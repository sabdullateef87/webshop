import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";
function ProductCard({ product, updateCart, isAdmin, deleteProd, checked, handleCheck }) {
  return (
    <div className={`product__card`}>
      {isAdmin && <input type="checkbox" checked={product.checked}  onChange={() => handleCheck(product._id)}/>}
      {product.images && (
        <img src={product.images.secure_url} alt="get the best out them" />
      )}
      <h3 className={`title`}>{product.title}</h3>
      <h5 className={`price`}>${product.price}</h5>
      <p className={`desc`}>{product.description}</p>
      <p className={`content`}>{product.content}</p>
      <p className={`sold`}>
        Sold : <span>{product.sold}</span>
      </p>
      {isAdmin ? (
        <div className={`action__btns`}>
          {" "}
          <Link to={`/edit_product/${product._id}`}>
            <button>Edit</button>
          </Link>
          <button onClick={() => deleteProd(product._id)}>Delete</button>
        </div>
      ) : (
        <div className={`action__btns`}>
          <Link to={`/product/${product._id}`}>
            <button>View</button>
          </Link>
          <button onClick={() => updateCart(product)}>Buy</button>
        </div>
      )}
    </div>
  );
}

export default ProductCard;
