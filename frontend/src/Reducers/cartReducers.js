import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  RESET_CART,
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_ADDRESS,
} from "../Constants/types";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_ITEM_TO_CART:
      const item = payload;
      const itemExist = state.cartItems.find((p) => p.product === item.product);

      if (itemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((p) =>
            p.product === itemExist.product ? item : p
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((p) => p.product !== payload),
      };
    case SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: payload,
      };
    case SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: payload,
      };
    case RESET_CART:
      return { cartItems: [], shippingAddress: {} };
    default:
      return state;
  }
};
