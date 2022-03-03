import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Text } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TourInvite = ({ invite, removeInvite }) => {
  return (
    <View style={styles.friendView}>
      <Image style={styles.friendImg} source={require("../../assets/images/avatars/avatar1.png")} />
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
        onPress={() => removeInvite(invite.tour, invite._id)}
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
  error: {
    color: "#E71D36",
    paddingHorizontal: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  success: {
    color: "#229186",
    paddingHorizontal: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default TourInvite;