import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  REMOVE_ONE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstant";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );
      //     basically we are seeing whatever is there in the payload is same to the  items that are added in the cart;

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
        //   basically removing the items which are in the payload ,it means the items that are added in cart;
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };
    // bascially here we are shipping those items which are in payload or the ones that are added in the cart;

    default:
      return state;
  }
};
