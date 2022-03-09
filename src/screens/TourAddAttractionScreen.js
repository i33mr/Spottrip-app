import React, { useState, useContext } from "react";
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

const TourAddAttractionScreen = ({ navigation }) => {
  const tourId = navigation.getParam("_id");

  // const { state, searchAttractionsToAddToTour } = useContext(AttractionContext);
  const Attraction = useContext(AttractionContext);
  const Tour = useContext(TourContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchErr, setSearchErr] = useState("");
  // const [selectedAttractions, setSelectedAttractions] = useState([]);

  let selectedAttractions = [];
  const onSubmitSearch = () => {
    if (searchTerm === "") {
      setSearchErr("Please enter search term");
    } else {
      setSearchErr("");
      // navigation.navigate("SearchResults", { forwardedSearchTerm: searchTerm });
      // console.log(tourId);
      Attraction.searchAttractionsToAddToTour(searchTerm, tourId);
    }
  };

  const onAddAttractions = async () => {
    console.log(selectedAttractions);
    if (!selectedAttractions.length) {
      setSearchErr("Please select at least one attraction to add, or go back to view your tour");
    } else {
      try {
        await Tour.addAttractions(tourId, selectedAttractions);
        navigation.navigate("TourOverview");
      } catch (error) {
        showMessage({
          message: "Couldn't add attraction",
          description: error.message,
          type: "danger",
          duration: 4000,
          // floating: true,
        });
      }
    }
  };

  const updateAddArray = (method, id) => {
    if (method === "add") {
      selectedAttractions = [...selectedAttractions, id];
    } else {
      selectedAttractions = selectedAttractions.filter((attId) => attId !== id);
    }
    console.log(selectedAttractions);
  };
  return (
    // <View style={styles.container}>
    <ScrollView style={styles.container}>
      <NavigationEvents onWillFocus={Attraction.clearSearchResults} />
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
        // keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
        keyboardAppearance="dark"
      />

      {/* <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[
              {
                item: (
                  <Button
                    buttonStyle={isPrefPressed ? styles.buttonStylePressed : styles.buttonStyle}
                    onPress={() => {
                      setIsPrefPressed(!isPrefPressed);
                    }}
                    title="Your preferences"
                    titleStyle={{ fontWeight: "bold" }}
                  />
                ),
                key: 1,
              },
              {
                item: (
                  <Button
                    buttonStyle={isParksPressed ? styles.buttonStylePressed : styles.buttonStyle}
                    onPress={() => {
                      setIsParksPressed(!isParksPressed);
                    }}
                    title="Parks"
                    titleStyle={{ fontWeight: "bold" }}
                  />
                ),
                key: 2,
              },
              {
                item: (
                  <Button
                    buttonStyle={isWaterPressed ? styles.buttonStylePressed : styles.buttonStyle}
                    onPress={() => {
                      setIsWaterPressed(!isWaterPressed);
                    }}
                    title="Waterfalls"
                    titleStyle={{ fontWeight: "bold" }}
                  />
                ),
                key: 3,
              },
            ]}
            renderItem={({ item }) => item.item}
          />
        </View> */}
      {Attraction.state.searchResults.map((attraction) => {
        // console.log(attraction);
        return (
          <AddAttractionTile
            key={attraction._id}
            updateArray={updateAddArray}
            selectedAttractions={selectedAttractions}
            // setSelectedAttractions={setSelectedAttractions}
            attraction={attraction}
          />
          // <TouchableOpacity key={attraction._id} style={styles.elementView}>
          //   <Image
          //     style={styles.attractionImg}
          //     // {...{ uri }}
          //     uri={`http://2f00-151-255-174-169.ngrok.io/img/attractions/${attraction.imageCover}`}
          //     preview={{
          //       uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
          //     }}
          //   />
          //   {/* <Image
          //     style={styles.attractionImg}
          //     source={require("../../assets/images/attractions/lepoh.png")}
          //   /> */}
          //   <View style={styles.AttractionDetail}>
          //     <Text h4 style={styles.elementDetailText}>
          //       {attraction.name}
          //     </Text>
          //     <Text style={styles.elementDetailText}> {attraction.category}</Text>
          //     <Text style={styles.elementDetailText}>
          //       {`${Math.floor(attraction.time / 60)}${
          //         attraction.time % 60 != 0 ? `:${attraction.time % 60}` : ""
          //       } hours`}{" "}
          //     </Text>
          //   </View>
          //   <TouchableOpacity>
          //     <Ionicons
          //       name="checkmark-circle"
          //       size={48}
          //       color="#229186"
          //       style={{
          //         position: "absolute",
          //         bottom: 5,
          //         right: 10,
          //         // padding: 5,
          //         borderRadius: 50,
          //         // marginTop: 10,
          //       }}
          //     />
          //   </TouchableOpacity>
          // </TouchableOpacity>
        );
      })}
      {/* <TouchableOpacity style={styles.elementView}>
          <Image
            style={styles.attractionImg}
            source={require("../../assets/images/attractions/Serendah.png")}
          />
          <View style={styles.AttractionDetail}>
            <Text h4 style={styles.elementDetailText}>
              Serendah Waterfall
            </Text>
            <Text style={styles.elementDetailText}>Waterfall </Text>
            <Text style={styles.elementDetailText}>2:15 hours </Text>
          </View>
          <TouchableOpacity>
            <Ionicons
              name="checkmark-circle"
              size={48}
              color="#FFF"
              style={{
                position: "absolute",
                bottom: 10,
                right: 10,
                padding: 5,
                borderRadius: 50,
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity> */}
      <Button
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
        // onPress={() => navigation.navigate("TourOverview")}
        onPress={onAddAttractions}
      />
      {Attraction.state.isLoading || Tour.state.isLoading ? (
        <Modal animationType="none" transparent={true} visible={true}>
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#FF9F1C" />
          </View>
        </Modal>
      ) : null}
      {/* {console.log("Do we reach add?")} */}

      <FlashMessage position="top" />
    </ScrollView>

    // </View>
  );
};

TourAddAttractionScreen.navigationOptions = () => {
  return {
    title: "Tour Title",
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

  buttonStyle: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: "#CACCC9",
  },
  buttonStylePressed: {
    // marginBottom: 10,
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: "red",
  },

  elementView: {
    // height: 200,
    borderRadius: 15,
    backgroundColor: "#011627",
    marginTop: 10,
    flexDirection: "row",
    marginHorizontal: 10,

    // borderRadius: 15,
    // backgroundColor: "#011627",
    // marginTop: 10,
    // flexDirection: "row",
  },
  attractionImg: {
    // height: "100%",
    height: 150,
    width: 170,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    marginRight: 15,
  },
  AttractionDetail: {
    flex: 1,
    paddingBottom: 10,
  },
  elementDetailText: {
    color: "#FFF",
    fontWeight: "500",
    marginTop: 5,
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

export default TourAddAttractionScreen;
