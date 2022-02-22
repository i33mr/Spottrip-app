import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import {
  SearchBar,
  Button,
  Text,
  Icon,
  Input,
  Card,
} from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";

const ProfileScreen = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <ScrollView
        // directionalLockEnabled
        // automaticallyAdjustContentInsets={false}
        // scrollEnabled={false}
        horizontal={false}
      >
        <View style={styles.ellipse}>
          <View style={styles.upperInfo}>
            <Image
              style={styles.profileImg}
              source={require("../../assets/images/avatars/person4.png")}
            />
            <TouchableOpacity style={styles.uploadPicButton}>
              <Icon
                name="camera-enhance"
                type="MaterialIcons "
                iconStyle={{ margin: 0 }}
                size={30}
                containerStyle={{ padding: 0, margin: 0 }}
                color="#FFF"
              />
            </TouchableOpacity>
            <View style={styles.nameContainer}>
              <Text style={styles.nameStyle}>Elliot Alderson</Text>
              <TouchableOpacity>
                <Icon
                  name="pencil-circle"
                  type="material-community"
                  size={30}
                  color="#FFF"
                />
              </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 16, marginTop: 15 }}>OSbern0</Text>
          </View>
        </View>
        <View style={styles.mainContent}>
          <View style={[styles.infoCard]}>
            <View style={styles.infoCardTitle}>
              <Text style={{ fontWeight: "bold" }}>Account Information</Text>
              <Icon
                name="pencil-circle"
                type="material-community"
                size={30}
                color="#229186"
              />
            </View>
            <View style={styles.pieceOfInfo}>
              <Text style={{ fontSize: 16, width: 125 }}>Email Address</Text>
              <Text>elliotalderson@protonmail.ch</Text>
            </View>
            <View style={styles.pieceOfInfo}>
              <Text style={{ fontSize: 16, width: 125 }}>Date of Birth</Text>
              <Text>17/09/1986</Text>
            </View>
            <View style={styles.pieceOfInfo}>
              <Text style={{ fontSize: 16, width: 125 }}>Password</Text>
              <Text>**************</Text>
            </View>
          </View>
          <View style={[styles.infoCard]}>
            <View style={styles.infoCardTitle}>
              <Text style={{ fontWeight: "bold" }}>Preferences</Text>
              <Icon
                name="pencil-circle"
                type="material-community"
                size={30}
                color="#229186"
              />
            </View>
            <View style={styles.pieceOfInfo}>
              <Text style={{ fontSize: 16, width: 125 }}>Historical</Text>
            </View>
            <View style={styles.pieceOfInfo}>
              <Text style={{ fontSize: 16, width: 125 }}>Parks</Text>
            </View>
            <View style={styles.pieceOfInfo}>
              <Text style={{ fontSize: 16, width: 125 }}>Cultural</Text>
            </View>
          </View>
        </View>
        <Button
          title="Logout"
          buttonStyle={styles.buttonStyle}
          titleStyle={{ fontSize: 20, fontWeight: "600", color: "#E71D36" }}
          onPress={signOut}
          type="clear"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    // justifyContent: "center",
    // alignContent: "center",
    flex: 1,
  },
  ellipse: {
    // borderWidth: 3,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width / 1.4,
    backgroundColor: "#FF9F1C",
    borderBottomLeftRadius: (Dimensions.get("window").width * 1.1) / 2,
    borderBottomRightRadius: (Dimensions.get("window").width * 1.1) / 2,
    // position: "absolute",
    // top: -128,
  },
  upperInfo: {
    alignItems: "center",
    marginTop: 20,
    // borderWidth: 2,
    // temp
    height: Dimensions.get("window").width - 128,
  },
  profileImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  uploadPicButton: {
    backgroundColor: "#011627",
    // paddingHorizontal: 0,
    width: 40,
    height: 40,
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 20,
    // alignSelf: "flex-end",
    position: "absolute",
    bottom: 100,
    right: 110,
  },
  nameContainer: {
    // width: "100%",
    // borderWidth: 3,
    marginTop: 10,
    flexDirection: "row",
    // justifyContent: "space-evenly",
    alignItems: "center",
  },
  nameStyle: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 15,
    color: "#011627",
  },
  mainContent: {
    marginTop: 15,
  },
  infoCard: {
    padding: 15,
    marginHorizontal: 15,
    // borderColor: "rgba(0,0,0,0.7)",
    // borderWidth: 1,
    backgroundColor: "white",
    // borderRadius: 8,
    // paddingVertical: 45,
    // paddingHorizontal: 25,
    // width: "100%",
    marginVertical: 10,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  infoCardTitle: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    // borderBottomWidth: 2,
    borderBottomColor: "rgba(0,0,0,0.7)",
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
  pieceOfInfo: {
    // width: "100%",
    // flex: 1,
    marginTop: 15,
    flexDirection: "row",
    // justifyContent: "space-",
  },
  buttonStyle: {
    marginHorizontal: 80,
    paddingVertical: 20,
    borderRadius: 50,
    // backgroundColor: "#E71D36",
    borderWidth: 2,
    borderColor: "#E71D36",
    marginBottom: 15,
    color: "#E71D36",
  },
});

ProfileScreen.navigationOptions = () => {
  return {
    // title: "Tours",
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name="account"
        type="material-community"
        color={tintColor}
        size={28}
      />
    ),
  };
};

export default ProfileScreen;
