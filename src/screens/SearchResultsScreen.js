import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Modal, Text } from "react-native";
import SearchBar from "react-native-elements/dist/searchbar/SearchBar-ios";
import { ScrollView } from "react-native-gesture-handler";
import AttractionTile from "../components/AttractionTile";
import { Context as AttractionContext } from "../context/AttractionContext";
// import { SearchBar, Button } from "react-native-elements";

const SearchResultsScreen = ({ navigation }) => {
  const forwardedSearchTerm = navigation.getParam("forwardedSearchTerm");
  const longitudeLatitude = navigation.getParam("longitudeLatitude");
  const { state, searchAttractions } = useContext(AttractionContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchErr, setSearchErr] = useState("");

  const onSubmitSearch = () => {
    if (searchTerm === "") {
      setSearchErr("Please enter search term");
    } else {
      setSearchErr("");
      // navigation.navigate("SearchResults", { forwardedSearchTerm: searchTerm });
      searchAttractions(searchTerm);
    }
  };

  // console.log(state.searchResults);
  useEffect(() => {
    // console.log(forwardedSearchTerm);
    searchAttractions(forwardedSearchTerm, longitudeLatitude);
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {searchErr ? (
        <Text style={{ paddingHorizontal: 20, color: "#FF0000", fontWeight: "bold" }}>
          {searchErr}
        </Text>
      ) : null}
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
      />
      {state.searchResults.map((element) => {
        // console.log(element);
        return (
          <AttractionTile
            key={element._id}
            attractionName={element.name}
            category={element.category}
            imageCover={element.imageCover}
            time={element.time}
            distance={element.distance}
            navigation={navigation}
            Id={element._id}
          />
        );
      })}
      {state.isLoading ? (
        <Modal animationType="none" transparent={true} visible={true}>
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#FF9F1C" />
          </View>
        </Modal>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    // marginTop: 20,
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

SearchResultsScreen.navigationOptions = () => {
  return {
    title: "",
  };
};

export default SearchResultsScreen;
