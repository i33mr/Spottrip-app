import React, { useState, useContext, useRef, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import { SearchBar, Button, Text, Icon, Input } from "react-native-elements";
import { Octicons } from "@expo/vector-icons";
// import Modal from "react-native-modal";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Context as AttractionContext } from "../context/AttractionContext";
import { Context as TourContext } from "../context/TourContext";
import { Image } from "react-native-expo-image-cache";
import AddAttractionTile from "../components/AddAttractionTile";
import { NavigationEvents } from "react-navigation";
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import FloatingButton from "../components/FloatingButton";
import useLocation from "../hooks/useLocation";
import { withNavigationFocus } from "react-navigation";

const TourAddAttractionScreen = ({ isFocused, navigation }) => {
  const tourId = navigation.getParam("_id");

  // const { state, searchAttractionsToAddToTour } = useContext(AttractionContext);
  const Attraction = useContext(AttractionContext);
  const Tour = useContext(TourContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchErr, setSearchErr] = useState("");
  const [selectedAttractions, setSelectedAttractions] = useState([]);

  // let selectedAttractions = [];

  const [longitudeLatitude, setLongitudeLatitude] = useState("");

  const callback = useCallback((location) => {
    console.log("longitudeLatitude4", longitudeLatitude);

    // setLongitudeLatitude(`${location.coords.longitude},${location.coords.latitude}`);
    setLongitudeLatitude(`101.711309,3.15887`);
    console.log("TAAS still tracking");
  });
  const [err] = useLocation(isFocused, callback);

  useEffect(() => {
    console.log("longitudeLatitude33", longitudeLatitude);
  }, [longitudeLatitude]);

  const onSubmitSearch = () => {
    if (searchTerm === "") {
      setSearchErr("Please enter search term");
    } else {
      setSearchErr("");
      if (err) console.log(err);
      console.log("longitudeLatitude2", longitudeLatitude);
      // navigation.navigate("SearchResults", { forwardedSearchTerm: searchTerm });
      // console.log(tourId);
      Attraction.searchAttractionsToAddToTour(searchTerm, tourId, longitudeLatitude);
    }
  };

  const onAddAttractions = async () => {
    if (!selectedAttractions.length) {
      // setSearchErr("Please select at least one attraction to add, or go back to view your tour");
      flashMessageRef.current.showMessage({
        message: "Please select at least one attraction to add, or go back to view your tour",
        type: "danger",
        duration: 4000,
        floating: true,
      });
    } else {
      try {
        setSearchErr("");
        await Tour.addAttractions(tourId, selectedAttractions);
        navigation.navigate("TourOverview");
      } catch (error) {
        flashMessageRef.current.showMessage({
          message: "Couldn't add attraction",
          description: error.message,
          type: "danger",
          duration: 4000,
          floating: true,
        });
      }
    }
  };

  const updateAddArray = (method, id) => {
    // if (method === "add") {
    //   selectedAttractions = [...selectedAttractions, id];
    // } else {
    //   selectedAttractions = selectedAttractions.filter((attId) => attId !== id);
    // }
    if (method === "add") {
      setSelectedAttractions([...selectedAttractions, id]);
    } else {
      setSelectedAttractions(selectedAttractions.filter((attId) => attId !== id));
    }
  };

  const flashMessageRef = useRef();

  return (
    <View style={styles.container}>
      {/* <ScrollView> */}
      {/* <NavigationEvents onWillFocus={Attraction.clearSearchResults} /> */}
      {searchErr ? (
        <Text style={{ paddingHorizontal: 20, color: "#FF0000", fontWeight: "bold" }}>
          {searchErr}
        </Text>
      ) : null}
      <Text style={styles.instructionsStyle}>Select Attractions to Add to the Tour </Text>
      <SearchBar
        containerStyle={styles.searchContainer}
        inputContainerStyle={{ backgroundColor: "white" }}
        leftIconContainerStyle={{ backgroundColor: "rgba(0,0,0,0)" }}
        inputStyle={{ backgroundColor: "rgba(0,0,0,0)" }}
        placeholder="Explore Attractions..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        returnKeyType={"search"}
        raised
        onSubmitEditing={onSubmitSearch}
        keyboardAppearance="dark"
      />

      <FlatList
        style={styles.attractionsList}
        data={Attraction.state.searchResults}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => {
          return (
            <AddAttractionTile
              navigation={navigation}
              key={item._id}
              updateArray={updateAddArray}
              selectedAttractions={selectedAttractions}
              attraction={item}
            />
          );
        }}
        ListFooterComponent={<View style={{ height: 80 }}></View>}
        // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      {/* {Attraction.state.searchResults.map((attraction) => {
          return (
            <AddAttractionTile
              navigation={navigation}
              key={attraction._id}
              updateArray={updateAddArray}
              selectedAttractions={selectedAttractions}
              attraction={attraction}
            />
          );
        })} */}

      {/* <Button
        title="Add Attractions"
        buttonStyle={[
          {
            backgroundColor: "#229186",
            marginVertical: 10,
            marginHorizontal: 90,
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 50,
          },
        ]}
        titleStyle={{ color: "#FDFFFC", fontWeight: "bold" }}
        onPress={onAddAttractions}
      /> */}

      <FloatingButton
        title="Add Attractions"
        onPress={onAddAttractions}
        // style={{ marginTop: 100 }}
      />

      {Attraction.state.isLoading || Tour.state.isLoading ? (
        <Modal animationType="none" transparent={true} visible={true}>
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#FF9F1C" />
          </View>
        </Modal>
      ) : null}
      {/* </ScrollView> */}
      <FlashMessage position={"top"} ref={flashMessageRef} />
    </View>

    // </View>
  );
};

TourAddAttractionScreen.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam("tourTitle"),
    headerBackTitle: " ",
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexDirection: "column",
    flex: 1,
  },
  instructionsStyle: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 18,
    color: "#011627",
  },
  searchContainer: {
    // marginTop: 30,
    backgroundColor: "rgba(0,0,0,0)",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },

  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(220,220,220,0.4)",
  },
});

export default withNavigationFocus(TourAddAttractionScreen);
