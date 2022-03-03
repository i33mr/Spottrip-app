import createDataContext from "./createDataContext";
import spottripAPI from "../api/spottripAPI";

const inviteReducer = (state, action) => {
  switch (action.type) {
    case "fetch_invites":
      return { ...state, invites: action.payload };
    case "loading":
      return { ...state, isLoading: action.payload };
    case "add_invite":
      return { ...state, invites: [...state.invites, action.payload] };
    case "remove_invite": {
      console.log(action.payload);
      state.invites.forEach((element) => {
        console.log(element._id);
      });
      return { ...state, invites: state.invites.filter((invite) => invite._id !== action.payload) };
    }
    case "add_invite_message":
      return { ...state, inviteMsg: action.payload };
    case "clear_invite_message":
      return { ...state, inviteMsg: null };
    default:
      return state;
  }
};

const fetchInvites = (dispatch) => async (tourId) => {
  dispatch({ type: "loading", payload: true });
  // console.log(tourId);
  try {
    // const response = await spottripAPI.get(`/v1/invites`);
    const response = await spottripAPI.get(`/v1/tours/${tourId}/invites`);
    dispatch({ type: "fetch_invites", payload: response.data.data.invites });
    dispatch({ type: "loading", payload: false });
    // console.log(response.data.data.invites);
  } catch (error) {
    console.log(error);
  }
};

const sendTourInvite = (dispatch) => async (tourId, friendUsername) => {
  console.log(tourId, friendUsername);
  try {
    const response = await spottripAPI.post(`v1/tours/${tourId}/invites`, {
      username: friendUsername,
    });

    // console.log(response.data.data.invite);
    dispatch({ type: "add_invite", payload: response.data.data.invite });

    dispatch({
      type: "add_invite_message",
      payload: { msg: `An invite has been sent to ${friendUsername}`, code: 200 },
    });
  } catch (error) {
    // console.log(error.response.data.message);
    dispatch({
      type: "add_invite_message",
      payload: { msg: error.response.data.message, code: error.response.data.error.statusCode },
    });
    dispatch({ type: "loading", payload: false });
  }
};

const removeInvite = (dispatch) => async (tourId, inviteId) => {
  try {
    dispatch({ type: "loading", payload: true });
    const response = await spottripAPI.delete(`/v1/tours/${tourId}/invites/${inviteId}`);

    dispatch({ type: "remove_invite", payload: inviteId });
    dispatch({ type: "loading", payload: false });
  } catch (error) {
    console.log(error);
  }
};

const clearInviteMessage = (dispatch) => () => {
  dispatch({ type: "clear_invite_message" });
};

export const { Provider, Context } = createDataContext(
  inviteReducer,
  { fetchInvites, sendTourInvite, clearInviteMessage, removeInvite },
  { invites: [], isLoading: false, inviteMsg: null }
);