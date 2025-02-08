import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
  CART_UPDATE_ITEM,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) =>
            !(
              item.product === action.payload.productId &&
              item.color === action.payload.color
            )
        ),
      };

    case CART_UPDATE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.product === action.payload.product &&
          item.color === action.payload.color
            ? action.payload
            : item
        ),
      };

    case CART_CLEAR_ITEMS:
      return { ...state, cartItems: [] };

    default:
      return state;
  }
};
