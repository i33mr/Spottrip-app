import React from "react";
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Text } from "react-native-elements";
import { Octicons } from "@expo/vector-icons";
import { Image } from "react-native-expo-image-cache";

const AttractionTile = ({
  navigation,
  attractionName,
  category,
  imageCover,
  time,
  distance,
  Id,
}) => {
  return (
    <TouchableOpacity
      style={styles.attractionItem}
      onPress={() => navigation.navigate("AttractionDetail", { _id: Id, title: attractionName })}
    >
      <Image
        style={styles.attractionImg}
        // {...{ uri }}
        uri={`http://ef98-2001-f40-935-492-70cd-9dd8-7fa2-beea.ngrok.io/img/attractions/${imageCover}`}
        preview={{
          uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        }}
      />

      <View style={styles.attractionDetail}>
        <View style={{ flexDirection: "row" }}>
          <Text>{category}</Text>
          <Octicons name="primitive-dot" style={styles.dotStyle} />
          <Text>{`${Math.floor(time / 60)}${time % 60 != 0 ? `:${time % 60}` : ""} hours`}</Text>
          <Octicons name="primitive-dot" style={styles.dotStyle} />
          <Text>
            {distance < 1
              ? `${Math.floor(distance * 1000)} meters`
              : `${Math.floor(distance * 100) / 100.0} km`}
          </Text>
        </View>
        <Text h3 style={styles.attractionTitle}>
          {attractionName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  attractionItem: {
    height: 200,
    // backgroundColor: "blue",
    borderRadius: 15,
    marginBottom: 10,
    marginHorizontal: 10,
    // flexDirection: "row",
  },
  attractionImg: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  attractionDetail: {
    position: "absolute",
    alignSelf: "center",
    bottom: 0,
    resizeMode: "contain",
    // marginTop: -70,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    // height: 70,
    padding: 10,
    fontWeight: "bold",
    // justifyContent:""
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  dotStyle: {
    marginHorizontal: 5,
    marginTop: 3,
  },
  attractionTitle: {
    fontWeight: "600",
    // padding: 10,
    // flexWrap: "wrap",
  },
});

export default AttractionTile;
