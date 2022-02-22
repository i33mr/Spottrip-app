import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-elements";
import Logo from "../../assets/images/Logo.svg";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Logo style={styles.logoStyle} height={250} />
      <View style={styles.innerContainer}>
        <Text h1 style={styles.headerStyle}>
          Welcome
        </Text>
        <Text style={[styles.descStyle, { color: "white" }]}>
          Our aim is to make the best out of your tours!
        </Text>
        <Text style={styles.descStyle}>
          Spottrip is a tour planning app that will help you in your tours and trips. Sign up or Log
          in to enjoy this special experience.
        </Text>
        <View style={styles.buttonGroup}>
          <Button
            title="Log in"
            buttonStyle={[styles.buttonStyle, { backgroundColor: "#011627" }]}
            titleStyle={{ color: "#FDFFFC", fontWeight: "bold" }}
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          />
          <Button
            title="Sign up"
            buttonStyle={[styles.buttonStyle, { backgroundColor: "#FDFFFC" }]}
            titleStyle={{ color: "#011627", fontWeight: "bold" }}
            onPress={() => {
              navigation.navigate("SignupPersonalInfo");
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
  },
  logoStyle: {
    marginTop: 50,
    marginBottom: 30,
    // marginRight: 100,
  },
  innerContainer: {
    paddingHorizontal: 30,
    backgroundColor: "#FF9F1C",
    width: "100%",
    flexDirection: "column",
    flex: 1,
    borderTopLeftRadius: 31,
    borderTopRightRadius: 31,
  },
  headerStyle: {
    marginTop: 20,
    marginBottom: 5,
    color: "#011627",
    fontWeight: "bold",
    // text,
  },
  descStyle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#011627",
  },
  buttonStyle: {
    paddingHorizontal: 45,
    paddingVertical: 25,
    borderRadius: 50,
  },
  buttonGroup: {
    marginTop: 20,
    // justifyContent:
    flexDirection: "row",
    justifyContent: "space-evenly",
    // alignItems: "center",
  },
});

export default WelcomeScreen;
