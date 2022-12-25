import {
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_RESET,
  CREATE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  POST_REVIEW_FAIL,
  POST_REVIEW_REQUEST,
  POST_REVIEW_RESET,
  POST_REVIEW_SUCCESS,
  PRODUCT_FAIL,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  TOP_PRODUCTS_FAIL,
  TOP_PRODUCTS_REQUEST,
  TOP_PRODUCTS_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_SUCCESS,
} from "../Constants/types";

export const productListReducer = (state = { products: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_LIST_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: payload.products,
        pages: payload.pages,
        pageNo: payload.pageNo,
      };
    case PRODUCT_LIST_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const topProductListReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case TOP_PRODUCTS_REQUEST:
      return {
        loading: true,
      };
    case TOP_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: payload,
      };
    case TOP_PRODUCTS_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const createProductReducer = (state = { product: {} }, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case CREATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
        product: payload,
      };
    case CREATE_PRODUCT_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case CREATE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const updateProductReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
        product: payload,
      };
    case UPDATE_PRODUCT_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case UPDATE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const productReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_REQUEST:
      return {
        loading: true,
        product: [],
      };
    case PRODUCT_SUCCESS:
      return {
        loading: false,
        product: payload,
      };
    case PRODUCT_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const deleteProductReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case DELETE_PRODUCT_REQUEST:
      return {
        loading: true,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case DELETE_PRODUCT_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const postReviewReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case POST_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case POST_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case POST_REVIEW_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case POST_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
