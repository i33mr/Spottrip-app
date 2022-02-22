import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import ProgressBar from "react-native-progress/Bar";
import { SimpleLineIcons } from "@expo/vector-icons";

const SignupDoneScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text h1 style={styles.header}>
        Sign up
      </Text>
      <Text style={styles.descStyle}>Verify your email address</Text>
      <ProgressBar
        progress={0.8}
        width={null}
        height={10}
        style={{ marginHorizontal: 30, marginTop: 15 }}
        color={"rgba(253, 255, 252, 1)"}
        unfilledColor={"rgba(253, 255, 252, 0.7)"}
      />
      <View style={styles.innerContainer}>
        <Text h2 style={styles.innerHeader}>
          You’re ready to go!
        </Text>
        <Text style={styles.innerDesc}>
          We have finished setting up your Spottrip account , Just confirm your email to get
          started!
        </Text>
        <View style={{ flex: 1 }} />
        <Button
          icon={
            <SimpleLineIcons
              name="arrow-right"
              size={28}
              color="white"
              style={{ marginLeft: 150 }}
            />
          }
          iconPosition={"right"}
          title="Log in"
          buttonStyle={[styles.buttonStyle, { backgroundColor: "#FF9F1C" }]}
          titleStyle={{ color: "#FDFFFC", fontWeight: "bold", fontSize: 28 }}
          onPress={() => {
            navigation.navigate("mainFlow");
          }}
        />
        {/* </View> */}
      </View>
    </View>
  );
};

SignupDoneScreen.navigationOptions = ({ navigation }) => ({
  gestureEnabled: false,
  headerShown: false,
});
const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: "#229186",
    flex: 1,
  },
  header: {
    color: "#FDFFFC",
    fontWeight: "bold",
    paddingHorizontal: 30,
  },
  innerHeader: {
    color: "#011627",
    fontWeight: "bold",
    textAlign: "center",
  },
  descStyle: {
    paddingHorizontal: 30,
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "#FDFFFC",
  },
  innerDesc: {
    paddingHorizontal: 30,
    marginTop: 10,
    fontSize: 24,
    textAlign: "center",
  },
  innerContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#FFF",
    width: "100%",
    flexDirection: "column",
    borderTopLeftRadius: 31,
    borderTopRightRadius: 31,
    flex: 1,
  },

  buttonStyle: {
    // marginTop: 10,
    paddingVertical: 30,
    borderRadius: 15,
  },
});
export default SignupDoneScreen;
