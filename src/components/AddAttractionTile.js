import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Image } from "react-native-expo-image-cache";
import { SearchBar, Button, Text, Icon, Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

const AddAttractionTile = ({ attraction, updateArray, navigation }) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (selected) {
      updateArray("add", attraction._id);
    } else {
      updateArray("remove", attraction._id);
    }
  }, [selected]);
  return (
    <TouchableOpacity
      style={styles.elementView}
      onPress={() =>
        navigation.navigate("AttractionDetail", {
          _id: attraction._id,
          title: attraction.name,
        })
      }
    >
      <Image
        style={styles.attractionImg}
        // {...{ uri }}
        uri={`http://b63d-64-137-228-4.ngrok.io/img/attractions/${attraction.imageCover}`}
        preview={{
          uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        }}
      />
      {/* <Image
              style={styles.attractionImg}
              source={require("../../assets/images/attractions/lepoh.png")}
            /> */}
      <View style={styles.AttractionDetail}>
        <Text h4 style={styles.elementDetailText}>
          {attraction.name}
        </Text>
        <Text style={styles.elementDetailText}> {attraction.category}</Text>
        <Text style={styles.elementDetailText}>
          {`${Math.floor(attraction.time / 60)}${
            attraction.time % 60 != 0 ? `:${attraction.time % 60}` : ""
          } hours`}{" "}
        </Text>
      </View>
      <TouchableOpacity>
        <Ionicons
          name="checkmark-circle"
          size={48}
          color={selected ? "#229186" : "#FFF"}
          style={{
            position: "absolute",
            bottom: 5,
            right: 10,
            // padding: 5,
            borderRadius: 50,
            // marginTop: 10,
          }}
          onPress={() => setSelected(!selected)}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  elementView: {
    // height: 200,
    borderRadius: 15,
    backgroundColor: "#011627",
    marginTop: 10,
    flexDirection: "row",
    marginHorizontal: 10,

    // borderRadius: 15,
    // backgroundColor: "#011627",
    // marginTop: 10,
    // flexDirection: "row",
  },
  attractionImg: {
    // height: "100%",
    height: 150,
    width: 170,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    marginRight: 15,
  },
  AttractionDetail: {
    flex: 1,
    paddingBottom: 10,
  },
  elementDetailText: {
    color: "#FFF",
    fontWeight: "500",
    marginTop: 5,
  },
});

export default AddAttractionTile;
