import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from "react-native";
import { SearchBar, Button, Text, Icon, Input } from "react-native-elements";

const InvitesScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.invite}>
          <Image
            style={styles.invitePic}
            source={require("../../assets/images/avatars/person1.jpeg")}
          />
          <View style={styles.inviteDetail}>
            <Text h4 style={[styles.inviteDetailText, { fontWeight: "bold" }]}>
              Cyberjaya Visit
            </Text>
            <Text style={styles.inviteDetailText}>By: Janice Hosenstein</Text>
            <View style={styles.buttonGroup}>
              <Button
                buttonStyle={[styles.buttonStyle, { backgroundColor: "#E71D36" }]}
                title="Deny"
                titleStyle={[styles.inviteDetailText, { fontWeight: "bold" }]}
              />
              <Button
                buttonStyle={[styles.buttonStyle, { backgroundColor: "#229186" }]}
                title="Accept"
                titleStyle={[styles.inviteDetailText, { fontWeight: "bold" }]}
              />
            </View>
          </View>
        </View>
        <View style={styles.invite}>
          <Image
            style={styles.invitePic}
            source={require("../../assets/images/avatars/person2.jpeg")}
          />
          <View style={styles.inviteDetail}>
            <Text h4 style={[styles.inviteDetailText, { fontWeight: "bold" }]}>
              Weekend in Malacca
            </Text>
            <Text style={styles.inviteDetailText}>By: Walter White</Text>
            <View style={styles.buttonGroup}>
              <Button
                buttonStyle={[styles.buttonStyle, { backgroundColor: "#E71D36" }]}
                title="Deny"
                titleStyle={[styles.inviteDetailText, { fontWeight: "bold" }]}
              />
              <Button
                buttonStyle={[styles.buttonStyle, { backgroundColor: "#229186" }]}
                title="Accept"
                titleStyle={[styles.inviteDetailText, { fontWeight: "bold" }]}
              />
            </View>
          </View>
        </View>
        <View style={styles.invite}>
          <Image
            style={styles.invitePic}
            source={require("../../assets/images/avatars/person3.jpeg")}
          />
          <View style={styles.inviteDetail}>
            <Text h4 style={[styles.inviteDetailText, { fontWeight: "bold" }]}>
              One Day at the Coast dsf sdf fs sf
            </Text>
            <Text style={styles.inviteDetailText}>By: Ross Geller</Text>
            <View style={styles.buttonGroup}>
              <Button
                buttonStyle={[styles.buttonStyle, { backgroundColor: "#E71D36" }]}
                title="Deny"
                titleStyle={[styles.inviteDetailText, { fontWeight: "bold" }]}
              />
              <Button
                buttonStyle={[styles.buttonStyle, { backgroundColor: "#229186" }]}
                title="Accept"
                titleStyle={[styles.inviteDetailText, { fontWeight: "bold" }]}
              />
            </View>
          </View>
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
    paddingHorizontal: 15,
  },
  invite: {
    backgroundColor: "#FF9F1C",
    // temp height
    // height: 100,
    marginTop: 30,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  invitePic: {
    maxHeight: 110,
    maxWidth: 110,
    borderRadius: 50,
  },
  inviteDetail: {
    flex: 1,
    marginLeft: 10,
  },
  inviteDetailText: {
    color: "#FDFFFC",
  },
  buttonGroup: {
    flexDirection: "row-reverse",
    // alignItems: "",
    // flex: 1,
    // borderWidth: 3,
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonStyle: {
    // height: 50,
    // width: 50,
    borderRadius: 50,
    paddingVertical: 10,
    // paddingHorizontal: 20,
    width: 100,
  },
});

InvitesScreen.navigationOptions = () => {
  return {
    // title: "Tours",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="envelope-letter" type="simple-line-icon" color={tintColor} size={28} />
    ),
  };
};

export default InvitesScreen;
