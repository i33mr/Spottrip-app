import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Modal as RNModal,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Button, Text, Input } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import GMaps_icon from "../../assets/images/google-maps.svg";
import { EvilIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { Context as TourContext } from "../context/TourContext";
import { Context as NotificationContext } from "../context/NotificationContext";
import TourSummaryBar from "../components/TourSummaryBar";
import moment from "moment";
import ActiveTourAttraction from "../components/ActiveTourAttraction";
import ActiveTourAttractionTravelTime from "../components/ActiveTourAttractionTravelTime";
import { NavigationEvents } from "react-navigation";
import Modal from "react-native-modal";
// import { FlatList,  } from "react-native-gesture-handler";
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";

const ActiveTourScreen = ({ navigation }) => {
  // navigation.setOptions({
  //   title: navigation.getParam("tourTitle"),
  //   headerBackTitle: " ",
  //   headerRight: () => (
  //     <Button
  //       icon={<MaterialCommunityIcons name="bell" size={24} color="#229186" />}
  //       type="clear"
  //       onPress={toggleTourNotificationsFunction}
  //     />
  //   ),
  // });

  const tourId = navigation.getParam("_id");
  const {
    state,
    getTour,
    updateTourStatus,
    resolveOverstay,
    clearOverstayMsg,
    resolveOverstayResponse,
    toggleTourNotifications,
  } = useContext(TourContext);

  const Notification = useContext(NotificationContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedAttraction, setSelectedAttraction] = useState("");
  const [isNextModal, setNextModal] = useState(false);
  const [overstayTime, setOverstayTime] = useState("");
  const [overstayTimeErr, setOverstayTimeErr] = useState("");

  useEffect(async () => {
    getTour(tourId);
    // await Notification.resetLocalNotifications(state.tours);
  }, []);

  // useEffect(() => {
  //   if (state.tour !== null)
  //     navigation.setParams({
  //       toggleTourNotifications: toggleTourNotifications(
  //         tourId,
  //         state.tour._id.enableNotifications
  //       ),
  //     });
  // }, [state.tour]);

  const finishTour = async () => {
    try {
      await updateTourStatus(tourId, "Past");
      navigation.navigate("TourList");
    } catch (error) {
      showMessage({
        message: "Couldn't end tour",
        description: error.message,
        type: "danger",
        duration: 4000,
        floating: true,
      });
    }
  };

  const toggleModal = () => {
    // setAttractionHooksList();
    setSelectedAttraction("");
    setOverstayTime("");
    setNextModal(false);
    clearOverstayMsg();
    setModalVisible(!isModalVisible);
  };

  const selectAttraction = (attractionId) => {
    setSelectedAttraction(attractionId);
    // console.log(attraction);
  };

  const nextModalView = () => {
    setNextModal(true);
  };
  const modalFlashMessageRef = useRef();

  const sendOverstayRequest = async () => {
    try {
      await resolveOverstay(tourId, selectedAttraction, overstayTime * 1);
    } catch (error) {
      modalFlashMessageRef.current.showMessage({
        message: "You can't edit this tour",
        description: error.message,
        type: "danger",
        duration: 4000,
        floating: true,
      });
    }
  };
  const overstaySendResponse = async (tourId, selectedAttraction, overstayTime, choice) => {
    await resolveOverstayResponse(tourId, selectedAttraction, overstayTime, choice);
    toggleModal();
  };

  // console.log(state.tour !== null);
  // if (state.tour !== null)
  //   ActiveTourScreen.navigationOptions = ({ navigation }) => {
  //     return {
  //       title: navigation.getParam("tourTitle"),
  //       headerBackTitle: " ",
  //       headerRight: () => (
  //         <Button
  //           icon={
  //             <MaterialCommunityIcons
  //               name="bell"
  //               size={24}
  //               color={state.tour._id.enableNotifications ? "#229186" : "#E71D36"}
  //             />
  //           }
  //           type="clear"
  //           onPress={() => toggleTourNotifications(state.tour._id.enableNotifications)}
  //         />
  //       ),
  //     };
  //   };

  return (
    <View style={styles.container}>
      <Modal isVisible={isModalVisible} avoidKeyboard={true}>
        <ScrollView
          style={styles.modalStyle}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Button
            icon={<MaterialCommunityIcons name="close-thick" size={36} color="#FFF" />}
            iconPosition="left"
            onPress={toggleModal}
            type="clear"
            style={{ width: 50 }}
          />
          {!isNextModal ? (
            <Text style={styles.modalTextStyle}>Select the attraction you overstayed at</Text>
          ) : null}

          {state.tour != null && !isNextModal
            ? state.tour.attractions.map((attraction, index, attractions) => {
                // excluding the last attraction

                if (index < attractions.length - 1)
                  return (
                    <TouchableOpacity
                      key={attraction._id._id}
                      style={
                        attraction._id._id === selectedAttraction
                          ? styles.selectedAttraction
                          : styles.unselectedAttraction
                      }
                      onPress={() => selectAttraction(attraction._id._id)}
                    >
                      <Text style={{ color: "#FFF", fontSize: 20, fontWeight: "bold" }}>
                        {attraction._id.name}
                      </Text>
                    </TouchableOpacity>
                  );
                else return null;
              })
            : null}
          {!isNextModal ? (
            <Button
              title="Next"
              buttonStyle={styles.modalNextButton}
              titleStyle={{ color: "#FFF", fontWeight: "bold" }}
              onPress={nextModalView}
              type="solid"
              disabled={selectedAttraction ? false : true}
            />
          ) : null}
          {isNextModal && !state.overstayMsg ? (
            <>
              <Text
                style={styles.modalTextStyle}
              >{`Please enter how long did you overstay at this attraction (in minutes)`}</Text>
              {overstayTimeErr ? (
                <Text
                  style={{
                    color: "#E71D36",
                    marginTop: 15,
                    alignSelf: "center",
                    fontWeight: "bold",
                  }}
                >
                  {overstayTimeErr}
                </Text>
              ) : null}
              <Input
                inputStyle={styles.modalInputStyle}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                style={{ marginBottom: 0 }}
                value={overstayTime}
                onChangeText={setOverstayTime}
                keyboardType="number-pad"
                returnKeyType="done"
              />
              <Button
                title="Next"
                buttonStyle={styles.modalNextButton}
                titleStyle={{ color: "#FFF", fontWeight: "bold" }}
                onPress={sendOverstayRequest}
                type="solid"
                // disabled={selectedAttraction ? false : true}
              />
            </>
          ) : null}
          {state.overstayMsg ? (
            <>
              {state.overstayMsg.method === "no change" ? (
                <>
                  <Text style={styles.modalTextStyle}>{state.overstayMsg.message}</Text>
                  <Button
                    title="Ok"
                    buttonStyle={styles.modalNextButton}
                    titleStyle={{ color: "#FFF", fontWeight: "bold" }}
                    onPress={toggleModal}
                    type="solid"
                    // disabled={selectedAttraction ? false : true}
                  />
                </>
              ) : (
                <>
                  <Text style={styles.modalTextStyle}>{`${
                    state.overstayMsg.message
                  } You can either extend the tour by ${moment({
                    minutes: Math.round(state.overstayMsg.time) % 60,
                    hours: state.overstayMsg.time / 60,
                  }).format(
                    "HH:mm"
                  )} hours to cover all the attractions, or reduce the number of attractions to fit in the time to spend`}</Text>
                  <View style={styles.buttonGroup}>
                    <View style={styles.buttonContainer}>
                      <Button
                        // icon={<Magic_icon fill="#FDFFFC" />}
                        // style={{ flex: 1 }}
                        title="Reduce Attractions"
                        buttonStyle={[
                          styles.buttonStyle,
                          { borderColor: "#FF9F1C", borderWidth: 1 },
                        ]}
                        titleStyle={{ color: "#FF9F1C", fontWeight: "bold" }}
                        onPress={() =>
                          overstaySendResponse(
                            tourId,
                            selectedAttraction,
                            overstayTime * 1,
                            "Reduce"
                          )
                        }
                        type="outline"
                      />
                    </View>
                    <View style={styles.buttonContainer}>
                      <Button
                        title="Extend Time"
                        buttonStyle={[
                          styles.buttonStyle,
                          { borderColor: "#229186", borderWidth: 1 },
                        ]}
                        titleStyle={{ color: "#229186", fontWeight: "bold" }}
                        onPress={() =>
                          overstaySendResponse(
                            tourId,
                            selectedAttraction,
                            overstayTime * 1,
                            "Extend"
                          )
                        }
                        // onPress={toggleModal}
                        type="outline"
                      />
                    </View>
                  </View>
                  {/* <Button
                    title="Ok"
                    buttonStyle={styles.modalNextButton}
                    titleStyle={{ color: "#FFF", fontWeight: "bold" }}
                    onPress={toggleModal}
                    type="solid"
                    // disabled={selectedAttraction ? false : true}
                  /> */}
                </>
              )}
            </>
          ) : null}
          {state.isLoading ? (
            <RNModal animationType="none" transparent={true} visible={true}>
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="#FF9F1C" />
              </View>
            </RNModal>
          ) : null}
        </ScrollView>
        <FlashMessage position={"top"} ref={modalFlashMessageRef} />
      </Modal>
      <ScrollView showsVerticalScrollIndicator={false}>
        {state.tour !== null ? (
          <>
            <View style={{ paddingTop: 0, flexDirection: "row", marginTop: 10 }}>
              <Button
                icon={<Ionicons name="chevron-back" size={30} color="#0a84ff" />}
                // style={{ flex: 1 }}
                buttonStyle={{
                  alignSelf: "flex-start",
                  backgroundColor: "#FFF",
                  marginBottom: 0,
                  paddingBottom: 0,
                  marginLeft: -10,
                }}
                containerStyle={{ marginBottom: 0, paddingBottom: 0 }}
              />
              <Text
                style={{
                  alignSelf: "center",
                  textAlign: "center",
                  flex: 1,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                {navigation.getParam("tourTitle")}
              </Text>
              <Button
                icon={
                  <MaterialCommunityIcons
                    name="bell"
                    size={24}
                    color={state.tour.enableNotifications ? "#229186" : "#E71D36"}
                    // color={"#229186"}
                  />
                }
                // style={{ flex: 1 }}
                buttonStyle={{
                  alignSelf: "flex-start",
                  backgroundColor: "#FFF",
                  // marginBottom: 0,
                  // paddingBottom: 0,
                  // marginLeft: -10,
                }}
                // containerStyle={{ marginBottom: 0, paddingBottom: 0 }}
                onPress={() => toggleTourNotifications(tourId, state.tour.enableNotifications)}
              />
            </View>
            <View
              style={{
                borderBottomColor: "#011627",
                borderBottomWidth: 1,
                marginVertical: 10,
              }}
            />
            <Text
              style={{
                alignSelf: "center",
                fontSize: 18,
                // marginTop: 10,
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
                          state.tour.attractions[state.tour.attractions.length - 1]._id.time -
                          state.tour.attractions[state.tour.attractions.length - 1].extendedTime
                      ) % 60
                    }
                    hours={
                      (state.tour.totalTime -
                        state.tour.attractions[state.tour.attractions.length - 1].startsAt -
                        state.tour.attractions[state.tour.attractions.length - 1]._id.time -
                        state.tour.attractions[state.tour.attractions.length - 1].extendedTime) /
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

        <View style={styles.buttonGroup}>
          <View style={styles.buttonContainer}>
            <Button
              // icon={<Magic_icon fill="#FDFFFC" />}
              // style={{ flex: 1 }}
              title="End Tour Now"
              buttonStyle={[styles.buttonStyle, { borderColor: "#E71D36", borderWidth: 1 }]}
              titleStyle={{ color: "#E71D36", fontWeight: "bold" }}
              onPress={finishTour}
              type="outline"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Edit Tour"
              buttonStyle={[styles.buttonStyle, { borderColor: "#FF9F1C", borderWidth: 1 }]}
              titleStyle={{ color: "#FF9F1C", fontWeight: "bold" }}
              onPress={toggleModal}
              type="outline"
            />
          </View>
        </View>

        {/* <Button
          title="End Tour Now"
          buttonStyle={styles.buttonStyle}
          titleStyle={{ fontSize: 20, fontWeight: "600" }}
          onPress={finishTour}
        /> */}
        {state.isLoading ? (
          <RNModal animationType="none" transparent={true} visible={true}>
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="#FF9F1C" />
            </View>
          </RNModal>
        ) : null}
      </ScrollView>
      <FlashMessage position={"top"} />
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

  unselectedAttraction: {
    // marginLeft: 15,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    backgroundColor: "#FF9F1C",
    marginVertical: 15,
    marginHorizontal: 15,
  },
  selectedAttraction: {
    // marginLeft: 15,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    backgroundColor: "#229186",
    marginVertical: 15,
    marginHorizontal: 15,
  },
  modalInputStyle: {
    paddingVertical: 15,
    borderRadius: 50,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    marginVertical: 20,
  },
  // buttonStyle: {
  //   marginHorizontal: 80,
  //   paddingVertical: 20,
  //   borderRadius: 50,
  //   backgroundColor: "#E71D36",
  //   marginVertical: 30,
  // },
  modalTextStyle: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    // marginTop: -20,
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
  buttonGroup: {
    // width: "100%",
    marginVertical: 30,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 5,
  },
  buttonStyle: {
    // width: "75%",
    // flex: 1,
    // flexWrap: "wrap",
    // alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 50,
  },
  modalNextButton: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 50,
    backgroundColor: "#229186",
    margin: 15,
  },

  modalStyle: {
    backgroundColor: "#011627",
    borderRadius: 15,
    flex: 1,
  },
});

ActiveTourScreen.navigationOptions = ({ navigation }) => {
  return {
    //   headerRight: () => <Text>Sign up</Text>,
    headerShown: false,
  };
  //   return {
  //     title: navigation.getParam("tourTitle"),
  //     headerBackTitle: " ",
  //     headerRight: () => (
  //       <Button
  //         icon={
  //           <MaterialCommunityIcons
  //             name="bell"
  //             size={24}
  //             // color={state.tour._id.enableNotifications ? "#229186" : "#E71D36"}
  //             color={"#229186"}
  //           />
  //         }
  //         type="clear"
  //         // onPress={() => toggleTourNotifications(state.tour._id.enableNotifications)}
  //         onPress={() => navigation.getParam("toggleTourNotifications")()}
  //       />
  //     ),
  //   };
};

export default ActiveTourScreen;
