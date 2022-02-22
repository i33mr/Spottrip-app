import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { SliderBox } from "react-native-image-slider-box";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const AttractionDetailScreen = ({ navigation }) => {
  const images = [
    require("../../assets/images/attractions/batu-caves1.jpg"),
    require("../../assets/images/attractions/batu-caves2.jpg"),
    require("../../assets/images/attractions/batu-caves3.jpg"),
  ];

  return (
    <View>
      <SliderBox images={images} sliderBoxHeight={250} />
      <View style={styles.attractionDetail}>
        <AntDesign name="clockcircle" size={28} color="#011627" />
        <Text style={styles.attractionDetailText}>2 hours</Text>
        <MaterialCommunityIcons name="road" size={28} color="#011627" />
        <Text style={styles.attractionDetailText}>3 km</Text>
      </View>
      <View style={styles.attractionDetail}>
        <EvilIcons name="location" size={30} color="#011627" />
        <Text style={styles.attractionDetailText}>Kuala Lumpur</Text>
        <FontAwesome name="th-list" size={24} color="#011627" />
        <Text style={styles.attractionDetailText}>Historical</Text>
      </View>
      <Text h4 style={styles.attractionDescTitle}>
        Attraction Description
      </Text>
      <View
        style={{
          borderBottomColor: "#011627",
          borderBottomWidth: 1,
          marginHorizontal: 20,
          marginVertical: 10,
        }}
      />
      <Text style={styles.attractionDesc}>
        Batu Caves is a limestone hill that has a series of caves and cave temples in Gombak,
        Selangor, Malaysia. It takes its name from the Malay word batu, meaning 'rock'. The hill was
        originally known as Kapal Tanggang from the legend of Si Tanggang.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  imgSlider: {
    height: 250,
    // backgroundColor: "blue",
    borderRadius: 15,
    marginBottom: 10,
  },
  attractionImg: {
    width: "100%",
    height: "100%",
    // borderRadius: 15,
  },
  attractionDetail: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
  },
  attractionDetailText: {
    fontSize: 20,
    // marginRight: 80,
    width: 150,
    marginLeft: 10,
  },
  attractionDescTitle: {
    marginLeft: 20,
    fontWeight: "500",
  },
  attractionDesc: {
    marginHorizontal: 20,
    fontWeight: "500",
  },
});

AttractionDetailScreen.navigationOptions = ({ navigation }) => {
  const parent =
    navigation.dangerouslyGetParent().state.routes[
      navigation.dangerouslyGetParent().state.routes.length - 2
    ]["routeName"];
  return {
    title: "Batu Caves",
  };
};

export default AttractionDetailScreen;
