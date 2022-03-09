import AsyncStorage from "@react-native-async-storage/async-storage";
import createDataContext from "./createDataContext";
import spottripApi from "../api/spottripAPI";
import { navigate } from "../navigationRef";
import * as Notifications from "expo-notifications";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signIn":
      return { errorMessage: "", token: action.payload };
    case "set_token":
      return { ...state, token: action.payload };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signOut":
      return { token: null, errorMessage: "" };
    case "loading":
      return { ...state, isLoading: action.payload };
    case "add_personal_info":
      return { ...state, userObj: { ...state.userObj, ...action.payload } };
    default:
      return state;
  }
};

// eslint-disable-next-line arrow-body-style
const tryLocalSignIn = (dispatch) => {
  return async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch({ type: "signIn", payload: token });
      // await AsyncStorage.removeItem("token");

      navigate("mainFlow");
    } else {
      navigate("Welcome");
    }
  };
};

// instead of
// const clearErrorMessage = (dispatch) => {
//   return () => {};
// };

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

// eslint-disable-next-line arrow-body-style
const signup = (dispatch) => {
  return async (user) => {
    dispatch({ type: "loading", payload: true });

    // make api request to sign up with these email and password
    try {
      const response = await spottripApi.post("/v1/users/signup", {
        ...user,
      });

      await AsyncStorage.setItem("token", response.data.data.token);
      // if we sign up, modify the state to authenticated

      dispatch({ type: "signIn", payload: response.data.data.token });
      dispatch({ type: "loading", payload: false });

      // navigate to mainFlow
      navigate("SignupDone"); // from navigationRef.js
    } catch (error) {
      // console.log("TESTS Error");
      // if sign up fail, reflect error message
      // console.log(error.response.data.message);

      dispatch({
        type: "add_error",
        payload: error.response.data.message,
      });
      dispatch({ type: "loading", payload: false });
    }
  };
};

const signUpPersonalInfo = (dispatch) => (userObj) => {
  dispatch({ type: "add_personal_info", payload: userObj });
  // console.log(userObj);
};

// eslint-disable-next-line arrow-body-style
const signIn = (dispatch) => {
  return async ({ emailOrUsername, password, expoPushToken }) => {
    console.log("signin", expoPushToken);
    dispatch({ type: "loading", payload: true });
    // make api request to sign in with these email and password
    try {
      // console.log(spottripApi);
      const response = await spottripApi.post("/v1/users/login", {
        emailOrUsername,
        password,
        expoPushToken,
      });
      // if we sign in, modify the state to authenticated
      // console.log(response.data.data.token);
      await AsyncStorage.setItem("token", response.data.data.token);
      dispatch({ type: "signIn", payload: response.data.data.token });
      dispatch({ type: "loading", payload: false });

      navigate("mainFlow");
    } catch (error) {
      // if sign in fail, reflect error message
      console.log(error.response.data.message);
      // console.log(response);

      dispatch({
        type: "add_error",
        payload: error.response.data.message,
      });
      dispatch({ type: "loading", payload: false });
    }
  };
};

// eslint-disable-next-line arrow-body-style
const signOut = (dispatch) => {
  return async () => {
    // somehow signOut!
    await spottripApi.post("/v1/users/logout");
    await Notifications.cancelAllScheduledNotificationsAsync();
    await AsyncStorage.removeItem("token");
    dispatch({ type: "signOut" });

    navigate("Welcome");
  };
};

const setToken = (dispatch) => async (token) => {
  await AsyncStorage.setItem("token", token);
  dispatch({ type: "set_token", payload: token });
};
export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signUpPersonalInfo, signIn, signOut, clearErrorMessage, tryLocalSignIn, setToken },
  { token: null, errorMessage: "", isLoading: false, userObj: {} }
);
