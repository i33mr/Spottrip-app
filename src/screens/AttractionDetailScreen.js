import React, { useCallback, useContext, useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Modal as RNModal, ActivityIndicator } from "react-native";
import { Text } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Context as AttractionContext } from "../context/AttractionContext";
import { Image, CacheManager } from "react-native-expo-image-cache";
import { ScrollView } from "react-native-gesture-handler";
import spottripAPI from "../api/spottripAPI";
import { Accuracy, requestForegroundPermissionsAsync, watchPositionAsync } from "expo-location";
import useLocation from "../hooks/useLocation";
import { withNavigationFocus } from "react-navigation";

const AttractionDetailScreen = ({ navigation, isFocused }) => {
  const Id = navigation.getParam("_id");
  const { state } = useContext(AttractionContext);
  const [isLoading, setIsLoading] = useState(false);
  const [attraction, setAttraction] = useState(state.attractions.find((el) => el._id === Id));
  const [longitudeLatitude, setLongitudeLatitude] = useState("");

  let images;

  const callback = useCallback((location) => {
    // setLongitudeLatitude(`${location.coords.longitude},${location.coords.latitude}`);
    setLongitudeLatitude(`101.711309,3.15887`);
    console.log("AD still tracking");
  });
  const [err] = useLocation(isFocused, callback);

  useEffect(async () => {
    if (!attraction) setAttraction(state.searchResults.find((el) => el._id === Id));
    if (!attraction && longitudeLatitude) {
      const MAX_DISTANCE = 40008;
      setIsLoading(true);
      // const response = await spottripAPI.get(`/v1/attractions/${Id}`);
      const response = await spottripAPI.get(
        `/v1/attractions/attractions-within/${MAX_DISTANCE}/center/${longitudeLatitude}?_id=${Id}`
      );
      // console.log("res", response.data.data.data);
      setAttraction(response.data.data.data[0]);
      setIsLoading(false);

      // images = attraction.images.map((img) => {
      //   return img;
      // });
      // images.unshift(attraction.imageCover);
    }
  }, [longitudeLatitude]);

  const { width } = Dimensions.get("window");
  const height = width * 0.6;

  // console.log(state.attractions);
  if (attraction) {
    images = attraction.images.map((img) => {
      return img;
    });
    images.unshift(attraction.imageCover);
  }

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
      {attraction ? (
        <>
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
                    uri={`http://43ff-5-156-48-97.ngrok.io/img/attractions/${img}`}
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
        </>
      ) : null}
      {isLoading ? (
        <RNModal animationType="none" transparent={true} visible={true}>
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#FF9F1C" />
          </View>
        </RNModal>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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

  sliderContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width * 0.8,
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

export default withNavigationFocus(AttractionDetailScreen);
