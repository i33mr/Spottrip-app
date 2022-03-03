import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

import { Image } from "react-native-expo-image-cache";

const TourAttractionTile = ({ attraction, removeAttraction, tourId }) => {
  return (
    <TouchableOpacity style={styles.elementView}>
      <Image
        style={styles.attractionImg}
        // {...{ uri }}
        uri={`http://8849-95-186-64-50.ngrok.io/img/attractions/${attraction.imageCover}`}
        preview={{
          uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        }}
      />

      <View style={styles.attractionDetail}>
        <Text h4 style={styles.elementDetailText}>
          {attraction.name}
        </Text>
        <View style={{ flexDirection: "column" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.elementDetailText}>{attraction.category}</Text>
            <Octicons name="primitive-dot" style={styles.dotStyle} color="#FFF" />
            <Text style={styles.elementDetailText}>{`${Math.floor(attraction.time / 60)}${
              attraction.time % 60 != 0 ? `:${attraction.time % 60}` : ""
            } hours`}</Text>
          </View>

          <Text style={styles.elementDetailText}>fsjd</Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
        }}
        onPress={() => removeAttraction(tourId, attraction._id)}
      >
        <View
          style={{
            backgroundColor: "#E71D36",
            padding: 5,
            borderRadius: 50,
          }}
        >
          <MaterialCommunityIcons name="close-thick" size={36} color="#FFF" />
        </View>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  elementView: {
    borderRadius: 15,
    backgroundColor: "#011627",
    marginTop: 10,
    flexDirection: "row",
  },
  attractionDetail: {
    resizeMode: "contain",

    fontWeight: "bold",
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    paddingRight: 10,
    // paddingBottom: 50,
  },
  AttractionDetali: {
    flex: 1,
  },
  elementDetailText: {
    color: "#FFF",
    fontWeight: "500",
    marginTop: 5,
  },
  dotStyle: {
    marginHorizontal: 5,
    marginTop: 3,
  },

  attractionImg: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    height: 150,
    width: 150,
    marginRight: 10,
  },
});

export default TourAttractionTile;
