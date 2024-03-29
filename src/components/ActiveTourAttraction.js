import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import GMaps_icon from "../../assets/images/google-maps.svg";
import { Octicons } from "@expo/vector-icons";
import moment from "moment";
import ActiveTourAttractionTravelTime from "./ActiveTourAttractionTravelTime";
import openMap from "react-native-open-maps";
import { TouchableOpacity } from "react-native-gesture-handler";

const ActiveTourAttraction = ({ attraction, index, tour }) => {
  return (
    <>
      <View style={styles.tourLocation}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#229186",
            width: "25%",
          }}
        >
          {`${moment(tour.startTime)
            .add(Math.round(attraction.startsAt), "minutes")
            .format("HH:mm")} - ${moment(tour.startTime)
            .add(Math.round(attraction.startsAt), "minutes")
            .add(Math.round(attraction._id.time), "minutes")
            .add(Math.round(attraction.extendedTime), "minutes")
            .format("HH:mm")}`}
        </Text>
        <Octicons name="primitive-dot" style={styles.dotStyle} size={40} />
        <View style={styles.tourLocationElement}>
          <Text style={{ color: "#FFF", fontSize: 20, fontWeight: "bold", flex: 1 }}>
            {attraction._id.name}
          </Text>
          <TouchableOpacity
            onPress={() =>
              // openMap({ latitude: 37.865101, longitude: -119.53833, provider: "google", zoom: 25 })
              openMap({
                latitude: attraction._id.location.coordinates[1],
                longitude: attraction._id.location.coordinates[0],
                provider: "google",
                zoom: 18,
              })
            }
          >
            <GMaps_icon style={{ flex: 1 }} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        {index < tour.attractions.length - 1 ? (
          <>
            <Octicons
              name="primitive-dot"
              style={[styles.dotStyle, { marginLeft: 99 }]}
              size={20}
            />
            <ActiveTourAttractionTravelTime
              minutes={
                Math.round(
                  tour.attractions[index + 1].startsAt -
                    attraction.startsAt -
                    attraction._id.time -
                    attraction.extendedTime
                ) % 60
              }
              hours={
                (tour.attractions[index + 1].startsAt -
                  attraction.startsAt -
                  attraction._id.time -
                  attraction.extendedTime) /
                60
              }
            />
            <Octicons
              name="primitive-dot"
              style={[styles.dotStyle, { marginLeft: 99 }]}
              size={20}
            />
          </>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tourLocation: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: -15,
  },
  dotStyle: {
    marginHorizontal: 5,
    // marginTop: 3,
    color: "#E71D36",
  },
  tourLocationElement: {
    backgroundColor: "#011627",
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
});
export default ActiveTourAttraction;
