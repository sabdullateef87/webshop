import {
  GET_ALL_PRODUCTS,
  PRODUCT_LOADING,
  PRODUCT_LOADING_FAILED,
} from "../constants/constants";
const productReducer = (state, { type, payload }) => {
  switch (type) {
    case PRODUCT_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: payload,
        isLoading: false,
      };
    case PRODUCT_LOADING_FAILED:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default productReducer;
