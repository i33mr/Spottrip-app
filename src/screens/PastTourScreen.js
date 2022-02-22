import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { Button, Text, Input } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Magic_icon from "../../assets/images/magic.svg";
import Pointer_icon from "../../assets/images/pointer.svg";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import Modal from "react-native-modal";

const PastTourScreen = ({ navigation }) => {
  const [isAddFriendFormVisible, setIsAddFriendFormVisible] = useState(false);
  const [isShowFriends, setIsShowFriends] = useState(false);
  const [isShowAttractions, setIsShowAttractions] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // temp for demo
  const parent =
    navigation.dangerouslyGetParent().state.routes[
      navigation.dangerouslyGetParent().state.routes.length - 2
    ]["routeName"];
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

          <Input
            inputStyle={styles.modalInputStyle}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            style={{ marginBottom: 0 }}
          />
          {/* <Button title="Create New Tour" onPress={toggleModal} /> */}
          <Button
            title="Retake Tour"
            buttonStyle={[styles.modalButtonStyle]}
            titleStyle={{ fontSize: 22, fontWeight: "bold" }}
            onPress={() => {
              toggleModal();
              navigation.navigate("TourManualCreate");
            }}
          />
        </View>
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
          <View>
            <View style={styles.elementView}>
              <Image
                style={styles.friendImg}
                source={require("../../assets/images/avatars/avatar1.png")}
              />
              <View>
                <Text h4 style={styles.elementDetaliText}>
                  David Spencer
                </Text>
                <Text style={styles.elementDetaliText}>6avid77</Text>
                {/* <Text style={[styles.elementDetaliText, { color: "#229186" }]}>
                  Approved
                </Text> */}
              </View>
              {/*  */}
            </View>
            <View style={styles.elementView}>
              <Image
                style={styles.friendImg}
                source={require("../../assets/images/avatars/avatar2.png")}
              />
              <View>
                <Text h4 style={styles.elementDetaliText}>
                  Pamela Fuller
                </Text>
                <Text style={styles.elementDetaliText}>pam002</Text>
              </View>
            </View>
          </View>
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
          <View>
            <TouchableOpacity style={styles.elementView}>
              <Image
                style={styles.attractionImg}
                source={require("../../assets/images/attractions/batu-caves1.jpg")}
              />
              <View>
                <Text h4 style={styles.elementDetaliText}>
                  Batu Caves
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.elementDetaliText}>Historical</Text>
                  <Octicons name="primitive-dot" style={styles.dotStyle} color="#FFF" />
                  <Text style={styles.elementDetaliText}>2 hours</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.elementView}>
              <Image
                style={styles.attractionImg}
                source={require("../../assets/images/attractions/Kepong-Metropolitan-Park.png")}
              />
              <View style={styles.AttractionDetali}>
                <Text h4 style={styles.elementDetaliText}>
                  Kepong Metropolitan Park
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.elementDetaliText}>Park</Text>
                  <Octicons name="primitive-dot" style={styles.dotStyle} color="#FFF" />
                  <Text style={styles.elementDetaliText}>3 hours</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.elementView}>
              <Image
                style={styles.attractionImg}
                source={require("../../assets/images/attractions/Taman-Tasik-Cempaka.png")}
              />
              <View style={styles.AttractionDetali}>
                <Text h4 style={styles.elementDetaliText}>
                  Taman Tasik Cempaka
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.elementDetaliText}>Park</Text>
                  <Octicons name="primitive-dot" style={styles.dotStyle} color="#FFF" />
                  <Text style={styles.elementDetaliText}>3 hours</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
        <View
          style={{
            borderBottomColor: "#011627",
            borderBottomWidth: 1,
            marginVertical: 10,
          }}
        />
        <View style={styles.tourDetails}>
          <AntDesign name="clockcircle" size={24} color="#011627" />
          <Text style={styles.attractionDetailText}> 8:30 hours</Text>
          <EvilIcons name="location" size={28} color="#011627" />
          <Text style={styles.attractionDetailText}>3 Attractions</Text>
          <MaterialCommunityIcons name="road" size={28} color="#011627" />
          <Text style={styles.attractionDetailText}> 14 km</Text>
        </View>
        <Button
          title="Retake Tour"
          buttonStyle={[styles.buttonStyle, { borderColor: "#229186", borderWidth: 1 }]}
          titleStyle={{ color: "#229186", fontWeight: "bold" }}
          onPress={toggleModal}
          // onPress={() => navigation.navigate("TourManualCreate")}
          type="outline"
        />
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
  friendImg: {
    marginHorizontal: 5,
  },
  AttractionDetali: {
    flex: 1,
  },
  elementDetaliText: {
    color: "#FFF",
    fontWeight: "500",
    marginTop: 5,
  },
  buttonStyle: {
    // paddingHorizontal: 10,
    // paddingVertical: 10,
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
  tourDetails: {
    backgroundColor: "#FF9F1C",
    // height: 50,
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  attractionDetailText: {
    fontSize: 15,
    fontWeight: "bold",
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
});

PastTourScreen.navigationOptions = () => {
  return {
    title: "Tour Title",
    headerBackTitle: " ",
  };
};
export default PastTourScreen;
