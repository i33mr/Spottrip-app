import React, { useContext, useEffect } from "react";
import { View, StyleSheet, ScrollView, Modal, ActivityIndicator } from "react-native";
import { Button, Text, Input } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import GMaps_icon from "../../assets/images/google-maps.svg";
import { EvilIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Context as TourContext } from "../context/TourContext";
import { Context as NotificationContext } from "../context/NotificationContext";
import TourSummaryBar from "../components/TourSummaryBar";
import moment from "moment";
import ActiveTourAttraction from "../components/ActiveTourAttraction";
import ActiveTourAttractionTravelTime from "../components/ActiveTourAttractionTravelTime";
import { NavigationEvents } from "react-navigation";

const ActiveTourScreen = ({ navigation }) => {
  const tourId = navigation.getParam("_id");
  const { state, getTour, updateTourStatus } = useContext(TourContext);
  const Notification = useContext(NotificationContext);

  useEffect(async () => {
    getTour(tourId);
    // await Notification.resetLocalNotifications(state.tours);
  }, []);

  const finishTour = async () => {
    await updateTourStatus(tourId, "Past");
    navigation.navigate("TourList");
  };
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <NavigationEvents
          onWillFocus={state.tours.forEach((element) => {
            console.log(element.title, element.status);
          })}
        /> */}
        {state.tour !== null ? (
          <>
            <Text
              style={{
                alignSelf: "center",
                fontSize: 18,
                marginTop: 10,
                color: "#229186",
                fontWeight: "900",
              }}
            >
              {moment(state.tour.startTime).format("YYYY-MM-DD")}
            </Text>
            <View style={styles.tourDetails}>
              <TourSummaryBar tour={state.tour} />
            </View>

            {state.tour.startLocation.coordinates.length ? (
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
                    {`${moment(state.tour.startTime).format("HH:mm")}`}
                  </Text>
                  <Octicons name="primitive-dot" style={styles.dotStyle} size={40} />
                  <View style={styles.tourLocationElement}>
                    <Text style={{ color: "#FFF", fontSize: 20, fontWeight: "bold" }}>
                      Start location
                    </Text>
                  </View>
                </View>
                <View>
                  <Octicons
                    name="primitive-dot"
                    style={[styles.dotStyle, { marginLeft: 99 }]}
                    size={20}
                  />
                  <ActiveTourAttractionTravelTime
                    minutes={Math.round(state.tour.attractions[0].startsAt) % 60}
                    hours={state.tour.attractions[0].startsAt / 60}
                  />

                  <Octicons
                    name="primitive-dot"
                    style={[styles.dotStyle, { marginLeft: 99 }]}
                    size={20}
                  />
                </View>
              </>
            ) : null}

            {state.tour.attractions.map((attraction, index) => {
              return (
                <ActiveTourAttraction
                  key={attraction._id._id}
                  attraction={attraction}
                  index={index}
                  tour={state.tour}
                />
              );
            })}

            {state.tour.finishLocation.coordinates.length ? (
              <>
                <View>
                  <Octicons
                    name="primitive-dot"
                    style={[styles.dotStyle, { marginLeft: 99 }]}
                    size={20}
                  />
                  <ActiveTourAttractionTravelTime
                    minutes={
                      Math.round(
                        state.tour.totalTime -
                          state.tour.attractions[state.tour.attractions.length - 1].startsAt -
                          state.tour.attractions[state.tour.attractions.length - 1]._id.time
                      ) % 60
                    }
                    hours={
                      (state.tour.totalTime -
                        state.tour.attractions[state.tour.attractions.length - 1].startsAt -
                        state.tour.attractions[state.tour.attractions.length - 1]._id.time) /
                      60
                    }
                  />

                  <Octicons
                    name="primitive-dot"
                    style={[styles.dotStyle, { marginLeft: 99 }]}
                    size={20}
                  />
                </View>
                <View style={styles.tourLocation}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: "#229186",
                      width: "25%",
                    }}
                  >
                    {`${moment(state.tour.startTime)
                      .add(state.tour.totalTime, "minutes")
                      .format("HH:mm")}`}
                  </Text>
                  <Octicons name="primitive-dot" style={styles.dotStyle} size={40} />
                  <View style={styles.tourLocationElement}>
                    <Text style={{ color: "#FFF", fontSize: 20, fontWeight: "bold" }}>
                      Finish location
                    </Text>
                  </View>
                </View>
              </>
            ) : null}
          </>
        ) : null}

        <Button
          title="End Tour Now"
          buttonStyle={styles.buttonStyle}
          titleStyle={{ fontSize: 20, fontWeight: "600" }}
          onPress={finishTour}
        />
        {state.isLoading ? (
          <Modal animationType="none" transparent={true} visible={true}>
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="#FF9F1C" />
            </View>
          </Modal>
        ) : null}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexDirection: "column",
    flex: 1,
    paddingHorizontal: 10,
  },
  tourDetails: {
    backgroundColor: "#FF9F1C",
    // height: 50,
    marginTop: 10,
    marginBottom: 25,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

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
    // marginLeft: 15,
    backgroundColor: "#011627",
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },

  buttonStyle: {
    marginHorizontal: 80,
    paddingVertical: 20,
    borderRadius: 50,
    backgroundColor: "#E71D36",
    marginVertical: 30,
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

ActiveTourScreen.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam("tourTitle"),
    headerBackTitle: " ",
    headerRight: () => (
      <Button
        icon={<MaterialCommunityIcons name="bell" size={24} color="#229186" />}
        type="clear"
      />
    ),
  };
};

export default ActiveTourScreen;
