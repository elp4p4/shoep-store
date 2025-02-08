import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { cartReducer } from "./reducers/cartReducers";
import {
  userLoginReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";
import {
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productSearchReducer,
  productUpdateReducer,
} from "./reducers/productReducers";
import { userRegisterReducer } from "./reducers/userReducers";
import { productCreateReducer } from "./reducers/productReducers";
import {
  orderDetailsReducer,
  orderListMyReducer,
  orderListReducer,
} from "./reducers/orderReducers";

const rootReducer = combineReducers({
  cart: cartReducer,
  userLogin: userLoginReducer,
  productList: productListReducer,
  userRegister: userRegisterReducer,
  userUpdateProfile: userUpdateProfileReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  orderList: orderListReducer,
  orderDetails: orderDetailsReducer,
  orderListMy: orderListMyReducer,
  productSearch: productSearchReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
  userRegister: {},
  userUpdateProfile: {},
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});

export default store;
