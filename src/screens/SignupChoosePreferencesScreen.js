import React, { useContext, useState } from "react";
import { View, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { Text, Button, Input } from "react-native-elements";
import ProgressBar from "react-native-progress/Bar";
import Park_icon from "../../assets/images/Parks.svg";
import Historical_icon from "../../assets/images/Historical.svg";
import Waterfall_icon from "../../assets/images/Waterfall.svg";
import Beach_icon from "../../assets/images/Beach.svg";
import Museum_icon from "../../assets/images/Museum.svg";
import Zoo_icon from "../../assets/images/Zoo.svg";
import Sport_icon from "../../assets/images/Sport.svg";
import Markets_icon from "../../assets/images/Markets.svg";
import Festivals_icon from "../../assets/images/Festivals.svg";
import Malls_icon from "../../assets/images/Malls.svg";
import Cultural_icon from "../../assets/images/Cultural.svg";
import Unique_icon from "../../assets/images/Unique.svg";
import { Context as AuthContext } from "../context/AuthContext";
import { NavigationEvents } from "react-navigation";

const SignupChoosePreferencesScreen = ({ navigation }) => {
  // const categories = [
  //   "Parks",
  //   "Historical",
  //   "Mountains",
  //   "Beach",
  //   "Museum",
  //   "Zoo",
  //   "Sport",
  //   "Markets",
  //   "Festivals",
  //   "Malls",
  //   "Cultural",
  //   "Unique",
  // ];
  // categories.forEach((element) => {
  //   element = { element: false };
  // });
  const [isParkSelected, setIsParkSelected] = useState(false);
  const [isHistSelected, setIsHistSelected] = useState(false);
  const [isWaterSelected, setIsWaterSelected] = useState(false);
  const [isBeachSelected, setIsBeachSelected] = useState(false);
  const [isMuseumSelected, setIsMuseumSelected] = useState(false);
  const [isZooSelected, setIsZooSelected] = useState(false);
  const [isSportSelected, setIsSportSelected] = useState(false);
  const [isMarketSelected, setIsMarketSelected] = useState(false);
  const [isFestSelected, setIsFestSelected] = useState(false);
  const [isMallSelected, setIsMallSelected] = useState(false);
  const [isCultSelected, setIsCultSelected] = useState(false);
  const [isUniqueSelected, setIsUniqueSelected] = useState(false);
  // const altStyle = "backgroundColor: '#229186'";

  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const preferencesArray = [];
  const setPreferencesArray = () => {
    isParkSelected ? preferencesArray.push("Parks") : null;
    isHistSelected ? preferencesArray.push("Historical") : null;
    isWaterSelected ? preferencesArray.push("Mountains") : null;
    isBeachSelected ? preferencesArray.push("Beach") : null;
    isMuseumSelected ? preferencesArray.push("Museum") : null;
    isZooSelected ? preferencesArray.push("Zoo") : null;
    isSportSelected ? preferencesArray.push("Sport") : null;
    isMarketSelected ? preferencesArray.push("Markets") : null;
    isFestSelected ? preferencesArray.push("Festivals") : null;
    isMallSelected ? preferencesArray.push("Malls") : null;
    isCultSelected ? preferencesArray.push("Cultural") : null;
    isUniqueSelected ? preferencesArray.push("Unique") : null;
  };

  const submitSignup = () => {
    setPreferencesArray();
    if (!username) {
      setErrorMessage("Please enter a username");
    } else if (preferencesArray.length < 3) {
      setErrorMessage("Please select at least 3 categories");
    } else {
      setErrorMessage("");
      console.log({ username, preferences: preferencesArray, ...state.userObj });
      signup({ username, preferences: preferencesArray, ...state.userObj });
    }
  };

  return (
    <ScrollView
      style={styles.container}
      // contentContainerStyle={{ flexGrow: 1 }}
      // contentContainerStyle={{ flexGrow: 1 }}
    >
      <NavigationEvents onWillFocus={clearErrorMessage} />

      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <Text h5 style={styles.signInButton}>
          Log in
        </Text>
      </TouchableOpacity>

      <Text h1 style={styles.header}>
        Sign up
      </Text>
      <Text style={styles.descStyle}>Enter Username and Select preferences</Text>
      <ProgressBar
        progress={0.5}
        width={null}
        height={10}
        style={{ marginHorizontal: 30, marginTop: 15 }}
        color={"rgba(253, 255, 252, 1)"}
        unfilledColor={"rgba(253, 255, 252, 0.7)"}
      />
      <View style={styles.innerContainer}>
        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
        {state.errorMessage ? <Text style={styles.errorMessage}>{state.errorMessage}</Text> : null}

        <Input
          // style={{ marginTop: 0 }}
          label="Username"
          inputStyle={styles.inputStyle}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          labelStyle={styles.labelStyle}
          autoCorrect={false}
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
        />
        <Text style={{ fontWeight: "bold", marginLeft: 15 }}>Select Categories</Text>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={isParkSelected ? styles.buttonStyleSelected : styles.buttonStyle}
            onPress={() => {
              setIsParkSelected(!isParkSelected);
            }}
          >
            <Park_icon fill={isParkSelected ? "#FFF" : "#229186"} />
            <Text style={isParkSelected ? styles.buttonLabelSelected : styles.buttonLabel}>
              Parks
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={isHistSelected ? styles.buttonStyleSelected : styles.buttonStyle}
            onPress={() => {
              setIsHistSelected(!isHistSelected);
            }}
          >
            <Historical_icon fill={isHistSelected ? "#FFF" : "#229186"} />
            <Text style={isHistSelected ? styles.buttonLabelSelected : styles.buttonLabel}>
              Historical
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={isWaterSelected ? styles.buttonStyleSelected : styles.buttonStyle}
            onPress={() => {
              setIsWaterSelected(!isWaterSelected);
            }}
          >
            <Waterfall_icon fill={isWaterSelected ? "#FFF" : "#229186"} />
            <Text style={isWaterSelected ? styles.buttonLabelSelected : styles.buttonLabel}>
              Waterfalls
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={isBeachSelected ? styles.buttonStyleSelected : styles.buttonStyle}
            onPress={() => {
              setIsBeachSelected(!isBeachSelected);
            }}
          >
            <Beach_icon fill={isBeachSelected ? "#FFF" : "#229186"} />
            <Text style={isBeachSelected ? styles.buttonLabelSelected : styles.buttonLabel}>
              Beach
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={isMuseumSelected ? styles.buttonStyleSelected : styles.buttonStyle}
            onPress={() => {
              setIsMuseumSelected(!isMuseumSelected);
            }}
          >
            <Museum_icon fill={isMuseumSelected ? "#FFF" : "#229186"} />
            <Text style={isMuseumSelected ? styles.buttonLabelSelected : styles.buttonLabel}>
              Museum
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={isZooSelected ? styles.buttonStyleSelected : styles.buttonStyle}
            onPress={() => {
              setIsZooSelected(!isZooSelected);
            }}
          >
            <Zoo_icon fill={isZooSelected ? "#FFF" : "#229186"} />
            <Text style={isZooSelected ? styles.buttonLabelSelected : styles.buttonLabel}>Zoo</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={isSportSelected ? styles.buttonStyleSelected : styles.buttonStyle}
            onPress={() => {
              setIsSportSelected(!isSportSelected);
            }}
          >
            <Sport_icon fill={isSportSelected ? "#FFF" : "#229186"} />
            <Text style={isSportSelected ? styles.buttonLabelSelected : styles.buttonLabel}>
              Sport
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={isMarketSelected ? styles.buttonStyleSelected : styles.buttonStyle}
            onPress={() => {
              setIsMarketSelected(!isMarketSelected);
            }}
          >
            <Markets_icon fill={isMarketSelected ? "#FFF" : "#229186"} />
            <Text style={isMarketSelected ? styles.buttonLabelSelected : styles.buttonLabel}>
              Markets
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={isFestSelected ? styles.buttonStyleSelected : styles.buttonStyle}
            onPress={() => {
              setIsFestSelected(!isFestSelected);
            }}
          >
            <Festivals_icon fill={isFestSelected ? "#FFF" : "#229186"} />
            <Text style={isFestSelected ? styles.buttonLabelSelected : styles.buttonLabel}>
              Festivals
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={isMallSelected ? styles.buttonStyleSelected : styles.buttonStyle}
            onPress={() => {
              setIsMallSelected(!isMallSelected);
            }}
          >
            <Malls_icon fill={isMallSelected ? "#FFF" : "#229186"} />
            <Text style={isMallSelected ? styles.buttonLabelSelected : styles.buttonLabel}>
              Malls
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={isCultSelected ? styles.buttonStyleSelected : styles.buttonStyle}
            onPress={() => {
              setIsCultSelected(!isCultSelected);
            }}
          >
            <Cultural_icon fill={isCultSelected ? "#FFF" : "#229186"} />
            <Text style={isCultSelected ? styles.buttonLabelSelected : styles.buttonLabel}>
              Cultural
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={isUniqueSelected ? styles.buttonStyleSelected : styles.buttonStyle}
            onPress={() => {
              setIsUniqueSelected(!isUniqueSelected);
            }}
          >
            <Unique_icon fill={isUniqueSelected ? "#FFF" : "#229186"} />
            <Text style={isUniqueSelected ? styles.buttonLabelSelected : styles.buttonLabel}>
              Unique
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonGroup}>
          <Button
            title="Back"
            buttonStyle={[styles.navButtonStyle, { backgroundColor: "#FFF" }]}
            titleStyle={{ color: "#FF9F1C", fontWeight: "bold" }}
            onPress={() => {
              navigation.navigate("SignupPersonalInfo");
            }}
          />
          <Button
            title="Submit"
            buttonStyle={[styles.navButtonStyle, { backgroundColor: "#FF9F1C" }]}
            titleStyle={{ color: "#FDFFFC", fontWeight: "bold" }}
            onPress={() => {
              // navigation.navigate("SignupDone");
              submitSignup();
            }}
          />
        </View>
      </View>
      {state.isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#FF9F1C" />
        </View>
      ) : null}
    </ScrollView>
  );
};
SignupChoosePreferencesScreen.navigationOptions = ({ navigation }) => ({
  gestureEnabled: false,
  // headerLeft: () => null,
  headerShown: false,
});
const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: "#229186",
    flex: 1,
  },
  signInButton: {
    paddingHorizontal: 30,
    textAlign: "right",
    fontWeight: "600",
    color: "#FDFFFC",
  },
  header: {
    color: "#FDFFFC",
    fontWeight: "bold",
    paddingHorizontal: 30,
  },
  descStyle: {
    paddingHorizontal: 30,
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "#FDFFFC",
  },
  innerContainer: {
    marginTop: 10,
    paddingHorizontal: 15,
    paddingTop: 30,
    paddingBottom: 50,
    backgroundColor: "#FFF",
    width: "100%",
    flexDirection: "column",
    borderTopLeftRadius: 31,
    borderTopRightRadius: 31,
  },
  inputStyle: {
    borderWidth: 2,
    borderColor: "#229186",
    paddingVertical: 20,
    borderRadius: 50,
    paddingHorizontal: 10,
    marginBottom: -15,
  },
  labelStyle: {
    marginBottom: 10,
    marginLeft: 10,
    color: "#011627",
  },
  buttonStyle: {
    // width: 90,
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 15,
    borderColor: "#229186",
    borderWidth: 1,
  },
  buttonStyleSelected: {
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 15,
    borderColor: "#229186",
    borderWidth: 1,
    backgroundColor: "#229186",
  },
  buttonGroup: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  buttonLabel: {
    textAlign: "center",
    color: "#229186",
    fontWeight: "bold",
    fontSize: 11,
  },
  buttonLabelSelected: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 11,
  },
  navButtonStyle: {
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 15,
    borderColor: "#FF9F1C",
    borderWidth: 1,
  },
  errorMessage: {
    padding: 20,
    marginTop: -20,
    color: "#FF0000",
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
});

export default SignupChoosePreferencesScreen;
