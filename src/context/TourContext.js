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
    case "update_tours":
      // console.log(action.payload);
      // state.tour.attractions.forEach((element) => {
      //   console.log(element._id._id);
      // });
      return {
        ...state,
        tours: state.tours.map((tour) => {
          // console.log(tour);
          if (tour._id !== action.payload._id) return tour;
          else {
            return action.payload;
          }
        }),
      };
    case "overstay_msg":
      return { ...state, overstayMsg: action.payload };
    case "clear_overstay_msg":
      return { ...state, overstayMsg: "" };
    default:
      return state;
  }
};

const fetchTours = (dispatch) => async () => {
  console.log("Fetching tours");
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

const setManualTourSettings = (dispatch) => async (tourId, tourSettings, setTour) => {
  // console.log(tourId);
  // console.log(tourSettings);
  dispatch({ type: "loading", payload: true });
  try {
    const response = await spottripAPI.patch(`v1/tours/${tourId}`, tourSettings);

    // console.log("setManualTourSettings", response.data.data.tour);
    // dispatch({ type: "set_tour", payload: response.data.data.tour });
    if (setTour) dispatch({ type: "set_tour", payload: response.data.data.tour });

    dispatch({ type: "loading", payload: false });
  } catch (error) {
    console.log(error.response.data.message);

    dispatch({ type: "loading", payload: false });
  }
};

const generateTour = (dispatch) => async (tourId, longitudeLatitude, tourSettings, setTour) => {
  dispatch({ type: "loading", payload: true });
  const km = 100;

  try {
    const response = await spottripAPI.patch(
      `v1/tours/${tourId}/attractions-within/${km}/center/${longitudeLatitude}`,
      tourSettings
    );

    // const responseTour = await spottripAPI.get(`v1/tours/${tourId}`);
    // console.log("generateTour", responseTour.data.data);
    // if (setTour) dispatch({ type: "set_tour", payload: responseTour.data.data.tour });
    if (setTour) dispatch({ type: "set_tour", payload: response.data.data.tour });
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

const updateTourStatus = (dispatch) => async (tourId, status) => {
  dispatch({ type: "loading", payload: true });
  try {
    const obj = {
      status: status,
    };
    if (status === "Active") {
      obj.startTime = Date.now();
    }
    const response = await spottripAPI.patch(`/v1/tours/${tourId}`, { ...obj });
    dispatch({ type: "update_tours", payload: response.data.data.tour });
    // console.log();

    dispatch({ type: "loading", payload: false });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({ type: "loading", payload: false });
    throw new Error("Error");
  }
};

const resolveOverstay = (dispatch) => async (tourId, attractionId, overStayedTime) => {
  dispatch({ type: "loading", payload: true });

  // overStayedTime *= 60;
  console.log(overStayedTime);
  try {
    const response = await spottripAPI.patch(`/v1/tours/resolve-overstay/${tourId}`, {
      overStayedTime,
      attractionId,
    });

    console.log(response.data.data.message);

    if (response.data.data.message.method === "no change") {
      dispatch({ type: "set_tour", payload: response.data.data.tour });
      // console.log(response.data.data.message);
    }
    dispatch({ type: "overstay_msg", payload: response.data.data.message });

    dispatch({ type: "loading", payload: false });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({ type: "loading", payload: false });
    throw new Error("Error");
  }
};

const resolveOverstayResponse =
  (dispatch) => async (tourId, attractionId, overStayedTime, choice) => {
    dispatch({ type: "loading", payload: true });

    // overStayedTime *= 60;
    // console.log(overStayedTime);
    try {
      const response = await spottripAPI.patch(`/v1/tours/resolve-overstay/response/${tourId}`, {
        overStayedTime,
        attractionId,
        choice,
      });

      console.log(response.data.data.message);

      // if (response.data.data.message.method === "no change") {
      dispatch({ type: "set_tour", payload: response.data.data.tour });
      // console.log(response.data.data.message);
      // }
      // dispatch({ type: "overstay_msg", payload: `${choice} is done!` });

      dispatch({ type: "loading", payload: false });
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({ type: "loading", payload: false });
      throw new Error("Error");
    }
  };

const clearTour = (dispatch) => () => {
  dispatch({ type: "clear_tour" });
};

const clearOverstayMsg = (dispatch) => () => {
  dispatch({ type: "clear_overstay_msg" });
};

const startLoading = (dispatch) => () => {
  dispatch({ type: "loading", payload: true });
};

const stopLoading = (dispatch) => () => {
  dispatch({ type: "loading", payload: false });
};

export const { Provider, Context } = createDataContext(
  tourReducer,
  {
    fetchTours,
    setManualTourSettings,
    getTour,
    removeAttraction,
    clearTour,
    addAttractions,
    generateTour,
    updateTourStatus,
    startLoading,
    stopLoading,
    resolveOverstay,
    clearOverstayMsg,
    resolveOverstayResponse,
  },
  { tours: [], isLoading: false, inviteMsg: null, tour: null, overstayMsg: "" }
);
