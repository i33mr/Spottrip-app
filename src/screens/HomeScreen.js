import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  LogBox,
} from "react-native";
import { Button, Text, Input } from "react-native-elements";
// import _mockLocation from "../_mockLocation"; // only for testing, don't include in deployment
import * as Notifications from "expo-notifications";

import { Context as AttractionContext } from "../context/AttractionContext";
// import { Context as NotificationContext } from "../context/NotificationContext";
import { MaterialIcons } from "@expo/vector-icons";

import Modal from "react-native-modal";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AttractionTile from "../components/AttractionTile";
import HomeScreenHeader from "../components/HomeScreenHeader";
import FloatingButton from "../components/FloatingButton";
import FlashMessage from "react-native-flash-message";
import { withNavigationFocus } from "react-navigation";
import { Accuracy, requestForegroundPermissionsAsync, watchPositionAsync } from "expo-location";
import useLocation from "../hooks/useLocation";
import No_results_icon from "../../assets/images/no-results.svg";
import Svg from "react-native-svg";
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

const HomeScreen = ({ isFocused, navigation }) => {
  LogBox.ignoreAllLogs(true);

  const Attraction = useContext(AttractionContext);
  const [isModalVisible, setModalVisible] = useState(false);
  // const [locationErr, setLocationErr] = useState(null);
  const [longitudeLatitude, setLongitudeLatitude] = useState("");
  const [newTourTitle, setNewTourTitle] = useState("");
  const [newTourTitleError, setNewTourTitleError] = useState("");
  const responseListener = useRef();

  // console.log(isFocused);
  const callback = useCallback((location) => {
    // console.log(location);
    // addLocation(location, state.recording);
    // setLongitudeLatitude(`${location.coords.longitude},${location.coords.latitude}`);
    setLongitudeLatitude(`101.711309,3.15887`);
    console.log("HOME still tracking");
  });
  const [locationErr] = useLocation(isFocused, callback);
  const [refreshing, setRefreshing] = useState(false);

  // const startWatchingLocation = async () => {
  //   try {
  //     const { granted } = await requestForegroundPermissionsAsync();
  //     // How accurate the location is, timeInterval is checking the location every 1 second, distanceInterval checks every 10 meters
  //     await watchPositionAsync(
  //       {
  //         accuracy: Accuracy.BestForNavigation,
  //         // timeInterval: 100000,
  //         distanceInterval: 100,
  //       },
  //       (location) => {
  //         // setLongitudeLatitude(`${location.coords.longitude},${location.coords.latitude}`);
  //         setLongitudeLatitude(`101.711309,3.15887`);
  //       }
  //     );
  //     if (!granted) {
  //       throw new Error("Location permission not granted");
  //     }
  //   } catch (e) {
  //     setLocationErr(e);
  //   }
  // };

  // const registerForPushNotificationsAsync = async () => {
  //   let token;
  //   const { status: existingStatus } = await Notifications.getPermissionsAsync();
  //   let finalStatus = existingStatus;
  //   if (existingStatus !== "granted") {
  //     const { status } = await Notifications.requestPermissionsAsync();
  //     finalStatus = status;
  //   }
  //   if (finalStatus !== "granted") {
  //     alert("Failed to get push token for push notification!");
  //     return;
  //   }
  //   token = (await Notifications.getExpoPushTokenAsync()).data;
  //   console.log(token);

  //   if (Platform.OS === "android") {
  //     Notifications.setNotificationChannelAsync("default", {
  //       name: "default",
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: "#FF231F7C",
  //     });
  //   }

  //   return token;
  // };

  useEffect(async () => {
    // const token = await registerForPushNotificationsAsync();
    // Notification.setNotificationToken(token);
    // Notification.addLocalNotification();
    // console.log(await Notifications.getAllScheduledNotificationsAsync());

    // This listener is fired whenever a notification is received while the app is foregrounded
    // notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
    //   setNotification(notification);
    // });

    // // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      if (response.notification.request.content.data.screen === "Invites")
        navigation.navigate(response.notification.request.content.data.screen);
      else if (response.notification.request.content.data.screen === "ActiveTour")
        navigation.navigate(response.notification.request.content.data.screen, {
          _id: response.notification.request.content.data._id,
          tourTitle: response.notification.request.content.data.tourTitle,
        });
      // console.log(response);
      // console.log(response.notification.request.content.data.screen);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // useEffect(() => {
  //   // console.log("KEKW");
  //   startWatchingLocation();
  // }, []);

  const createNewTour = () => {
    toggleModal();

    navigation.navigate("TourCreate", { tourTitle: newTourTitle, newTour: true });

    setNewTourTitle("");
    setNewTourTitleError("");
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const onRefresh = () => {
    setRefreshing(true);
    // fetchTourInvites(tourId);
    // fetchUserInvites();
    // fetchToursAndSetNotifications();
    // Attraction.fetchAttractions

    setRefreshing(false);
  };
  return (
    <View style={styles.container}>
      <Modal isVisible={isModalVisible} avoidKeyboard={true}>
        <View style={styles.modalStyle}>
          <Button
            icon={<MaterialCommunityIcons name="close-thick" size={36} color="#FFF" />}
            iconPosition="left"
            onPress={toggleModal}
            type="clear"
            style={{ width: 50 }}
          />
          <Text style={styles.modalTextStyle}>Enter Tour Title</Text>
          {newTourTitleError ? (
            <Text
              style={{ color: "#E71D36", marginTop: 15, alignSelf: "center", fontWeight: "bold" }}
            >
              {newTourTitleError}
            </Text>
          ) : null}

          <Input
            inputStyle={styles.modalInputStyle}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            style={{ marginBottom: 0 }}
            value={newTourTitle}
            onChangeText={setNewTourTitle}
          />
          {/* <Button title="Create New Tour" onPress={toggleModal} /> */}
          <Button
            title="Create New Tour"
            buttonStyle={[styles.modalButtonStyle]}
            titleStyle={{ fontSize: 22, fontWeight: "bold" }}
            onPress={() => {
              {
                newTourTitle ? createNewTour() : setNewTourTitleError("Tour title cannot be empty");
              }
            }}
          />
        </View>
      </Modal>
      {locationErr ? (
        // <Text>Please Enable location services</Text>
        <View style={{ justifyContent: "center", alignItems: "center", paddingTop: 60 }}>
          <MaterialIcons
            name="wrong-location"
            size={200}
            color="#E71D36"
            // style={{ alignSelf: "center" }}
          />
          <Text style={{ color: "#E71D36", fontSize: 24 }}>Please enable location services</Text>
        </View>
      ) : (
        <>
          {/* {console.log(longitudeLatitude)} */}
          {!longitudeLatitude ? (
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="#FF9F1C" />
            </View>
          ) : (
            <>
              <FlatList
                style={styles.attractionsList}
                data={Attraction.state.attractions}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => {
                  return (
                    <AttractionTile
                      attractionName={item.name}
                      category={item.category}
                      imageCover={item.imageCover}
                      time={item.time}
                      distance={item.distance}
                      navigation={navigation}
                      Id={item._id}
                    />
                  );
                }}
                ListHeaderComponent={
                  <>
                    <HomeScreenHeader
                      navigation={navigation}
                      longitudeLatitude={longitudeLatitude}
                    />
                    {Attraction.state.attractions.length ? null : (
                      <View
                        style={{
                          // position: "absolute",
                          // left: 0,
                          // right: 0,
                          // top: 0,
                          // bottom: 0,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <No_results_icon height={300} />
                        <Text
                          style={{
                            color: "#FF9F1C",
                            fontSize: 16,
                            fontWeight: "bold",
                            textAlign: "center",
                            margin: 10,
                          }}
                        >
                          Sorry, that filter combination has no results near you. Please try
                          different filters or use the search bar.
                        </Text>
                        {/* <Text style={{ color: "#FF9F1C", fontSize: 16, fontWeight: "bold" }}></Text> */}
                      </View>
                    )}
                  </>
                }
                ListFooterComponent={<View style={{ height: 70 }}></View>}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
              />

              <FloatingButton onPress={toggleModal} title="Create New Tour" />

              {Attraction.state.isLoading ? (
                <View style={styles.loading}>
                  <ActivityIndicator size="large" color="#FF9F1C" />
                </View>
              ) : null}
            </>
          )}
        </>
      )}
    </View>
  );
};

HomeScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#FFF",
    flexDirection: "column",
    flex: 1,
    // marginBottom: 70,
  },

  attractionsList: {
    // marginTop: 20,
    // paddingBottom: 70,
  },

  modalStyle: {
    backgroundColor: "#011627",
    borderRadius: 15,
  },
  modalTextStyle: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: -20,
  },
  modalInputStyle: {
    paddingVertical: 15,
    borderRadius: 50,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    marginVertical: 20,
  },
  modalButtonStyle: {
    marginHorizontal: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: "#229186",
    marginBottom: 20,
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

export default withNavigationFocus(HomeScreen);
