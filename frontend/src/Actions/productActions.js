import {
  PRODUCT_FAIL,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_SUCCESS,
  PRODUCT_REQUEST,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  POST_REVIEW_SUCCESS,
  POST_REVIEW_REQUEST,
  POST_REVIEW_FAIL,
  TOP_PRODUCTS_REQUEST,
  TOP_PRODUCTS_SUCCESS,
  TOP_PRODUCTS_FAIL,
} from "../Constants/types";
import axios from "axios";

export const productList =
  (keyword = "", pageNo = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_LIST_REQUEST,
      });

      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNo}`
      );

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const topProductList = () => async (dispatch) => {
  try {
    dispatch({
      type: TOP_PRODUCTS_REQUEST,
    });

    const { data } = await axios.get(`/api/products/top`);

    dispatch({
      type: TOP_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TOP_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProductById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_PRODUCT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    //Headers Type
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: DELETE_PRODUCT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_PRODUCT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    //Headers Type
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products`, {}, config);

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProduct = (id, product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_PRODUCT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    //Headers Type
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/products/${id}`, product, config);

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getproduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PRODUCT_REQUEST,
    });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const postReview = (id, review) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_REVIEW_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    //Headers Type
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/products/reviews/${id}`, review, config);

    dispatch({
      type: POST_REVIEW_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: POST_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
