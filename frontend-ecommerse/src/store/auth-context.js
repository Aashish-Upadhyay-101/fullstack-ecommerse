import { createContext } from "react";

const UserContext = createContext({
  user: {},
  cart: [],
  isLoggedIn: Boolean,
  addToCart: () => {},
  login: (currentUser) => {},
  logout: () => {},
});

export default UserContext;

// add to cart and display user cart
