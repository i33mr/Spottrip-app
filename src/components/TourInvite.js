import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "react-native-expo-image-cache";
import { NavigationContainer } from "@react-navigation/native";

const TourInvite = ({ invite, removeInvite, userId, navigation }) => {
  // const deleteInvite = async () => {
  //   console.log(userId, invite.invitee._id);

  //   await removeInvite(invite._id, invite.invitee._id);
  //   if (userId === invite.invitee._id) {
  //     navigation.navigate("TourList");
  //   }
  // };
  return (
    <View style={styles.friendView}>
      {/* <Image style={styles.friendImg} source={require("../../assets/images/avatars/avatar1.png")} /> */}
      <View style={styles.friendImgContainer}>
        <Image
          style={styles.friendImg}
          // {...{ uri }}
          uri={`http://b63d-64-137-228-4.ngrok.io/img/users/${invite.invitee.photo}`}
          preview={{
            uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
          }}
        />
      </View>
      <View style={styles.friendDetail}>
        <Text h4 style={styles.friendDetailText}>
          {`${invite.invitee.firstName} ${invite.invitee.lastName}`}
        </Text>
        <Text style={styles.friendDetailText}>{invite.invitee.username}</Text>
        <Text
          style={
            invite.status === "Accepted"
              ? styles.inviteStatusApproved
              : invite.status === "Pending"
              ? styles.inviteStatusPending
              : styles.inviteStatusRejected
          }
        >
          {invite.status}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
        }}
        onPress={() => removeInvite(invite._id, invite.invitee._id)}
      >
        <View
          style={{
            backgroundColor: "#E71D36",
            padding: 5,
            borderRadius: 50,
          }}
        >
          <MaterialCommunityIcons
            name={userId === invite.invitee._id ? "exit-to-app" : "close-thick"}
            size={36}
            color="#FFF"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  friendView: {
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
    borderRadius: 60,
    height: "100%",
    width: "100%",
  },
  friendDetailText: {
    color: "#FFF",
    fontWeight: "500",
    marginTop: 5,
  },
  inviteStatusApproved: {
    color: "#229186",
    fontWeight: "500",
    marginTop: 5,
  },
  inviteStatusPending: {
    color: "#FF9F1C",
    fontWeight: "500",
    marginTop: 5,
  },
  inviteStatusRejected: {
    color: "#E71D36",
    fontWeight: "500",
    marginTop: 5,
  },
});

export default TourInvite;
