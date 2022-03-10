import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
const TourSummaryBar = ({ tour }) => {
  return (
    <View style={styles.tourDetails}>
      <AntDesign name="clockcircle" size={24} color="#011627" />
      <Text style={styles.attractionDetailText}>
        {` ${Math.floor(tour.totalTime / 60)}${
          tour.totalTime % 60 < 10
            ? `:0${Math.floor(tour.totalTime % 60)}`
            : tour.totalTime % 60 > 10
            ? `:${Math.floor(tour.totalTime % 60)}`
            : ""
        } hours`}
      </Text>
      <EvilIcons name="location" size={28} color="#011627" />
      <Text style={styles.attractionDetailText}>{`${tour.attractions.length} Attractions`}</Text>
      <MaterialCommunityIcons name="road" size={28} color="#011627" />
      <Text style={styles.attractionDetailText}>
        {tour.totalDistance < 1000
          ? `${Math.floor(tour.totalDistance)} meters`
          : `${Math.floor(tour.totalDistance) / 1000.0} km`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexDirection: "column",
    flex: 1,
    paddingHorizontal: 10,
  },
  addFriendButtonStyle: {
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: "#011627",
    marginVertical: 10,
  },
  addFriendView: {
    backgroundColor: "#011627",
    borderRadius: 15,
    marginTop: 10,
  },
  usernameInputStyle: {
    paddingVertical: 15,
    borderRadius: 50,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    marginTop: 10,
  },
  inviteButtonStyle: {
    marginHorizontal: 80,
    paddingVertical: 10,
    borderRadius: 50,
    backgroundColor: "#229186",
    marginBottom: 20,
  },
  showElementsButtonStyle: {
    borderColor: "red",
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginLeft: -10,
  },
  elementView: {
    borderRadius: 15,
    backgroundColor: "#011627",
    marginTop: 10,
    flexDirection: "row",
  },
  friendImg: {
    marginHorizontal: 5,
  },
  AttractionDetali: {
    flex: 1,
  },
  elementDetaliText: {
    color: "#FFF",
    fontWeight: "500",
    marginTop: 5,
  },
  dotStyle: {
    marginHorizontal: 5,
    marginTop: 3,
  },
  buttonStyle: {
    // width: 170,
    // height: 70,
    // flex: 1,
    // alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 50,
  },
  buttonGroup: {
    marginVertical: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  attractionImg: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    height: 150,
    width: 150,
    marginRight: 10,
  },
  tourDetails: {
    backgroundColor: "#FF9F1C",
    // height: 50,
    // marginBottom: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  attractionDetailText: {
    fontSize: 14,
    fontWeight: "bold",
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
  error: {
    color: "#E71D36",
    paddingHorizontal: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  success: {
    color: "#229186",
    paddingHorizontal: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default TourSummaryBar;
