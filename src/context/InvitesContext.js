import createDataContext from "./createDataContext";
import spottripAPI from "../api/spottripAPI";

const inviteReducer = (state, action) => {
  switch (action.type) {
    case "fetch_user_invites":
      return { ...state, userInvites: action.payload };
    case "fetch_invites":
      return { ...state, invites: action.payload };
    case "loading":
      return { ...state, isLoading: action.payload };
    case "add_invite":
      return { ...state, invites: [...state.invites, action.payload] };
    case "remove_invite": {
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

const fetchUserInvites = (dispatch) => async () => {
  dispatch({ type: "loading", payload: true });

  try {
    const response = await spottripAPI.get(`/v1/invites`);

    dispatch({ type: "fetch_user_invites", payload: response.data.data.invites });
    dispatch({ type: "loading", payload: false });
  } catch (error) {
    dispatch({ type: "loading", payload: false });
    console.log(error);
  }
};

const respondToInvite = (dispatch) => async (tourId, inviteId, status) => {
  dispatch({ type: "loading", payload: true });

  try {
    const response = await spottripAPI.patch(`/v1/tours/${tourId}/invites/${inviteId}`, {
      inviteStatus: status,
    });

    const responseAllInvites = await spottripAPI.get(`/v1/invites`);
    dispatch({ type: "fetch_user_invites", payload: responseAllInvites.data.data.invites });

    dispatch({ type: "loading", payload: false });
  } catch (error) {
    dispatch({ type: "loading", payload: false });

    console.log(error);
  }
};

const fetchTourInvites = (dispatch) => async (tourId) => {
  dispatch({ type: "loading", payload: true });
  try {
    // const response = await spottripAPI.get(`/v1/invites`);
    const response = await spottripAPI.get(`/v1/tours/${tourId}/invites`);
    dispatch({ type: "fetch_invites", payload: response.data.data.invites });
    dispatch({ type: "loading", payload: false });
    // console.log(response.data.data.invites);
  } catch (error) {
    dispatch({ type: "loading", payload: false });

    console.log(error);
  }
};

const sendTourInvite = (dispatch) => async (tourId, friendUsername) => {
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
    let errMsg = error.response.data.message;
    if (error.response.data.error.statusCode === 500) {
      errMsg = "An invite has been sent to this user already";
    }
    dispatch({
      type: "add_invite_message",
      payload: { msg: errMsg, code: error.response.data.error.statusCode },
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
    console.log(error.response.data.message);
    dispatch({ type: "loading", payload: false });
    throw new Error(error.response.data.message);
  }
};

const clearInviteMessage = (dispatch) => () => {
  dispatch({ type: "clear_invite_message" });
};

export const { Provider, Context } = createDataContext(
  inviteReducer,
  {
    fetchTourInvites,
    sendTourInvite,
    clearInviteMessage,
    removeInvite,
    fetchUserInvites,
    respondToInvite,
  },
  { userInvites: [], invites: [], isLoading: false, inviteMsg: null }
);
