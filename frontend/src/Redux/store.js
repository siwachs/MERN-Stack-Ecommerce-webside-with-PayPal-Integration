import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  createProductReducer,
  deleteProductReducer,
  postReviewReducer,
  productListReducer,
  productReducer,
  topProductListReducer,
  updateProductReducer,
} from "../Reducers/productReducers";
import { cartReducer } from "../Reducers/cartReducers";
import {
  deleteUserReducer,
  userDetailsForAdminReducer,
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  usersListReducer,
  userUpdateByAdminReducer,
  userUpdateReducer,
} from "../Reducers/userReducer";
import {
  allOrdersReducer,
  createOrderReducer,
  deliverStatusReducer,
  orderDetailReducer,
  orderPayReducer,
  ordersReducer,
} from "../Reducers/orderReducers";

const reducers = combineReducers({
  productList: productListReducer,
  product: productReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  updateProfile: userUpdateReducer,
  orderCreate: createOrderReducer,
  orderDetails: orderDetailReducer,
  payOrder: orderPayReducer,
  orders: ordersReducer,
  usersList: usersListReducer,
  deleteUser: deleteUserReducer,
  userDetailsByAdmin: userDetailsForAdminReducer,
  userUpdateByAdmin: userUpdateByAdminReducer,
  deleteProduct: deleteProductReducer,
  createProduct: createProductReducer,
  updateProduct: updateProductReducer,
  allOrders: allOrdersReducer,
  orderDeliver: deliverStatusReducer,
  postReview: postReviewReducer,
  topProducts: topProductListReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
