import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native-expo-image-cache";
import { Context as TourContext } from "../context/TourContext";
import spottripAPI from "../api/spottripAPI";

const TourTile = ({ navigation, tour }) => {
  const { state, getTour, startLoading, stopLoading } = useContext(TourContext);
  const [validateTour, setValidateTour] = useState(false);

  const decideScreenNav = async () => {
    startLoading();
    const response = await spottripAPI.get(`v1/tours/${tour._id}`);
    const validTour = { ...response.data.data.tour };
    stopLoading();

    if (validTour.status === "Active")
      navigation.navigate("ActiveTour", { _id: validTour._id, tourTitle: validTour.title });
    else if (validTour.status === "Past") navigation.navigate("PastTour", { _id: validTour._id });
    else if (validTour.status === "Draft")
      navigation.navigate("TourCreate", { _id: validTour._id, tourTitle: validTour.title });
    else if (validTour.status === "Saved")
      navigation.navigate("TourOverview", {
        _id: validTour._id,
        tourTitle: validTour.title,
        method: validTour.timeToSpend ? "generate" : "manual",
      });

    // tour = state.tour;
    // if (state.tour.status === "Active")
    //   navigation.navigate("ActiveTour", { _id: state.tour._id, tourTitle: state.tour.title });
    // else if (state.tour.status === "Past") navigation.navigate("PastTour", { _id: state.tour._id });
    // else if (state.tour.status === "Draft")
    //   navigation.navigate("TourCreate", { _id: state.tour._id, tourTitle: state.tour.title });
    // else if (state.tour.status === "Saved")
    //   navigation.navigate("TourOverview", {
    //     _id: state.tour._id,
    //     tourTitle: state.tour.title,
    //     method: state.tour.timeToSpend ? "generate" : "manual",
    //   });
    // else if (tour.status === "Saved" && tour.attractions.length > 0 && tour.timeToSpend)
    //   return "TourSettings";
    // else if (tour.status === "Saved" && tour.attractions.length > 0 && !tour.timeToSpend)
    //   return "TourOverview";
  };

  // useEffect(() => {
  //   if (state.tour !== null) {

  //   }
  // },[state.tour])

  return (
    <TouchableOpacity
      onPress={decideScreenNav}
      style={tour.status === "Active" ? styles.tourItemActive : styles.tourItem}
    >
      <View style={styles.imgLayout}>
        {tour.attractions.map((attraction, index) => {
          if (index < 3)
            return (
              <Image
                style={styles.attractionImg}
                key={attraction._id.imageCover}
                uri={`http://2f00-151-255-174-169.ngrok.io/img/attractions/${attraction._id.imageCover}`}
                preview={{
                  uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
                }}
              />
            );
          else if (index === 3 && tour.attractions.length <= 4) {
            return (
              <Image
                style={styles.attractionImg}
                key={attraction._id.imageCover}
                uri={`http://2f00-151-255-174-169.ngrok.io/img/attractions/${attraction._id.imageCover}`}
                preview={{
                  uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
                }}
              />
            );
          } else if (index === 3 && tour.attractions.length > 4) {
            return (
              <View
                key={attraction._id.imageCover}
                style={[
                  styles.attractionImg,
                  {
                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ]}
              >
                <Text h1 style={{ color: "#FFF" }}>{`+${tour.attractions.length - 3}`}</Text>
              </View>
            );
          }
        })}
      </View>
      <View style={styles.tourDetail}>
        <Text style={[styles.tourTitle, { fontSize: 18 }]}>{tour.title}</Text>
        <Text style={[styles.tourTitle, { fontSize: 15 }]}>{`${tour.status} Tour`}</Text>
        {tour.guests.length ? <Text style={{ color: "#FFF", marginTop: 5 }}>Group:</Text> : null}
        {tour.guests.map((guest, index) => {
          if (index < 2)
            return (
              <Text key={guest._id} style={{ color: "#FF9F1C", marginTop: 5, fontSize: 13 }}>
                {`${guest.firstName} ${guest.lastName} ${
                  index === 1 ? `+${tour.guests.length - 2} ` : ""
                }`}
              </Text>
            );
        })}

        <View style={[styles.tourExtraDetail, { marginTop: 10 }]}>
          <AntDesign name="clockcircle" size={12} color="#FFF" />
          <Text style={{ color: "#FFF", fontSize: 12 }}>
            {" "}
            {`${Math.floor(tour.totalTime / 60)}${
              tour.totalTime % 60 < 10
                ? `:0${Math.floor(tour.totalTime % 60)}`
                : tour.totalTime % 60 > 10
                ? `:${Math.floor(tour.totalTime % 60)}`
                : ""
            } hours`}
          </Text>
        </View>
        <View style={styles.tourExtraDetail}>
          <Ionicons name="location-outline" size={12} color="#FFF" />
          <Text
            style={{ color: "#FFF", fontSize: 12 }}
          >{`${tour.attractions.length} Attractions`}</Text>
        </View>
        <View style={styles.tourExtraDetail}>
          <MaterialCommunityIcons name="road" size={12} color="#FFF" />
          <Text style={{ color: "#FFF", fontSize: 12 }}>
            {tour.totalDistance < 1000
              ? `${Math.floor(tour.totalDistance)} meters`
              : `${Math.floor(tour.totalDistance) / 1000.0} km`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexDirection: "column",
    flex: 1,
  },
  customHeader: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    flex: 1,
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
  toursList: {
    marginTop: 20,
    marginHorizontal: 10,
    // marginBottom: 70,
  },
  tourItem: {
    backgroundColor: "#011627",
    borderRadius: 15,
    marginBottom: 10,
    padding: 10,
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
  },
  tourItemActive: {
    backgroundColor: "#229186",
    borderRadius: 15,
    marginBottom: 10,
    padding: 10,
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
  },
  imgLayout: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-start",
    flexWrap: "wrap",
    // backgroundColor: "rgba(202,204,201, 0.4)",
    marginRight: 5,
  },
  attractionImg: {
    width: "50%",
    // width: 25,
    height: 80,
  },
  tourDetail: {
    // height: 70,
    fontWeight: "bold",
    width: 0,
    flexGrow: 1,
  },
  tourTitle: {
    fontWeight: "700",
    color: "#FFF",
  },
  tourExtraDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
    // flex: 1,
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
export default TourTile;
