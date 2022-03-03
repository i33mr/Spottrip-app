import createDataContext from "./createDataContext";
import spottripAPI from "../api/spottripAPI";

const tourReducer = (state, action) => {
  switch (action.type) {
    case "fetch_tours":
      return { ...state, tours: action.payload };
    case "loading":
      return { ...state, isLoading: action.payload };
    case "set_tour":
      return { ...state, tour: action.payload };
    case "clear_tour":
      return { ...state, tour: null };
    // case "remove_attraction": {
    //   // console.log(action.payload);
    //   // state.tour.attractions.forEach((element) => {
    //   //   console.log(element._id._id);
    //   // });
    //   return {
    //     ...state,
    //     tour: {
    //       ...state.tour,
    //       attractions: state.tour.attractions.filter(
    //         (attraction) => attraction._id._id !== action.payload
    //       ),
    //     },
    //   };
    // }
    default:
      return state;
  }
};

const fetchTours = (dispatch) => async () => {
  dispatch({ type: "loading", payload: true });
  try {
    const response = await spottripAPI.get(`/v1/tours`);

    // console.log(response.data.data.tours);

    dispatch({ type: "fetch_tours", payload: response.data.data.tours });
    dispatch({ type: "loading", payload: false });
  } catch (error) {
    console.log(error);
  }
};

const setManualTourSettings = (dispatch) => async (tourId, tourSettings) => {
  // console.log(tourId);
  // console.log(tourSettings);
  dispatch({ type: "loading", payload: true });
  try {
    const response = await spottripAPI.patch(`v1/tours/${tourId}`, tourSettings);

    // console.log("setManualTourSettings", response.data.data.tour);
    dispatch({ type: "set_tour", payload: response.data.data.tour });
    dispatch({ type: "loading", payload: false });
  } catch (error) {
    console.log(error.response.data.message);

    dispatch({ type: "loading", payload: false });
  }
};

const getTour = (dispatch) => async (tourId) => {
  // console.log(tourId);
  dispatch({ type: "loading", payload: true });
  try {
    const response = await spottripAPI.get(`v1/tours/${tourId}`);

    // console.log("getTour", response.data.data.tour);

    dispatch({ type: "set_tour", payload: response.data.data.tour });
    dispatch({ type: "loading", payload: false });
  } catch (error) {
    console.log(error.response.data.message);

    dispatch({ type: "loading", payload: false });
  }
};

const removeAttraction = (dispatch) => async (tourId, attractionId) => {
  try {
    dispatch({ type: "loading", payload: true });
    const response = await spottripAPI.delete(
      `/v1/tours/${tourId}/attractions/tour-attractions/${attractionId}`
    );

    const responseTour = await spottripAPI.get(`v1/tours/${tourId}`);

    // console.log("Context1", response.data.data.tour);

    dispatch({ type: "set_tour", payload: responseTour.data.data.tour });
    // dispatch({ type: "remove_attraction", payload: attractionId });
    // await getTour(tourId);
    dispatch({ type: "loading", payload: false });
  } catch (error) {
    console.log(error);
  }
};

const addAttractions = (dispatch) => async (tourId, attractionsToAdd) => {
  try {
    dispatch({ type: "loading", payload: true });
    attractionsToAdd = attractionsToAdd.map((att) => {
      return { _id: att };
    });
    const response = await spottripAPI.patch(`/v1/tours/${tourId}/attractions/tour-attractions`, {
      attractionsToAdd,
    });

    dispatch({ type: "set_tour", payload: response.data.data.tour });
    // dispatch({ type: "remove_attraction", payload: attractionId });
    // await getTour(tourId);
    dispatch({ type: "loading", payload: false });
  } catch (error) {
    console.log(error);
  }
};

const clearTour = (dispatch) => () => {
  dispatch({ type: "clear_tour" });
};

export const { Provider, Context } = createDataContext(
  tourReducer,
  { fetchTours, setManualTourSettings, getTour, removeAttraction, clearTour, addAttractions },
  { tours: [], isLoading: false, inviteMsg: null, tour: null }
);
