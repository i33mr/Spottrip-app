import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { Text, Button, Input } from "react-native-elements";
import Google_icon from "../../assets/images/google-icon.svg";
import { Context as AuthContext } from "../context/AuthContext";
import { NavigationEvents } from "react-navigation";
import { ScrollView } from "react-native-gesture-handler";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const SignInScreen = ({ navigation }) => {
  const { state, signIn, clearErrorMessage } = useContext(AuthContext);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [expoPushToken, setExpoPushToken] = useState("");
  const responseListener = useRef();

  // const [showIndicator, setShowIndicator] = useState(false);

  const registerForPushNotificationsAsync = async () => {
    let token;
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  };

  useEffect(async () => {
    const token = await registerForPushNotificationsAsync();
    setExpoPushToken(token);
    // console.log(Notification);
    // Notification.setNotificationToken(token);
    // Notification.addLocalNotification();
    // console.log(await Notifications.getAllScheduledNotificationsAsync());

    // This listener is fired whenever a notification is received while the app is foregrounded
    // notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
    //   setNotification(notification);
    // });

    // // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const passwordRef = useRef();
  return (
    // <View style={{ flex: 1 }}>
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <NavigationEvents onWillFocus={clearErrorMessage} />

        <TouchableOpacity onPress={() => navigation.navigate("SignupPersonalInfo")}>
          <Text h5 style={styles.signupButton}>
            Sign up
          </Text>
        </TouchableOpacity>

        <Text h1 style={styles.header}>
          Log in
        </Text>
        <Text style={styles.descStyle}>
          Enter your Email and Password to log in to your Spottrip account, or use your google
          account to login instead.
        </Text>
        <View style={styles.innerContainer}>
          {state.errorMessage ? (
            <Text style={styles.errorMessage}>{state.errorMessage}</Text>
          ) : null}
          <Input
            label="Email"
            value={emailOrUsername}
            onChangeText={setEmailOrUsername}
            inputStyle={styles.inputStyle}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            labelStyle={styles.labelStyle}
            autoCorrect={false}
            autoCapitalize="none"
            onSubmitEditing={() => {
              passwordRef.current.focus();
            }}
          />
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            inputStyle={styles.inputStyle}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            labelStyle={styles.labelStyle}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry
            style={{ marginTop: 0 }}
            ref={passwordRef}
          />
          <TouchableOpacity>
            <Text style={styles.fPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          <Button
            title="Log in"
            buttonStyle={[styles.buttonStyle, { backgroundColor: "#229186" }]}
            titleStyle={{ fontSize: 24, fontWeight: "bold" }}
            // onPress={() => {
            //   navigation.navigate("Home");
            // }}
            onPress={() => {
              signIn({ emailOrUsername, password, expoPushToken });
              // setShowIndicator(true);
            }}
          />

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
            containerStyle={{ borderRadius: 50, marginTop: 20 }}
            raised
          />
        </View>
        {state.isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#FF9F1C" />
          </View>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

SignInScreen.navigationOptions = () => {
  return {
    //   headerRight: () => <Text>Sign up</Text>,
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    // flex: 1,
    backgroundColor: "#FF9F1C",
  },
  signupButton: {
    paddingHorizontal: 30,
    textAlign: "right",
    fontWeight: "600",
    color: "#011627",
  },
  header: {
    color: "#011627",
    fontWeight: "bold",
    paddingHorizontal: 30,
  },
  descStyle: {
    paddingHorizontal: 30,
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "#011627",
  },
  innerContainer: {
    marginTop: 10,
    padding: 30,
    backgroundColor: "#FFF",
    width: "100%",
    flexDirection: "column",
    flex: 1,
    borderTopLeftRadius: 31,
    borderTopRightRadius: 31,
  },
  inputStyle: {
    borderWidth: 2,
    borderColor: "#FF9F1C",
    paddingVertical: 20,
    borderRadius: 50,
    paddingHorizontal: 10,
  },
  labelStyle: {
    marginBottom: 10,
    marginLeft: 10,
    color: "#011627",
  },
  fPassword: {
    marginRight: 15,
    textAlign: "right",
    fontWeight: "600",
    color: "#011627",
  },
  buttonStyle: {
    marginTop: 10,
    paddingVertical: 20,
    borderRadius: 50,
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

export default SignInScreen;
