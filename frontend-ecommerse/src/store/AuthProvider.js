import UserContext from "./auth-context";
import { useReducer } from "react";

const defaultUserState = {
  user: {},
  isLoggedIn: false,
  filteredProduct: [],
};

const userReducer = (state, action) => {
  if (action.type === "LOGIN") {
    const user = action.currentUser;
    return {
      user,
      isLoggedIn: true,
    };
  } else if (action.type === "LOGOUT") {
    const user = {};

    return {
      user,
      isLoggedIn: false,
    };
  }

  if (action.type === "FILTER") {
    return {
      ...state,
      filteredProduct: action.product,
    };
  }

  return defaultUserState;
};

const AuthProvider = (props) => {
  const [userState, dispatchUserAction] = useReducer(
    userReducer,
    defaultUserState
  );

  const loginHandler = (currentUser) => {
    dispatchUserAction({ type: "LOGIN", currentUser: currentUser });
  };

  const logoutHandler = () => {
    dispatchUserAction({ tyep: "LOGOUT" });
  };

  const updateProduct = (product) => {
    dispatchUserAction({ type: "FILTER", product: product });
  };

  const userContext = {
    user: userState.user,
    isLoggedIn: userState.isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    filteredProduct: userState.filteredProduct,
    updateFilteredProduct: updateProduct,
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default AuthProvider;

// adding, removing and reteriving cart need to be done
