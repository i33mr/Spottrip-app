import React, { useContext, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { Text, Button, Input } from "react-native-elements";
import ProgressBar from "react-native-progress/Bar";
import { Feather } from "@expo/vector-icons";
import Google_icon from "../../assets/images/google-icon.svg";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Context as AuthContext } from "../context/AuthContext";
import moment from "moment";

const SignupPersonalInfoScreen = ({ navigation }) => {
  const { signUpPersonalInfo } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date("2001-01-01"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setConfirmPassword] = useState("");

  const [choseDOB, setChoseDOB] = useState(false);

  const scrollRef = useRef();

  const scrollToTheTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const onDateChange = (event, selectedDate) => {
    // console.log(event);
    const currentDate = selectedDate || date;
    console.log(currentDate);
    setDateOfBirth(currentDate);
    setChoseDOB(true);
    // console.log(moment().subtract(13, "years").toDate());
  };

  const preValidate = () => {
    scrollToTheTop();
    Keyboard.dismiss();
    let regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!firstName || !lastName || !dateOfBirth || !email || !password || !passwordConfirm) {
      setErrorMessage("Please fill all the fields");
    } else if (!choseDOB) {
      setErrorMessage("Please select your date of birth");
    } else if (!regExp.test(email)) {
      setErrorMessage("Please enter a valid email");
    } else if (password.length < 8) {
      setErrorMessage("Please enter a password with 8 or more characters");
    } else if (password !== passwordConfirm) {
      setErrorMessage("Please enter matching passwords");
    } else {
      setErrorMessage("");
      signUpPersonalInfo({ firstName, lastName, dateOfBirth, email, password, passwordConfirm });
      navigation.navigate("SignupChoosePreferences");
    }
  };

  const lastNameRef = useRef();
  const dateOfBirthRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }} ref={scrollRef}>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text h5 style={styles.signInButton}>
            Log in
          </Text>
        </TouchableOpacity>

        <Text h1 style={styles.header}>
          Sign up
        </Text>
        <Text style={styles.descStyle}>Enter your personal information</Text>
        <ProgressBar
          progress={0.1}
          width={null}
          height={10}
          style={{ marginHorizontal: 30, marginTop: 15 }}
          color={"rgba(253, 255, 252, 1)"}
          unfilledColor={"rgba(253, 255, 252, 0.7)"}
        />
        <View style={styles.innerContainer}>
          {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
          <Input
            label="First Name"
            inputStyle={styles.inputStyle}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            labelStyle={styles.labelStyle}
            autoCorrect={false}
            autoCapitalize="sentences"
            value={firstName}
            onChangeText={setFirstName}
            onSubmitEditing={() => {
              lastNameRef.current.focus();
            }}
          />
          <Input
            label="Last Name"
            inputStyle={styles.inputStyle}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            labelStyle={styles.labelStyle}
            autoCorrect={false}
            autoCapitalize="sentences"
            value={lastName}
            onChangeText={setLastName}
            // onSubmitEditing={() => {
            //   dateOfBirthRef.current.click();
            // }}
            ref={lastNameRef}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "",
              // flex: 1,
              // borderWidth: 3,
              justifyContent: "flex-start",
              // marginTop: 20,
              paddingVertical: 20,
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ marginLeft: 10, fontSize: 16, fontWeight: "bold" }}>Date of Birth</Text>
            <DateTimePicker
              style={{ flex: 1 }}
              minimumDate={moment().subtract(150, "years").toDate()}
              maximumDate={moment().subtract(13, "years").toDate()}
              // testID="dateTimePicker"
              value={dateOfBirth}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          </View>

          <Input
            label="Email Address"
            inputStyle={styles.inputStyle}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            labelStyle={styles.labelStyle}
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            onSubmitEditing={() => {
              passwordRef.current.focus();
            }}
            ref={emailRef}
          />
          <Input
            label="Password"
            inputStyle={styles.inputStyle}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            labelStyle={styles.labelStyle}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            onSubmitEditing={() => {
              confirmPasswordRef.current.focus();
            }}
            ref={passwordRef}
          />
          <Input
            label="Confirm Password"
            inputStyle={styles.inputStyle}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            labelStyle={styles.labelStyle}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry
            value={passwordConfirm}
            onChangeText={setConfirmPassword}
            // textContentType="none"
            ref={confirmPasswordRef}
          />

          <Button
            iconPosition="right"
            title="Next"
            buttonStyle={[styles.buttonStyle, { backgroundColor: "#FF9F1C" }]}
            titleStyle={{ fontSize: 24, fontWeight: "bold" }}
            onPress={() => preValidate()}
          />
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
            <View>
              <Text
                style={{
                  width: 50,
                  textAlign: "center",
                  fontSize: 24,
                  color: "#229186",
                  fontWeight: "bold",
                }}
              >
                OR
              </Text>
            </View>
            <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
          </View>
          <Button
            icon={
              <Google_icon
                name="google"
                // size={36}
                width={30}
                height={30}
                color="green"
                style={{ marginRight: 20 }}
              />
            }
            iconPosition="left"
            title="Continue with Google"
            buttonStyle={[styles.buttonStyle, { backgroundColor: "#FDFFFC" }]}
            titleStyle={{ color: "#011627", fontSize: 16, fontWeight: "bold" }}
            containerStyle={[{ borderRadius: 15, marginTop: 20, marginBottom: 50 }]}
            raised
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
SignupPersonalInfoScreen.navigationOptions = ({ navigation }) => ({
  gestureEnabled: false,
  // headerLeft: () => null,
  headerShown: false,
});
const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: "#229186",
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
    padding: 30,
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
  },
  labelStyle: {
    marginBottom: 10,
    marginLeft: 10,
    color: "#011627",
  },

  buttonStyle: {
    marginTop: 10,
    paddingVertical: 20,
    borderRadius: 15,
  },
  errorMessage: {
    padding: 20,
    marginTop: -20,
    color: "#FF0000",
  },
});

export default SignupPersonalInfoScreen;
