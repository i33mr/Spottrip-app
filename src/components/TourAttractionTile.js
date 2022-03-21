import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

import { Image } from "react-native-expo-image-cache";

const TourAttractionTile = ({ attraction, removeAttraction, tourId, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.elementView}
      onPress={() =>
        navigation.navigate("AttractionDetail", {
          _id: attraction._id._id,
          title: attraction._id.name,
        })
      }
    >
      <Image
        style={styles.attractionImg}
        // {...{ uri }}
        uri={`http://43ff-5-156-48-97.ngrok.io/img/attractions/${attraction._id.imageCover}`}
        preview={{
          uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        }}
      />

      <View style={styles.attractionDetail}>
        <Text h4 style={styles.elementDetailText}>
          {attraction._id.name}
        </Text>
        <View style={{ flexDirection: "column" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.elementDetailText}>{attraction._id.category}</Text>
            <Octicons name="primitive-dot" style={styles.dotStyle} color="#FFF" />
            <Text style={styles.elementDetailText}>{`${Math.floor(attraction._id.time / 60)}${
              attraction._id.time % 60 != 0 ? `:${attraction._id.time % 60}` : ""
            } hours`}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.elementDetailText}>
              {attraction.addBy !== "Auto generated"
                ? `Added By: ${attraction.addBy}`
                : attraction.addBy}
            </Text>
          </View>
        </View>
      </View>
      {/* <View>

      </View> */}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          // width: 45,
          // marginLeft: 300,
        }}
        onPress={() => removeAttraction(attraction._id._id)}
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
