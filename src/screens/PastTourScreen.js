import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal as RNModal,
  ActivityIndicator,
} from "react-native";
import { Button, Text, Input } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { Context as TourContext } from "../context/TourContext";
import { Image } from "react-native-expo-image-cache";
import TourSummaryBar from "../components/TourSummaryBar";
import spottripAPI from "../api/spottripAPI";

const PastTourScreen = ({ navigation }) => {
  const tourId = navigation.getParam("_id");

  const { state, getTour, addAttractions } = useContext(TourContext);

  const [isShowFriends, setIsShowFriends] = useState(false);
  const [isShowAttractions, setIsShowAttractions] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newTourTitle, setNewTourTitle] = useState("");
  const [newTourTitleError, setNewTourTitleError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [tour, setTour] = useState(null);
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    getTour(tourId);
  }, []);

  useEffect(() => {
    if (tourId !== null) {
      setTour(state.tour);
    }
  }, [state.tour]);

  useEffect(() => {
    if (tour !== null) {
      setAttractions(tour.attractions);
    }
  }, [tour]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const createNewTour = async () => {
    setIsLoading(true);
    try {
      const response = await spottripAPI.post(`/v1/tours`, { title: newTourTitle });

      console.log(response.data.data.tour._id);
      await addAttractions(
        response.data.data.tour._id,
        attractions.map((att) => att._id)
      );

      toggleModal();
      setIsLoading(false);

      navigation.navigate("TourOverview", {
        _id: response.data.data.tour._id,
        tourTitle: newTourTitle,
        method: "manual",
      });
      // navigation.navigate("TourOverview", {
      //   _id: validTour._id,
      //   tourTitle: validTour.title,
      //   method: validTour.timeToSpend ? "generate" : "manual",
      // });

      setNewTourTitle("");
      setNewTourTitleError("");
    } catch (error) {
      console.log(error);
    }
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
        {state.isLoading || isLoading ? (
          <RNModal animationType="none" transparent={true} visible={true}>
            <View style={styles.loading}>
              <ActivityIndicator size="large" color="#FF9F1C" />
            </View>
          </RNModal>
        ) : null}
      </Modal>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            borderBottomColor: "#011627",
            borderBottomWidth: 1,
            marginVertical: 10,
          }}
        />
        <Button
          title="Friends"
          icon={
            <MaterialIcons
              name={isShowFriends ? "arrow-drop-down" : "arrow-right"}
              size={36}
              color="black"
              style={{ padding: 0 }}
            />
          }
          buttonStyle={styles.showElementsButtonStyle}
          titleStyle={{ fontSize: 20, fontWeight: "bold", color: "#000" }}
          type="clear"
          style={{ alignItems: "flex-start" }}
          onPress={() => setIsShowFriends(!isShowFriends)}
        />
        {isShowFriends ? (
          <>
            {tour.guests.map((guest) => {
              <View style={styles.elementView}>
                <View style={styles.friendImgContainer}>
                  <Image
                    style={styles.friendImg}
                    // {...{ uri }}
                    uri={`http://4007-95-186-116-119.ngrok.io/img/users/${guest.photo}`}
                    preview={{
                      uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
                    }}
                  />
                </View>
                <View>
                  <Text h4 style={styles.elementDetailText}>
                    {`${guest.firstName} ${guest.lastName}`}
                  </Text>
                  <Text style={styles.elementDetailText}>{guest.username}</Text>
                </View>
              </View>;
            })}
          </>
        ) : null}
        <View
          style={{
            borderBottomColor: "#011627",
            borderBottomWidth: 1,
            marginVertical: 10,
          }}
        />
        <Button
          title="Attractions"
          icon={
            <MaterialIcons
              name={isShowAttractions ? "arrow-drop-down" : "arrow-right"}
              size={36}
              color="black"
              style={{ padding: 0 }}
            />
          }
          buttonStyle={styles.showElementsButtonStyle}
          titleStyle={{ fontSize: 20, fontWeight: "bold", color: "#000" }}
          type="clear"
          style={{ alignItems: "flex-start" }}
          onPress={() => setIsShowAttractions(!isShowAttractions)}
        />
        {isShowAttractions ? (
          // <View>
          <>
            {attractions.map((attraction) => {
              return (
                <TouchableOpacity
                  style={styles.elementView}
                  key={attraction._id._id}
                  onPress={() =>
                    navigation.navigate("AttractionDetail", {
                      _id: attraction._id._id,
                      title: attraction._id.name,
                    })
                  }
                >
                  <Image
                    style={styles.attractionImg}
                    // {...{ uri }}
                    uri={`http://4007-95-186-116-119.ngrok.io/img/attractions/${attraction._id.imageCover}`}
                    preview={{
                      uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
                    }}
                  />
                  <View style={styles.attractionDetail}>
                    <Text h4 style={styles.elementDetailText}>
                      {attraction._id.name}
                    </Text>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Text style={styles.elementDetailText}>{attraction._id.category}</Text>
                      <Octicons name="primitive-dot" style={styles.dotStyle} color="#FFF" />
                      <Text style={styles.elementDetailText}>{`${Math.floor(
                        attraction._id.time / 60
                      )}${
                        attraction._id.time % 60 != 0 ? `:${attraction._id.time % 60}` : ""
                      } hours`}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
            {/* <TouchableOpacity style={styles.elementView}>
              <Image
                style={styles.attractionImg}
                source={require("../../assets/images/attractions/batu-caves1.jpg")}
              />
              <View>
                <Text h4 style={styles.elementDetailText}>
                  Batu Caves
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.elementDetailText}>Historical</Text>
                  <Octicons name="primitive-dot" style={styles.dotStyle} color="#FFF" />
                  <Text style={styles.elementDetailText}>2 hours</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.elementView}>
              <Image
                style={styles.attractionImg}
                source={require("../../assets/images/attractions/Kepong-Metropolitan-Park.png")}
              />
              <View style={styles.AttractionDetali}>
                <Text h4 style={styles.elementDetailText}>
                  Kepong Metropolitan Park
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.elementDetailText}>Park</Text>
                  <Octicons name="primitive-dot" style={styles.dotStyle} color="#FFF" />
                  <Text style={styles.elementDetailText}>3 hours</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.elementView}>
              <Image
                style={styles.attractionImg}
                source={require("../../assets/images/attractions/Taman-Tasik-Cempaka.png")}
              />
              <View style={styles.AttractionDetali}>
                <Text h4 style={styles.elementDetailText}>
                  Taman Tasik Cempaka
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.elementDetailText}>Park</Text>
                  <Octicons name="primitive-dot" style={styles.dotStyle} color="#FFF" />
                  <Text style={styles.elementDetailText}>3 hours</Text>
                </View>
              </View>
            </TouchableOpacity> */}
          </>
        ) : // </View>
        null}
        <View
          style={{
            borderBottomColor: "#011627",
            borderBottomWidth: 1,
            marginVertical: 10,
          }}
        />
        {tour !== null ? <TourSummaryBar tour={tour} /> : null}
        <Button
          title="Retake Tour"
          buttonStyle={[styles.buttonStyle, { borderColor: "#229186", borderWidth: 1 }]}
          titleStyle={{ color: "#229186", fontWeight: "bold" }}
          onPress={toggleModal}
          // onPress={() => navigation.navigate("TourOverview")}
          type="outline"
        />
      </ScrollView>
      {state.isLoading || isLoading ? (
        <RNModal animationType="none" transparent={true} visible={true}>
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#FF9F1C" />
          </View>
        </RNModal>
      ) : null}
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

  showElementsButtonStyle: {
    borderColor: "red",
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginLeft: -10,
  },
  elementView: {
    borderRadius: 15,
    backgroundColor: "#011627",
    marginTop: 10,
    flexDirection: "row",
  },
  friendImgContainer: {
    height: 110,
    width: 110,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  friendImg: {
    // marginHorizontal: 5,
    borderRadius: 60,
    height: "100%",
    width: "100%",
  },

  elementDetailText: {
    color: "#FFF",
    fontWeight: "500",
    marginTop: 5,
  },
  buttonStyle: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 50,
    marginBottom: 10,
    marginHorizontal: 90,
  },

  attractionImg: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    height: 150,
    width: 150,
    marginRight: 10,
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
  attractionDetail: {
    resizeMode: "contain",

    fontWeight: "bold",
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    paddingRight: 10,
    // paddingBottom: 50,
  },
});

PastTourScreen.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam("tourTitle"),
    headerBackTitle: " ",
  };
};
export default PastTourScreen;
