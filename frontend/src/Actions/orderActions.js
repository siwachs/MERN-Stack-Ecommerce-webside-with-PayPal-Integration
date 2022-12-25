import {
  ALL_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  ORDERS_FAIL,
  ORDERS_REQUEST,
  ORDERS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  PAY_ORDER_FAIL,
  PAY_ORDER_REQUEST,
  PAY_ORDER_SUCCESS,
  SET_DELIVERED_REQUEST,
  SET_DELIVERED_FAIL,
  SET_DELIVERED_SUCCESS,
} from "../Constants/types";
import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    //Headers Type
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/orders`, order, config);

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
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

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDERS_REQUEST,
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

    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch({
      type: ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setDelivered = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SET_DELIVERED_REQUEST,
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

    const { data } = await axios.put(`/api/orders/${id}/deliver`, {}, config);

    dispatch({
      type: SET_DELIVERED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SET_DELIVERED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ALL_ORDERS_REQUEST,
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

    const { data } = await axios.get(`/api/orders`, config);

    dispatch({
      type: ALL_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PAY_ORDER_REQUEST,
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

    const { data } = await axios.put(
      `/api/orders/${id}/pay`,
      paymentResult,
      config
    );

    dispatch({
      type: PAY_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAY_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
