import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Image } from "react-native-expo-image-cache";
import { SearchBar, Button, Text, Icon, Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

const AddAttractionTile = ({ attraction, updateArray }) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (selected) {
      updateArray("add", attraction._id);
    } else {
      updateArray("remove", attraction._id);
    }
  }, [selected]);
  return (
    <TouchableOpacity style={styles.elementView}>
      <Image
        style={styles.attractionImg}
        // {...{ uri }}
        uri={`http://2f00-151-255-174-169.ngrok.io/img/attractions/${attraction.imageCover}`}
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
  container: {
    backgroundColor: "#FFF",
    flexDirection: "column",
    flex: 1,
  },
  instructionsStyle: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 18,
    color: "#011627",
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
});

export default AddAttractionTile;
