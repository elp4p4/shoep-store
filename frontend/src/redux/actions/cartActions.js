import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
  CART_UPDATE_ITEM,
} from "../constants/cartConstants";

export const addToCart =
  (product, quantity, color) => async (dispatch, getState) => {
    const {
      cart: { cartItems },
    } = getState();

    // Check if item already exists in cart
    const existingItem = cartItems.find(
      (item) => item.product === product._id && item.color === color
    );

    // Calculate total quantity
    const totalQuantity = (existingItem?.quantity || 0) + quantity;

    // Check stock availability
    if (totalQuantity > product.stock) {
      throw new Error(`Only ${product.stock} items available in stock`);
    }

    const item = {
      product: product._id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      stock: product.stock,
      color,
      quantity,
    };

    if (existingItem) {
      dispatch({
        type: CART_UPDATE_ITEM,
        payload: {
          ...item,
          quantity: totalQuantity,
        },
      });
    } else {
      dispatch({
        type: CART_ADD_ITEM,
        payload: item,
      });
    }

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const removeFromCart =
  (productId, color) => async (dispatch, getState) => {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: { productId, color },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const updateCartItemQuantity =
  (productId, color, quantity) => async (dispatch, getState) => {
    const {
      cart: { cartItems },
    } = getState();
    const item = cartItems.find(
      (item) => item.product === productId && item.color === color
    );

    if (!item) return;

    if (quantity > item.stock) {
      throw new Error(`Only ${item.stock} items available in stock`);
    }

    dispatch({
      type: CART_UPDATE_ITEM,
      payload: {
        ...item,
        quantity,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const clearCart = () => (dispatch) => {
  dispatch({ type: CART_CLEAR_ITEMS });
  localStorage.removeItem("cartItems"); // Clear cart from localStorage
};
