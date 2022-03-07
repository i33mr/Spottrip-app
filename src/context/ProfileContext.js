import createDataContext from "./createDataContext";
import spottripAPI from "../api/spottripAPI";
import * as Notifications from "expo-notifications";
import moment from "moment";

const profileReducer = (state, action) => {
  switch (action.type) {
    case "set_token":
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

export const { Provider, Context } = createDataContext(profileReducer, {}, { user: {} });
