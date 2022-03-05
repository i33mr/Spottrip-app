import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { Button, Text, Input } from "react-native-elements";
// import _mockLocation from "../_mockLocation"; // only for testing, don't include in deployment
import * as Notifications from "expo-notifications";

import { Context as AttractionContext } from "../context/AttractionContext";
import { Context as NotificationContext } from "../context/NotificationContext";
import { MaterialIcons } from "@expo/vector-icons";

import Modal from "react-native-modal";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AttractionTile from "../components/AttractionTile";
import HomeScreenHeader from "../components/HomeScreenHeader";
import FloatingButton from "../components/FloatingButton";

import { Accuracy, requestForegroundPermissionsAsync, watchPositionAsync } from "expo-location";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const HomeScreen = ({ navigation }) => {
  const Attraction = useContext(AttractionContext);
  const Notification = useContext(NotificationContext);

  const [isModalVisible, setModalVisible] = useState(false);
  const [locationErr, setLocationErr] = useState(null);
  const [longitudeLatitude, setLongitudeLatitude] = useState("");
  const [newTourTitle, setNewTourTitle] = useState("");
  const [newTourTitleError, setNewTourTitleError] = useState("");

  const registerForPushNotificationsAsync = async () => {
    let token;
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  };
  const startWatchingLocation = async () => {
    try {
      const { granted } = await requestForegroundPermissionsAsync();
      // How accurate the location is, timeInterval is checking the location every 1 second, distanceInterval checks every 10 meters
      await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          // timeInterval: 100000,
          distanceInterval: 100,
        },
        (location) => {
          // console.log(location);
          // setLongitudeLatitude(`${location.coords.longitude},${location.coords.latitude}`);
          setLongitudeLatitude(`101.711309,3.15887`);
          // console.log(longitudeLatitude);
        }
      );
      if (!granted) {
        throw new Error("Location permission not granted");
      }
    } catch (e) {
      setLocationErr(e);
    }
  };

  useEffect(async () => {
    const token = await registerForPushNotificationsAsync();
    // console.log(Notification);
    Notification.setNotificationToken(token);
    // Notification.addLocalNotification();
    // console.log(await Notifications.getAllScheduledNotificationsAsync());

    // This listener is fired whenever a notification is received while the app is foregrounded
    // notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
    //   setNotification(notification);
    // });

    // // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    // responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
    //   console.log(response);
    // });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    // console.log("KEKW");
    startWatchingLocation();
  }, []);

  const createNewTour = () => {
    toggleModal();

    navigation.navigate("TourCreate", { tourTitle: newTourTitle, newTour: true });

    setNewTourTitle("");
    setNewTourTitleError("");
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
                  <HomeScreenHeader navigation={navigation} longitudeLatitude={longitudeLatitude} />
                }
                ListFooterComponent={<View style={{ height: 70 }}></View>}
              />
              <FloatingButton toggleModal={toggleModal} />

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
  searchContainer: {
    marginTop: 30,
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
  buttonOuterLayout: {
    flex: 1,
    backgroundColor: "blue",
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
  attractionsList: {
    // marginTop: 20,
    // paddingBottom: 70,
  },
  attractionItem: {
    height: 200,
    // backgroundColor: "blue",
    borderRadius: 15,
    marginBottom: 10,
  },
  attractionImg: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  attractionDetail: {
    marginTop: -70,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    height: 70,
    padding: 10,
    fontWeight: "bold",
    // justifyContent:""
  },
  attractionTitle: {
    fontWeight: "600",
  },
  floatingViewStyle: {
    position: "absolute",
    alignSelf: "center",
    bottom: 10,
    resizeMode: "contain",
  },
  floatingButtonStyle: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: "#229186",
  },
  dotStyle: {
    marginHorizontal: 5,
    marginTop: 3,
  },
  modalStyle: {
    backgroundColor: "#011627",
    borderRadius: 15,
    // flex:1
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

export default HomeScreen;
