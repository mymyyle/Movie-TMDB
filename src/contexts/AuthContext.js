import { createContext, useReducer, useEffect } from "react";

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};
const AuthContext = createContext();

const INITIALIZATION = "INITIALIZATION";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZATION:
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isAuthenticated,
        user,
        isInitialized: true,
      };
    case LOGIN_SUCCESS:
      return { ...state, isAuthenticated: true, user: action.payload.user };
    case LOGOUT:
      return { ...state, isAuthenticated: false, user: null };
    default:
      return state;
  }
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const username = window.localStorage.getItem("username");
    if (username) {
      dispatch({
        type: INITIALIZATION,
        payload: { isAuthenticated: true, user: { username } },
      });
    } else {
      dispatch({
        type: INITIALIZATION,
        payload: { isAuthenticated: false, user: null },
      });
    }
  }, []);

  const login = (username, cb) => {
    dispatch({ type: LOGIN_SUCCESS, payload: { user: { username } } });
    window.localStorage.setItem("username", username);
    cb();
  };

  const logout = (cb) => {
    dispatch({ type: LOGOUT });
    window.localStorage.removeItem("username");

    cb();
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
