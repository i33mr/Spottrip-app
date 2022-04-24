import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "react-native-expo-image-cache";
import { NavigationContainer } from "@react-navigation/native";

const TourHostTile = ({ host }) => {
  return (
    <View style={styles.friendView}>
      {/* <Image style={styles.friendImg} source={require("../../assets/images/avatars/avatar1.png")} /> */}
      <View style={styles.friendImgContainer}>
        <Image
          style={styles.friendImg}
          // {...{ uri }}
          uri={`http://b63d-64-137-228-4.ngrok.io/img/users/${host.photo}`}
          preview={{
            uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
          }}
        />
      </View>
      <View style={styles.friendDetail}>
        <Text h4 style={styles.friendDetailText}>
          {`${host.firstName} ${host.lastName}`}
        </Text>
        <Text style={styles.friendDetailText}>{host.username}</Text>
        <Text style={styles.inviteStatusApproved}>Host</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  friendView: {
    // height: 200,
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
});

export default TourHostTile;
