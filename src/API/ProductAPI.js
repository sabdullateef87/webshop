import React, { useState, useEffect } from "react";
import axios from "axios";
function ProductAPI() {
  const [products, setProducts] = useState([]);
  const [callback, setCallback] = useState(false);
  useEffect(() => {
    async function fetchProduct() {
      const response = await axios.get("/api/product");
      setProducts(response.data);
    }
    fetchProduct();
  }, [callback]);
  return {
    products: [products, setProducts],
    callback: [callback, setCallback],
  };
}

export default ProductAPI;
