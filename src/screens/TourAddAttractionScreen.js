import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from "react-native";
import { SearchBar, Button, Text, Icon, Input } from "react-native-elements";
import { Octicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const TourAddAttractionScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [isPrefPressed, setIsPrefPressed] = useState(false);
  const [isParksPressed, setIsParksPressed] = useState(false);
  const [isWaterPressed, setIsWaterPressed] = useState(true);

  return (
    <View style={styles.container}>
      <ScrollView>
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
        />

        <View>
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
        </View>
        <View>
          <TouchableOpacity style={styles.elementView}>
            <Image
              style={styles.attractionImg}
              source={require("../../assets/images/attractions/lepoh.png")}
            />
            <View style={styles.AttractionDetali}>
              <Text h4 style={styles.elementDetaliText}>
                Sungai Lepoh Waterfall
              </Text>
              <Text style={styles.elementDetaliText}>Waterfall </Text>
              <Text style={styles.elementDetaliText}>2:45 hours </Text>
            </View>
            <TouchableOpacity>
              <Ionicons
                name="checkmark-circle"
                size={48}
                color="#229186"
                style={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                  padding: 5,
                  borderRadius: 50,
                }}
              />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity style={styles.elementView}>
            <Image
              style={styles.attractionImg}
              source={require("../../assets/images/attractions/Serendah.png")}
            />
            <View style={styles.AttractionDetali}>
              <Text h4 style={styles.elementDetaliText}>
                Serendah Waterfall
              </Text>
              <Text style={styles.elementDetaliText}>Waterfall </Text>
              <Text style={styles.elementDetaliText}>2:15 hours </Text>
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
          </TouchableOpacity>
          <Button
            title="Add Attractions"
            buttonStyle={[
              // styles.buttonStyle,
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
            onPress={() => navigation.navigate("TourManualCreate")}
          />
        </View>
      </ScrollView>
    </View>
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
    color: "#E71D36",
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
    borderRadius: 15,
    backgroundColor: "#011627",
    marginTop: 10,
    flexDirection: "row",
    marginHorizontal: 10,
  },
  attractionImg: {
    // width: "100%",
    // height: "100%",
    // borderRadius: 15,
    marginRight: 15,
  },
  AttractionDetali: {
    flex: 1,
  },
  elementDetaliText: {
    color: "#FFF",
    fontWeight: "500",
    marginTop: 5,
  },
});

export default TourAddAttractionScreen;
