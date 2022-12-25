import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_UPDATE_REQUEST,
  USER_DETAILS_UPDATE_SUCCESS,
  USER_DETAILS_RESET,
  USER_DETAILS_UPDATE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAIL,
  USER_UPDATE_REQUEST_BY_ADMIN,
  USER_UPDATE_SUCCESS_BY_ADMIN,
  USER_UPDATE_FAIL_BY_ADMIN,
  USER_UPDATE_RESET,
  USER_DETAILS_RESET_ADMIN,
} from "../Constants/types";

export const userLoginReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_REQUEST:
      return {
        loading: true,
      };
    case LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: payload,
      };
    case LOGIN_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_REQUEST:
      return {
        loading: true,
      };
    case REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: payload,
      };
    case REGISTER_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userDetailsReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: payload,
      };
    case USER_DETAILS_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case USER_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_DETAILS_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case USER_DETAILS_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        userInfo: payload,
      };
    case USER_DETAILS_UPDATE_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateByAdminReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_UPDATE_REQUEST_BY_ADMIN:
      return {
        loading: true,
      };
    case USER_UPDATE_SUCCESS_BY_ADMIN:
      return {
        loading: false,
        success: true,
        userInfo: payload,
      };
    case USER_UPDATE_FAIL_BY_ADMIN:
      return {
        loading: false,
        error: payload,
      };
    case USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const userDetailsForAdminReducer = (state = {}, action) => {
  const { payload, type } = action;

  switch (type) {
    case USER_REQUEST:
      return {
        loading: true,
      };
    case USER_SUCCESS:
      return {
        loading: false,
        userInfo: payload,
      };
    case USER_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case USER_DETAILS_RESET_ADMIN:
      return {};
    default:
      return state;
  }
};

export const usersListReducer = (state = { users: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LIST_REQUEST:
      return {
        loading: true,
      };
    case USER_LIST_SUCCESS:
      return {
        loading: false,
        users: payload,
      };
    case USER_LIST_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case USER_LIST_RESET:
      return {
        users: [],
      };
    default:
      return state;
  }
};

export const deleteUserReducer = (state = {}, action) => {
  const { payload, type } = action;

  switch (type) {
    case USER_DELETE_REQUEST:
      return {
        loading: true,
      };
    case USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case USER_DELETE_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
