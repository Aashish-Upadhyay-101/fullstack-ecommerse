import CartContext from "./cart-context";
import { useReducer, useState } from "react";

const defaultCartState = {
  item: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedItem = [...state.item].concat(action.item);
    const updatedTotalAmount =
      state.totalAmount + action.item.quantity * action.item.product.price;

    return {
      item: updatedItem,
      totalAmount: updatedTotalAmount,
    };
  }

  return {
    defaultCartState,
  };
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeFromCartHandler = (id) => {};

  const cartContext = {
    item: cartState.item,
    totalAmount: cartState.totalAmount,
    addItem: addToCartHandler,
    removeItem: removeFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
