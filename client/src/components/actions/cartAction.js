import axios from "axios";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstant";

import store from "../../store";
// Add to cart

export const addItemsToCart = (id, quantity) => async (dispatch) => {
  const { data } = await axios.get(`/api/v1/products/${id}`);
  
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data._id,
      name: data.name,
      price: data.price,
      stock: data.stock,
      image: data.images[0].url,
      quantity,
    },
  });
 
  localStorage.setItem("cartItems", JSON.stringify(store.getState().cart.cartItems));
};

// REMOVE FROM CART;

export const removeItemsFromCart = (id) => async (dispatch) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(store.getState().cart.cartItems));
};

// SAVE SHIPPING INFO;

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
