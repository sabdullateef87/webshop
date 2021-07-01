import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../../GlobalContext";
import { useHistory, useParams } from "react-router-dom";

const initialState = {
  product_id: "",
  title: "",
  price: "",
  description: "",
  content: "",
  images: "",
  category: "",
};

function CreateProduct() {
  let param = useParams();
  let history = useHistory();
  const [products] = useContext(GlobalContext).productAPI.products;
  const [product, setProduct] = useState(initialState);
  const [images, setImage] = useState("");
  const [categories] = useContext(GlobalContext).categoryAPI.category;
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [callback, setCallback] = useContext(GlobalContext).productAPI.callback;
  useEffect(() => {
    if (param.id) {
      products.forEach((item) => {
        if (item._id === param.id) {
          setProduct(item);
          setImage(item.images);
          setEdit(true);
        }
      });
    } else {
      setProduct(initialState);
      setImage(false);
      setEdit(false);
    }
  }, [param.id, products]);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (param.id) {
        await axios.put(`/api/product/${param.id}`, { ...product, images });
      } else {
        await axios.post("/api/product", { ...product, images });
        setImage("");
      }
      setCallback(!callback);
      history.push("/product");
    } catch (err) {
      if (err) {
        alert(err.response.data.message);
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file) return alert("Image is compulsory");
    if (file.size > 1024 * 1024) return alert("file size too large");
    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      return alert("file type not supported");
    }

    let formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    const res = await axios.post("/api/upload", formData, {
      headers: { "content-type": "multipart/form-data" },
    });

    setImage(res.data);
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    await axios.post("/api/destroy", { public_id: images.public_id });
    setImage(false);
    setLoading(false);
  };
  return (
    <div className="create__product">
      <div className="upload__image">
        <span onClick={handleDelete}>X</span>
        {images ? (
          ""
        ) : (
          <input
            type="file"
            name="file"
            id="file__upload"
            onChange={handleUpload}
            required
          />
        )}

        {loading ? (
          <div style={{ marginTop: "50px" }}>Loading...</div>
        ) : (
          <div id="file__image">
            <img src={images.secure_url} alt="" />
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form__group">
          <label htmlFor="product__id">Product ID</label>
          <input
            type="text"
            name="product_id"
            id="product__id"
            value={product.product_id}
            onChange={handleChange}
            required
            disabled={edit}
          />
        </div>
        <div className="form__group">
          <label htmlFor="product__title">Title</label>
          <input
            type="text"
            name="title"
            id="product__title"
            value={product.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form__group">
          <label htmlFor="product__price">Price</label>
          <input
            type="text"
            name="price"
            id="product__price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form__group">
          <label htmlFor="product__desc">Description</label>
          <textarea
            type="text"
            name="description"
            id="product__desc"
            value={product.description}
            onChange={handleChange}
            required
            rows="5"
          />
        </div>

        <div className="form__group">
          <label htmlFor="product__content">Content</label>
          <textarea
            type="text"
            name="content"
            id="product__content"
            value={product.content}
            onChange={handleChange}
            required
            rows="5"
          />
        </div>
        <div className="form__group">
          <label htmlFor="product__category">Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Please Select a category
            </option>
            {categories.map((category, index) => (
              <option value={category.name} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" onClick={handleSubmit}>
          {param.id ? "EDIT PRODUCT" : "CREATE PRODUCT"}
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
