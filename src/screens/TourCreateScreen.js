import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { Button, Text, Input } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Magic_icon from "../../assets/images/magic.svg";
import Pointer_icon from "../../assets/images/pointer.svg";

const TourCreateScreen = ({ navigation }) => {
  const [isAddFriendFormVisible, setIsAddFriendFormVisible] = useState(false);
  const [isShowFriends, setIsShowFriends] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.addFriendView}>
          <Button
            title="Add Friend"
            icon={<AntDesign name="addusergroup" size={24} color="#FFF" />}
            buttonStyle={styles.addFriendButtonStyle}
            titleStyle={{ fontSize: 20, fontWeight: "bold" }}
            onPress={() => setIsAddFriendFormVisible(!isAddFriendFormVisible)}
          />
          {isAddFriendFormVisible ? (
            <View style={styles.addFriendForm}>
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
          buttonStyle={styles.showFriendsButtonStyle}
          titleStyle={{ fontSize: 20, fontWeight: "bold", color: "#000" }}
          type="clear"
          style={{ alignItems: "flex-start" }}
          onPress={() => setIsShowFriends(!isShowFriends)}
        />
        {isShowFriends ? (
          <View style={styles.showFriendsView}>
            <View style={styles.friendView}>
              <Image
                style={styles.friendImg}
                source={require("../../assets/images/avatars/avatar1.png")}
              />
              <View style={styles.friendDetali}>
                <Text h4 style={styles.friendDetaliText}>
                  David Spencer
                </Text>
                <Text style={styles.friendDetaliText}>6avid77</Text>
                <Text style={[styles.friendDetaliText, { color: "#229186" }]}>Approved</Text>
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
            <View style={styles.friendView}>
              <Image
                style={styles.friendImg}
                source={require("../../assets/images/avatars/avatar2.png")}
              />
              <View style={styles.friendDetali}>
                <Text h4 style={styles.friendDetaliText}>
                  Pamela Fuller
                </Text>
                <Text style={styles.friendDetaliText}>pam002</Text>
                <Text style={[styles.friendDetaliText, { color: "#FF9F1C" }]}>Pending</Text>
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
        <View style={styles.buttonGroup}>
          <Button
            icon={<Magic_icon fill="#FDFFFC" />}
            title="Generate Based on Preferences"
            buttonStyle={[styles.buttonStyle, { backgroundColor: "#229186" }]}
            titleStyle={{ color: "#FDFFFC", fontWeight: "bold" }}
            onPress={() => navigation.navigate("TourAutoGenerate")}
          />
          <Button
            icon={<Pointer_icon fill="#FDFFFC" />}
            title="Manually Select Attractions"
            buttonStyle={[styles.buttonStyle, { backgroundColor: "#E71D36" }]}
            titleStyle={{ color: "#FDFFFC", fontWeight: "bold" }}
            onPress={() => navigation.navigate("TourManualCreate")}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#FFF",
    flexDirection: "column",
    flex: 1,
    paddingHorizontal: 10,
    // paddingTop: 10,
  },
  addFriendButtonStyle: {
    // marginVertical: 10,
    // paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: "#011627",
    marginVertical: 10,
  },
  addFriendView: {
    backgroundColor: "#011627",
    // height: 200,
    borderRadius: 15,
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
    marginTop: 10,
  },
  addFriendForm: {
    // height: 200,
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
    // marginTop: -20,
  },
  showFriendsButtonStyle: {
    borderColor: "red",
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginLeft: -10,
    // borderWidth: 3,
    // marginTop: 0,
  },
  showFriendsView: {},
  friendView: {
    // height: 200,
    borderRadius: 15,
    backgroundColor: "#011627",
    marginTop: 10,
    flexDirection: "row",
  },
  friendImg: {
    marginHorizontal: 5,
    // borderRadius: 50,
    // height: "100%",
    // width: "28%",
  },
  friendDetaliText: {
    color: "#FFF",
    fontWeight: "500",
    marginTop: 5,
  },
  buttonStyle: {
    // paddingHorizontal: 5,
    width: 170,
    height: 170,
    paddingVertical: 50,
    borderRadius: 35,
    flexDirection: "column",
  },
  buttonGroup: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
  },
});

TourCreateScreen.navigationOptions = () => {
  return {
    title: "Tour Title",
    headerBackTitle: " ",
  };
};
export default TourCreateScreen;
