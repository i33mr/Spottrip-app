import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from "react-native";
import { SearchBar, Button, Text } from "react-native-elements";
import { Accuracy, requestForegroundPermissionsAsync, watchPositionAsync } from "expo-location";

import { Context as AttractionContext } from "../context/AttractionContext";
import { NavigationEvents } from "react-navigation";

const HomeScreenHeader = ({ navigation, longitudeLatitude }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchErr, setSearchErr] = useState("");
  const { state, fetchAttractions, searchAttractions } = useContext(AttractionContext);

  const onSubmitSearch = () => {
    if (searchTerm === "") {
      setSearchErr("Please enter search term");
    } else {
      setSearchErr("");
      navigation.navigate("SearchResults", { forwardedSearchTerm: searchTerm });
      setSearchTerm("");
    }
  };

  // const [rerenderFlatList, setRerenderFlatList] = useState(false);

  const filterList = [
    { name: "Your Preferences", hook: useState(true) },
    { name: "Parks", hook: useState(false) },
    { name: "Historical", hook: useState(false) },
    { name: "Mountains", hook: useState(false) },
    { name: "Beach", hook: useState(false) },
    { name: "Museum", hook: useState(false) },
    { name: "Zoo", hook: useState(false) },
    { name: "Sport", hook: useState(false) },
    { name: "Markets", hook: useState(false) },
    { name: "Festivals", hook: useState(false) },
    { name: "Malls", hook: useState(false) },
    { name: "Cultural", hook: useState(false) },
    { name: "Unique", hook: useState(false) },
  ];

  let queryCategories = [];
  useEffect(
    () => {
      queryCategories = [];
      filterList.forEach((element) => {
        if (element.hook[0]) {
          if (element.name !== "Your Preferences") queryCategories.push(element.name);
          else {
            queryCategories.push("Preferences");
          }
        }
      });
      const queryString = `category[in]=${queryCategories.join(",")}`;
      fetchAttractions(queryCategories.length > 0 ? queryString : "", longitudeLatitude);
      setSearchErr("");
    },
    filterList.map((el) => {
      return el.hook[0];
    })
  );

  const isFilterSelected = (filter) => {
    return filterList.filter((obj) => {
      return obj.name === filter.name;
    })[0].hook[0];
  };
  return (
    <>
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
      {searchErr ? (
        <Text style={{ paddingHorizontal: 20, color: "#FF0000", fontWeight: "bold" }}>
          {searchErr}
        </Text>
      ) : null}

      <View style={{ marginVertical: 10 }}>
        <FlatList
          // scrollEnabled={false}
          disableVirtualization
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filterList}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => {
            return (
              <Button
                buttonStyle={
                  // styles.buttonStylePressed
                  isFilterSelected(item) ? styles.buttonStylePressed : styles.buttonStyle
                }
                onPress={() => {
                  item.hook[1](!isFilterSelected(item));
                }}
                title={item.name}
                titleStyle={{ fontWeight: "bold" }}
              />
            );
          }}
          // extraData={rerenderFlatList}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    marginTop: 20,
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
});

export default HomeScreenHeader;
