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
});

export default TourSummaryBar;
