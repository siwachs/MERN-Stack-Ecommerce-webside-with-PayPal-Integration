import axios from "axios";
import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_ADDRESS,
} from "../Constants/types";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: ADD_ITEM_TO_CART,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  //Save entire Cart
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id, qty) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_ITEM_FROM_CART,
    payload: id,
  });

  //Update Local Storage
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  //Update Local Storage
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (method) => (dispatch) => {
  dispatch({
    type: SAVE_PAYMENT_METHOD,
    payload: method,
  });

  //Update Local Storage
  localStorage.setItem("paymentMethod", JSON.stringify(method));
};
