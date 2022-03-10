import React, { useContext, useState } from "react";
import { View, StyleSheet, Modal as RNModal, ActivityIndicator } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { Context as AuthContext } from "../context/AuthContext";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const { state, forgotPassword, clearForgotPasswordMessage } = useContext(AuthContext);
  return (
    <View style={{ backgroundColor: "#FFF", flex: 1 }}>
      <NavigationEvents onWillFocus={clearForgotPasswordMessage} />
      <Text
        style={{
          alignSelf: "center",
          marginTop: 20,
          fontSize: 24,
          fontWeight: "bold",
          color: "#011627",
        }}
      >
        Forgot Password?
      </Text>
      <Text
        style={{
          alignSelf: "center",
          marginTop: 20,
          fontSize: 14,
          textAlign: "center",
          fontWeight: "bold",
          color: "#FF9F1C",
        }}
      >
        Please enter your email address below and we will send you a link to reset your password
      </Text>
      <Text
        style={{
          alignSelf: "center",
          marginVertical: 20,
          fontSize: 14,
          textAlign: "center",
          fontWeight: "bold",
          // color: "#229186",
        }}
      >
        {state.forgotPasswordMsg}
      </Text>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        inputStyle={styles.inputStyle}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        labelStyle={styles.labelStyle}
        autoCorrect={false}
        autoCapitalize="none"
      />

      <Button
        title="Reset Password"
        buttonStyle={[styles.buttonStyle, { backgroundColor: "#229186" }]}
        titleStyle={{ fontSize: 20, fontWeight: "bold" }}
        onPress={() => {
          forgotPassword(email);
        }}
      />
      {state.isLoading ? (
        <RNModal animationType="none" transparent={true} visible={true}>
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#FF9F1C" />
          </View>
        </RNModal>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
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
  buttonStyle: {
    marginTop: 10,
    paddingVertical: 20,
    borderRadius: 50,
    marginHorizontal: 50,
  },
});

ForgotPasswordScreen.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam("Forgot password"),
  };
};

export default ForgotPasswordScreen;
