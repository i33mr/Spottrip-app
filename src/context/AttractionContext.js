import createDataContext from "./createDataContext";
import spottripAPI from "../api/spottripAPI";

const attractionReducer = (state, action) => {
  switch (action.type) {
    case "fetch_attractions":
      return { ...state, attractions: action.payload };
    case "search_attractions":
      return { ...state, searchResults: action.payload };
    // action.payload;
    case "loading":
      return { ...state, isLoading: action.payload };
    case "clear_search_results":
      return { ...state, searchResults: [] };
    default:
      return state;
  }
};

const fetchAttractions = (dispatch) => async (filters, longitudeLatitude) => {
  const km = 10;

  dispatch({ type: "loading", payload: true });

  try {
    const response = await spottripAPI.get(
      `/v1/attractions/attractions-within/${km}/center/${longitudeLatitude}${
        filters ? `?${filters}` : ""
      }`
    );

    dispatch({ type: "fetch_attractions", payload: response.data.data.data });
    dispatch({ type: "loading", payload: false });
  } catch (error) {
    console.log(error);
  }
};

const searchAttractions = (dispatch) => async (searchTerm) => {
  dispatch({ type: "loading", payload: true });
  try {
    const response = await spottripAPI.get(
      `/v1/attractions/search/${searchTerm}/center/101.711309,3.158870`
    );

    dispatch({ type: "search_attractions", payload: response.data.data.data });
    dispatch({ type: "loading", payload: false });
  } catch (error) {
    console.log(error);
  }
};

const searchAttractionsToAddToTour =
  (dispatch) => async (searchTerm, tourId, longitudeLatitude) => {
    dispatch({ type: "loading", payload: true });
    try {
      const response = await spottripAPI.get(
        `/v1/attractions/search/${searchTerm}/center/101.711309,3.158870`
      );

      // Filter search results to remove attractions that are already in the tour
      const tourResponse = await spottripAPI.get(`v1/tours/${tourId}`);

      const uniqueAttractions = [];
      const tourAttractions = tourResponse.data.data.tour.attractions.map((att) => att._id._id);

      response.data.data.data.forEach((element) => {
        if (!tourAttractions.includes(element._id)) uniqueAttractions.push(element);
      });

      dispatch({ type: "search_attractions", payload: uniqueAttractions });
      dispatch({ type: "loading", payload: false });
    } catch (error) {
      console.log(error);
    }
  };

const clearSearchResults = (dispatch) => () => {
  dispatch({ type: "clear_search_results" });
};
export const { Provider, Context } = createDataContext(
  attractionReducer,
  { fetchAttractions, searchAttractions, searchAttractionsToAddToTour, clearSearchResults },
  { attractions: [], isLoading: false, searchResults: [] }
);
