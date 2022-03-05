import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text } from "react-native-elements";
import { SliderBox } from "react-native-image-slider-box";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Context as AttractionContext } from "../context/AttractionContext";
import { Image, CacheManager } from "react-native-expo-image-cache";
import { ScrollView } from "react-native-gesture-handler";

const AttractionDetailScreen = ({ navigation }) => {
  const { state } = useContext(AttractionContext);
  const Id = navigation.getParam("_id");
  let attraction = state.attractions.find((el) => el._id === Id);
  if (!attraction) attraction = state.searchResults.find((el) => el._id === Id);
  const { width } = Dimensions.get("window");
  const height = width * 0.6;

  // console.log(state.attractions);
  const images = attraction.images.map((img) => {
    return img;
  });
  images.unshift(attraction.imageCover);

  const [activeSlide, setActiveSlide] = useState(0);

  const changeSlide = ({ nativeEvent }) => {
    const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
    // console.log(slide);
    if (slide !== activeSlide) {
      setActiveSlide(slide);
    }
  };

  // useEffect(() => {
  //   CacheManager.clearCache();
  // }, []);
  // CacheManager.clearCache();

  return (
    // <View>
    <ScrollView>
      {/* <SliderBox imageComponent={Image} images={images} sliderBoxHeight={250} /> */}
      {/* {console.log(Id)} */}
      <View style={styles.sliderContainer}>
        <ScrollView
          pagingEnabled
          horizontal
          onScroll={changeSlide}
          scrollEventThrottle={30}
          showsHorizontalScrollIndicator={false}
          style={styles.sliderContainer}
        >
          {images.map((img) => {
            return (
              <Image
                style={styles.sliderContainer}
                key={img}
                uri={`http://2f00-151-255-174-169.ngrok.io/img/attractions/${img}`}
                // defaultSource={require("../../assets/default-loading-image.png")}
                // preview={{

                // }}
                preview={{
                  uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
                }}
              />
            );
          })}
        </ScrollView>
        <View style={styles.scrollDot}>
          {images.map((img, i) => (
            <Text
              key={i}
              style={i === activeSlide ? styles.scrollDotTextActive : styles.scrollDotText}
            >
              ⬤
            </Text>
          ))}
        </View>
      </View>
      <View style={styles.attractionDetail}>
        <AntDesign name="clockcircle" size={28} color="#011627" />
        <Text style={styles.attractionDetailText}>{`${Math.floor(attraction.time / 60)}${
          attraction.time % 60 != 0 ? `:${attraction.time % 60}` : ""
        } hours`}</Text>
        <MaterialCommunityIcons name="road" size={28} color="#011627" />
        <Text style={styles.attractionDetailText}>
          {attraction.distance < 1
            ? `${Math.floor(attraction.distance * 1000)} meters`
            : `${Math.floor(attraction.distance * 100) / 100.0} km`}
        </Text>
      </View>
      <View style={styles.attractionDetail}>
        <EvilIcons name="location" size={30} color="#011627" />
        <Text style={styles.attractionDetailText}>{attraction.city}</Text>
        <FontAwesome name="th-list" size={24} color="#011627" />
        <Text style={styles.attractionDetailText}>{attraction.category}</Text>
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
      <Text style={styles.attractionDesc}>{attraction.description}</Text>
      {/* </View> */}
    </ScrollView>
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
  attractionImg: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  sliderContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width * 0.6,
  },
  scrollDot: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  scrollDotText: {
    color: "#888",
    margin: 5,
  },
  scrollDotTextActive: {
    color: "#FFF",
    margin: 5,
  },
});

AttractionDetailScreen.navigationOptions = ({ navigation }) => {
  const title = navigation.getParam("title");

  const parent =
    navigation.dangerouslyGetParent().state.routes[
      navigation.dangerouslyGetParent().state.routes.length - 2
    ]["routeName"];
  return {
    title,
  };
};

export default AttractionDetailScreen;
