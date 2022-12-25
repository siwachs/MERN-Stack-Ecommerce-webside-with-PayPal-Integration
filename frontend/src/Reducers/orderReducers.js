import {
  ALL_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_RESET,
  ALL_ORDERS_SUCCESS,
  SET_DELIVERED_REQUEST,
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  ORDERS_FAIL,
  ORDERS_REQUEST,
  ORDERS_RESET,
  ORDERS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  PAY_ORDER_FAIL,
  PAY_ORDER_REQUEST,
  PAY_ORDER_RESET,
  PAY_ORDER_SUCCESS,
  SET_DELIVERED_FAIL,
  SET_DELIVERED_SUCCESS,
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  ORDER_DELIVER_RESET,
} from "../Constants/types";

export const createOrderReducer = (state = {}, action) => {
  const { payload, type } = action;

  switch (type) {
    case CREATE_ORDER_REQUEST:
      return {
        loading: true,
      };
    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
        order: payload,
      };
    case CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const orderDetailReducer = (
  state = { loading: true, order: {}, orderItems: [], shippingAddress: {} },
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  const { payload, type } = action;

  switch (type) {
    case PAY_ORDER_REQUEST:
      return {
        loading: true,
      };
    case PAY_ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case PAY_ORDER_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case PAY_ORDER_RESET:
      return {};
    default:
      return state;
  }
};

export const ordersReducer = (
  state = {
    orders: [],
  },
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case ORDERS_REQUEST:
      return {
        loading: true,
      };
    case ORDERS_SUCCESS:
      return {
        loading: false,
        orders: payload,
      };
    case ORDERS_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case ORDERS_RESET:
      return {
        orders: [],
      };
    default:
      return state;
  }
};

export const deliverStatusReducer = (state = {}, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_DELIVERED_REQUEST:
      return {
        loading: true,
      };
    case SET_DELIVERED_SUCCESS:
      return {
        loading: false,
        success: true,
        order: payload,
      };
    case SET_DELIVERED_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};

export const allOrdersReducer = (
  state = {
    orders: [],
  },
  action
) => {
  const { payload, type } = action;

  switch (type) {
    case ALL_ORDERS_REQUEST:
      return {
        loading: true,
      };
    case ALL_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: payload,
      };
    case ALL_ORDERS_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case ALL_ORDERS_RESET:
      return {
        orders: [],
      };
    default:
      return state;
  }
};
