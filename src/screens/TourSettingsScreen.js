import React, { useContext, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  ActivityIndicator,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import { Button, Text, Input } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import Finish_icon from "../../assets/images/finish.svg";
import { Fontisto } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { FontAwesome } from "@expo/vector-icons";
import { Accuracy, requestForegroundPermissionsAsync, watchPositionAsync } from "expo-location";
// import { Picker } from "@react-native-picker/picker";
import TimeField from "react-simple-timefield";
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";

import { Context as TourContext } from "../context/TourContext";

import { StackActions } from "react-navigation";
import { NavigationActions } from "react-navigation";

const TourSettingsScreen = ({ navigation }) => {
  const creationMethod = navigation.getParam("method");
  const tourId = navigation.getParam("_id");

  const tourTitle = navigation.getParam("tourTitle");

  const { state, setManualTourSettings, generateTour } = useContext(TourContext);

  const [startLocation, setStartLocation] = useState("");
  const [finishLocation, setFinishLocation] = useState("");
  const [editPermission, setEditPermission] = useState("");
  // const [startOrSave, setStartOrSave] = useState("");
  const [timeToSpend, setTimeToSpend] = useState("");
  const [locationErr, setLocationErr] = useState(null);
  const [longitudeLatitude, setLongitudeLatitude] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!tourTitle) {
      if (state.tour.startLocation.coordinates.length) {
        setStartLocation("Current location");
      } else {
        setStartLocation("First location in the tour");
      }
      if (state.tour.finishLocation.coordinates.length) {
        setFinishLocation("Current location");
      } else {
        setFinishLocation("Last location in the tour");
      }
      setEditPermission(state.tour.editPermission);
      setTimeToSpend(`${state.tour.timeToSpend / 60}`);
      // setStartOrSave(state.tour.startOrSave);
    }
  }, []);

  const startWatchingLocation = async () => {
    try {
      const { granted } = await requestForegroundPermissionsAsync();
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
        }
      );
      if (!granted) {
        throw new Error("Location permission not granted");
      }
    } catch (e) {
      setLocationErr(e);
    }
  };

  useEffect(() => {
    startWatchingLocation();
  }, []);

  const navigateToScreen = () => {
    // if there was a tourTitle passed, then it is a new tour, and we navigate to the main tours screen
    // if no title, then the navigation from tourOVerview, if there is a title, then from createTour
    if (tourTitle) {
      const actionToDispatch = StackActions.reset({
        index: 1,
        // key: null,
        actions: [
          NavigationActions.navigate({ routeName: "TourList" }),

          NavigationActions.navigate({
            routeName: "TourOverview",
            params: {
              _id: tourId,
              tourTitle: navigation.getParam("tourTitle"),
              method: navigation.getParam("method"),
            },
          }),
        ],
      });
      navigation.dispatch(actionToDispatch);
    } else {
      // navigation.dispatch(StackActions.pop(1));
      navigation.navigate("TourOverview", { _id: navigation.getParam("_id") });
    }
  };

  const setTourSettings = async () => {
    try {
      if (!startLocation || !finishLocation || !editPermission) {
        setErr("Please fill all the fields");
      } else {
        if (creationMethod === "manual") {
          const settingsObj = {
            startLocation: {
              coordinates: startLocation === "Current location" ? longitudeLatitude.split(",") : [],
            },
            finishLocation: {
              coordinates:
                finishLocation === "Current location" ? longitudeLatitude.split(",") : [],
            },
            editPermission,
            status: "Saved",
          };
          await setManualTourSettings(tourId, settingsObj, tourTitle ? false : true);
          navigateToScreen();
        } else if (creationMethod === "generate") {
          if (!timeToSpend) {
            setErr("Please fill all the fields");
          } else {
            const settingsObj = {
              timeToSpend: timeToSpend * 60,
              startLocation: {
                coordinates:
                  startLocation === "Current location" ? longitudeLatitude.split(",") : [],
              },
              finishLocation: {
                coordinates:
                  finishLocation === "Current location" ? longitudeLatitude.split(",") : [],
              },
              editPermission,
              status: "Saved",
            };

            await generateTour(tourId, longitudeLatitude, settingsObj, tourTitle ? false : true);
            navigateToScreen();
          }
        }
      }
    } catch (error) {
      flashMessageRef.current.showMessage({
        message: "You can't perform this action",
        description: error.message,
        type: "danger",
        duration: 4000,
        floating: true,
      });
    }
  };

  const startLocations = [
    { label: "Current location", value: "Current location" },
    { label: "First location in the tour", value: "First location in the tour" },
  ];

  const finishLocations = [
    { label: "Current location", value: "Current location" },
    { label: "Last location in the tour", value: "Last location in the tour" },
  ];

  const flashMessageRef = useRef();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        {err ? (
          <Text style={{ paddingHorizontal: 20, color: "#FF0000", fontWeight: "bold" }}>{err}</Text>
        ) : null}
        {creationMethod === "generate" ? (
          <Input
            label="Time To Spend (in hours)"
            inputStyle={styles.inputStyle}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            labelStyle={styles.labelStyle}
            autoCorrect={false}
            autoCapitalize="sentences"
            leftIcon={<AntDesign name="clockcircle" size={40} color="#229186" />}
            inputContainerStyle={styles.inputContainer}
            leftIconContainerStyle={{ marginLeft: 10 }}
            placeholder="HH"
            keyboardType="number-pad"
            // keyboardType="decimal-pad"
            onChangeText={setTimeToSpend}
            value={timeToSpend}
            returnKeyType="done"
          />
        ) : null}

        <RNPickerSelect onValueChange={setStartLocation} items={startLocations}>
          <Input
            label="Start Location"
            inputStyle={styles.inputStyle}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            labelStyle={styles.labelStyle}
            autoCorrect={false}
            autoCapitalize="sentences"
            leftIcon={<Fontisto name="flag" size={40} color="#229186" />}
            inputContainerStyle={styles.inputContainer}
            leftIconContainerStyle={{ marginLeft: 10 }}
            placeholder="Select location..."
            value={startLocation}
          />
        </RNPickerSelect>
        <RNPickerSelect onValueChange={setFinishLocation} items={finishLocations}>
          <Input
            label="Finish Location"
            inputStyle={styles.inputStyle}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            labelStyle={styles.labelStyle}
            autoCorrect={false}
            autoCapitalize="sentences"
            leftIcon={<Finish_icon />}
            inputContainerStyle={styles.inputContainer}
            leftIconContainerStyle={{ marginLeft: 10 }}
            placeholder="Select location..."
            value={finishLocation}
          />
        </RNPickerSelect>
        <RNPickerSelect
          onValueChange={setEditPermission}
          items={[
            { label: "Host Only", value: "Host" },
            { label: "All", value: "All" },
          ]}
        >
          <Input
            label="Edit permission"
            inputStyle={styles.inputStyle}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            labelStyle={styles.labelStyle}
            autoCorrect={false}
            autoCapitalize="sentences"
            leftIcon={<FontAwesome name="unlock-alt" size={40} color="#229186" />}
            inputContainerStyle={styles.inputContainer}
            leftIconContainerStyle={{ marginLeft: 10 }}
            placeholder="Select an option..."
            value={editPermission}
          />
        </RNPickerSelect>

        {/* TODO:Change when adding settings to the inside */}
        <Button
          title={creationMethod === "generate" ? "Generate Tour" : "Save settings"}
          buttonStyle={styles.buttonStyle}
          titleStyle={{ fontSize: 20, fontWeight: "600" }}
          onPress={setTourSettings}
        />

        {/* <FloatingButton /> */}
        {state.isLoading ? (
          <Modal animationType="none" transparent={true} visible={true}>
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="#FF9F1C" />
            </View>
          </Modal>
        ) : null}
      </ScrollView>
      <FlashMessage position={"top"} ref={flashMessageRef} />
    </View>
  );
};

TourSettingsScreen.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam("tourTitle"),
    headerBackTitle: " ",
  };
};
const styles = StyleSheet.create({
  inputStyle: {
    // borderWidth: 2,
    // borderColor: "#229186",
    paddingVertical: 15,
    // borderRadius: 50,
    paddingHorizontal: 10,
    fontSize: 22,
    textAlign: "center",
    color: "#011627",
    fontWeight: "bold",
    // marginBottom: -15,
  },
  labelStyle: {
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    color: "#011627",
  },
  inputContainer: {
    borderWidth: 2,
    borderColor: "#229186",
    borderRadius: 50,
    marginBottom: -20,
    // paddingBottom: ,
  },
  buttonStyle: {
    marginHorizontal: 80,
    paddingVertical: 20,
    borderRadius: 50,
    backgroundColor: "#229186",
    marginVertical: 10,
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
    height: "100%",
  },
});

export default TourSettingsScreen;
