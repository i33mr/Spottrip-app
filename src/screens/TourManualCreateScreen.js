import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { Button, Text, Input } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

const TourManualCreateScreen = ({ navigation }) => {
  const [isAddFriendFormVisible, setIsAddFriendFormVisible] = useState(false);
  const [isShowFriends, setIsShowFriends] = useState(false);
  const [isShowAttractions, setIsShowAttractions] = useState(true);
  // const {} = navigation.params
  // console.log(
  const parent =
    navigation.dangerouslyGetParent().state.routes[
      navigation.dangerouslyGetParent().state.routes.length - 2
    ]["routeName"];
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.addFriendView}>
          <Button
            title="Add Friend"
            icon={<AntDesign name="addusergroup" size={24} color="#FFF" />}
            buttonStyle={styles.addFriendButtonStyle}
            titleStyle={{ fontSize: 20, fontWeight: "bold" }}
            onPress={() => setIsAddFriendFormVisible(!isAddFriendFormVisible)}
          />
          {isAddFriendFormVisible ? (
            <View>
              <Input
                label="Enter Your Friend’s Username"
                inputStyle={styles.usernameInputStyle}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                // style={{ marginTop: 15 }}
                labelStyle={{ color: "#FFF" }}
              />
              <Button
                title="Send Invite"
                buttonStyle={styles.inviteButtonStyle}
                titleStyle={{ fontSize: 20, fontWeight: "600" }}
              />
            </View>
          ) : null}
        </View>

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
                <Text style={[styles.elementDetaliText, { color: "#229186" }]}>Approved</Text>
              </View>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#E71D36",
                    padding: 5,
                    borderRadius: 50,
                  }}
                >
                  <MaterialCommunityIcons name="close-thick" size={36} color="#FFF" />
                </View>
              </TouchableOpacity>
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
                <Text style={[styles.elementDetaliText, { color: "#FF9F1C" }]}>Pending</Text>
              </View>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#E71D36",
                    padding: 5,
                    borderRadius: 50,
                  }}
                >
                  <MaterialCommunityIcons name="close-thick" size={36} color="#FFF" />
                </View>
              </TouchableOpacity>
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

                <Text style={styles.elementDetaliText}>
                  {parent == "TourCreate" ? "Added by 6avid77" : "Auto Generated"}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#E71D36",
                    padding: 5,
                    borderRadius: 50,
                  }}
                >
                  <MaterialCommunityIcons name="close-thick" size={36} color="#FFF" />
                </View>
              </TouchableOpacity>
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
                <Text style={styles.elementDetaliText}>Added by pam002</Text>
              </View>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#E71D36",
                    padding: 5,
                    borderRadius: 50,
                  }}
                >
                  <MaterialCommunityIcons name="close-thick" size={36} color="#FFF" />
                </View>
              </TouchableOpacity>
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
                <Text style={styles.elementDetaliText}>
                  {parent == "TourCreate" ? "Added by 6avid77" : "Auto Generated"}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#E71D36",
                    padding: 5,
                    borderRadius: 50,
                  }}
                >
                  <MaterialCommunityIcons name="close-thick" size={36} color="#FFF" />
                </View>
              </TouchableOpacity>
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
        <View style={styles.buttonGroup}>
          <Button
            // icon={<Magic_icon fill="#FDFFFC" />}
            title="Add Attraction"
            buttonStyle={[styles.buttonStyle, { borderColor: "#229186", borderWidth: 1 }]}
            titleStyle={{ color: "#229186", fontWeight: "bold" }}
            onPress={() => navigation.navigate("TourAddAttraction")}
            type="outline"
          />
          <Button
            title="Confirm Attractions"
            buttonStyle={[styles.buttonStyle, { backgroundColor: "#229186" }]}
            titleStyle={{ color: "#FDFFFC", fontWeight: "bold" }}
            onPress={() => navigation.navigate("TourList")}
          />
        </View>
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
  addFriendButtonStyle: {
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: "#011627",
    marginVertical: 10,
  },
  addFriendView: {
    backgroundColor: "#011627",
    borderRadius: 15,
    marginTop: 10,
  },
  usernameInputStyle: {
    paddingVertical: 15,
    borderRadius: 50,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    marginTop: 10,
  },
  inviteButtonStyle: {
    marginHorizontal: 80,
    paddingVertical: 10,
    borderRadius: 50,
    backgroundColor: "#229186",
    marginBottom: 20,
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
  dotStyle: {
    marginHorizontal: 5,
    marginTop: 3,
  },
  buttonStyle: {
    // width: 170,
    // height: 70,
    // flex: 1,
    // alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 50,
  },
  buttonGroup: {
    marginVertical: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
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
    // marginBottom: 5,
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
});

TourManualCreateScreen.navigationOptions = () => {
  return {
    title: "Tour Title",
    headerBackTitle: " ",
    headerRight: () => (
      <Button
        // onPress={() => alert("This is a button!")}
        icon={<Ionicons name="settings-sharp" size={24} color="black" />}
        type="clear"
      />
    ),
  };
};
export default TourManualCreateScreen;
