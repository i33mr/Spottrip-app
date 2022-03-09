import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { Octicons } from "@expo/vector-icons";
import moment from "moment";

const ActiveTourAttractionTravelTime = ({ minutes, hours }) => {
  return (
    <View style={styles.locationTravelTime}>
      <Text style={{ fontSize: 11, color: "#FF9F1C", width: "26.4%" }}>
        {`${moment({
          minutes: minutes,
          hours: hours,
        }).format("HH:mm")} hours travel`}
      </Text>
      <Octicons name="primitive-dot" style={[styles.dotStyle, {}]} size={20} />
    </View>
  );
};
const styles = StyleSheet.create({
  locationTravelTime: {
    flexDirection: "row",
  },
  dotStyle: {
    marginHorizontal: 5,
    color: "#E71D36",
  },
});
export default ActiveTourAttractionTravelTime;
