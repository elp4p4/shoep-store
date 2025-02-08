import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_FAIL,
  PRODUCT_SEARCH_SUCCESS,
} from "../constants/productConstants";
import {
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
} from "../constants/productConstants";

export const listProducts = (category) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const { data } = await axios.get(
      `/api/products?category=${category || ""}`
    );
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/products/${id}`);

    // Ensure arrays exist
    const productData = {
      ...data,
      images: data.images || [],
      colors: data.colors || [],
    };

    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: productData });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({ type: PRODUCT_DELETE_SUCCESS });
    dispatch(listProducts()); // Refresh the product list
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
export const createProduct =
  (productData, callback) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post("/api/products", productData, config);

      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
      callback();
    } catch (error) {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

// Update Product
export const updateProduct =
  (id, productData, callback) => async (dispatch, getState) => {
    try {
      dispatch({ type: PRODUCT_UPDATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/products/${id}`,
        productData,
        config
      );

      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
      callback();
    } catch (error) {
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const searchProducts = (query) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_SEARCH_REQUEST });
    const { data } = await axios.get(`/api/products/search?name=${query}`);
    dispatch({ type: PRODUCT_SEARCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_SEARCH_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
