import UserContext from "./auth-context";
import { useReducer } from "react";

const defaultUserState = {
  user: {},
  isLoggedIn: false,
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

  const userContext = {
    user: userState.user,
    isLoggedIn: userState.isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <UserContext.Provider value={userContext}>
      {props.children}
    </UserContext.Provider>
  );
};

export default AuthProvider;

// adding, removing and reteriving cart need to be done
