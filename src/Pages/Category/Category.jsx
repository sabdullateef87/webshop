import React, { useContext, useState } from "react";
import "./Catrgory.css";
import { GlobalContext } from "../../GlobalContext";
import axios from "axios"

function Category() {
  const [category, setCategory] = useState("");
  const [edit, setEdit] = useState(false)
  const [id, setId] = useState(0)
  const [categories, setCategories] = useContext(
    GlobalContext
  ).categoryAPI.category;
  const [callback, setCallback] = useContext(GlobalContext).categoryAPI.callback

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const addCategory = async (e) => {
    e.preventDefault()
    if (edit) {
      await axios.put(`/api/category/${id}`, {name: category})
    } else {
      await axios.post("/api/category", {name: category})
    }
    setEdit(false)
    setCallback(!callback)
    setCategory("")
  };
  const editCategory = async (id, word) => {
    setId(id)
    setCategory(word)
    setEdit(!edit)
  };
    const deleteCategory = async (id) => {
      await axios.delete(`/api/category/${id}`)
      setCallback(!callback)
  };
  return (
    <div className={`categories`}>
      <form onSubmit={addCategory}>
        <div className="form__group">
          {/* <label for="category">Enter a category</label> */}
          <input
            id="category"
            type="text"
            name="category"
            value={category}
            onChange={handleChange}
            placeholder="Enter a New Category"
          />

          {
            edit ?<button type="submit">EDIT</button>:<button type="submit">SAVE</button>
          }


        </div>
      </form>

      <div className="category__list">
        {categories.map((item, index) => (
          <div className={`category__item`} key={item._id}>
            <p>{item.name}</p>
            <div className="btn">
              <button onClick={() => editCategory(item._id, item.name)}>Edit</button>
              <button onClick={() => deleteCategory(item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
