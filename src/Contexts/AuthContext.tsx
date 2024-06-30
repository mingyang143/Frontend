import { createContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  State,
  Action,
  ChildrenProps,
  AuthContextType,
} from "../Models/AuthModels";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoginLoading: false,
};

const TEMP_USERS: User[] = [];

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case "toggleLoading":
      return { ...state, isLoginLoading: !state.isLoginLoading };
    default:
      throw new Error("unknown action");
  }
}
const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: async () => {},
  logout: () => {},
  createUser: async () => {},
  loadingToggle: () => {},
});
function AuthProvider({ children }: ChildrenProps) {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, isAuthenticated, isLoginLoading } = state;

  async function login(username: string) {
    console.log("logging in");
    dispatch({ type: "toggleLoading" });
    const data = await dbIsValidUser({ name: username });
    dispatch({ type: "toggleLoading" });
    // if (data?.errorCode === 0) {
    //   dispatch({
    //     type: "login",
    //     payload: { name: username, userId: data.payload.data.id },
    //   });

    //   alert("Successfully logged in!");
    // } else {
    //   alert("No user found, please create a user! ❌");
    // }
    if (data) {
      dispatch({
        type: "login",
        payload: {
          name: username,
          userId: TEMP_USERS.findIndex((x) => x.name == username),
        },
      });

      alert("Successfully logged in!");
    } else {
      alert("No user found, please create a user! ❌");
    }
  }
  async function createUser(username: string) {
    dispatch({ type: "toggleLoading" });
    const data = await dbPostUser({ name: username });
    dispatch({ type: "toggleLoading" });
    // if (data) {
    //   alert("New user created, please log in now");
    // } else {
    //   alert("Failed to create new user");
    // }
    alert("New user created, please log in now");
    navigate("/login");
  }

  function logout() {
    dispatch({ type: "logout" });
    dispatch({ type: "toggleLoading" });
  }
  function loadingToggle() {
    dispatch({ type: "toggleLoading" });
  }
  async function dbIsValidUser(newUser: User) {
    // try {
    //   const res = await fetch(`/checkuser?name=${newUser.name}`);

    //   const data = await res.json();
    //   return data;
    // } catch {
    //   alert("There was an error validating user...");
    // }
    console.log(TEMP_USERS);
    for (var i: number = 0; i < TEMP_USERS.length; i++) {
      if (TEMP_USERS[i].name == newUser.name) {
        console.log(TEMP_USERS[i].name);
        return true;
      }
    }
    return false;
  }
  async function dbPostUser(newUser: User) {
    // try {
    //   const res = await fetch(`/users`, {
    //     method: "post",
    //     body: JSON.stringify(newUser),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });

    //   const data = await res.json();

    //   return data;
    // } catch {
    //   alert("There was an error loading data...");
    // }
    TEMP_USERS[TEMP_USERS.length] = newUser;
    console.log(TEMP_USERS);
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        createUser,
        isLoginLoading,
        loadingToggle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
