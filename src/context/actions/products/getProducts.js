import axios from "axios";
import {
  GET_ALL_PRODUCTS,
  PRODUCT_LOADING,
  PRODUCT_LOADING_FAILED,
} from "../../constants/constants";

const getProducts = async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_LOADING,
    });
    const response = await axios.get("/api/product");
    dispatch({
      type: GET_ALL_PRODUCTS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: PRODUCT_LOADING_FAILED,
      payload: err.response
        ? err.response
        : { error: "Something went wrong !!" },
    });
  }
};

export default getProducts;
