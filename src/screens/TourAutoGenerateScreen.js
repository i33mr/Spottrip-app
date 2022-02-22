import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Button, Text, Input } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import Finish_icon from "../../assets/images/finish.svg";
import { Fontisto } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { FontAwesome } from "@expo/vector-icons";

const TourAutoGenerateScreen = ({ navigation }) => {
  const [startLocation, setStartLocation] = useState("");
  const [finishLocation, setFinishLocation] = useState("");
  const [editPermission, setEditPermission] = useState("");
  const [startNow, setStartNow] = useState("");

  const locations = [
    { label: "Current location", value: "Current location" },
    {
      label: "First location in the tour",
      value: "First location in the tour",
    },
  ];

  return (
    <ScrollView>
      <Input
        label="Time To Spend"
        inputStyle={styles.inputStyle}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        labelStyle={styles.labelStyle}
        autoCorrect={false}
        autoCapitalize="sentences"
        leftIcon={<AntDesign name="clockcircle" size={40} color="#229186" />}
        inputContainerStyle={styles.inputContainer}
        leftIconContainerStyle={{ marginLeft: 10 }}
        placeholder="HH:MM"
      />

      <RNPickerSelect onValueChange={setStartLocation} items={locations}>
        <Input
          label="Start Location"
          inputStyle={styles.inputStyle}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          labelStyle={styles.labelStyle}
          autoCorrect={false}
          autoCapitalize="sentences"
          leftIcon={<Fontisto name="flag" size={40} color="#229186" />}
          inputContainerStyle={styles.inputContainer}
          leftIconContainerStyle={{ marginLeft: 10 }}
          placeholder="Select location..."
          value={startLocation}
        />
      </RNPickerSelect>
      <RNPickerSelect onValueChange={setFinishLocation} items={locations}>
        <Input
          label="Finish Location"
          inputStyle={styles.inputStyle}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          labelStyle={styles.labelStyle}
          autoCorrect={false}
          autoCapitalize="sentences"
          leftIcon={<Finish_icon />}
          inputContainerStyle={styles.inputContainer}
          leftIconContainerStyle={{ marginLeft: 10 }}
          placeholder="Select location..."
          value={finishLocation}
        />
      </RNPickerSelect>
      <RNPickerSelect
        onValueChange={setEditPermission}
        items={[
          { label: "Host Only", value: "Host Only" },
          { label: "All", value: "All" },
        ]}
      >
        <Input
          label="Edit permission"
          inputStyle={styles.inputStyle}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          labelStyle={styles.labelStyle}
          autoCorrect={false}
          autoCapitalize="sentences"
          leftIcon={<FontAwesome name="unlock-alt" size={40} color="#229186" />}
          inputContainerStyle={styles.inputContainer}
          leftIconContainerStyle={{ marginLeft: 10 }}
          placeholder="Select an option..."
          value={editPermission}
        />
      </RNPickerSelect>
      <RNPickerSelect
        onValueChange={setStartNow}
        items={[
          { label: "Start Now", value: "Start Now" },
          { label: "Save for later", value: "Save for later" },
        ]}
      >
        <Input
          label="Start Now/ Save for later"
          inputStyle={styles.inputStyle}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          labelStyle={styles.labelStyle}
          autoCorrect={false}
          autoCapitalize="sentences"
          leftIcon={<FontAwesome name="save" size={40} color="#229186" />}
          inputContainerStyle={styles.inputContainer}
          leftIconContainerStyle={{ marginLeft: 10 }}
          placeholder="Select an option..."
          value={startNow}
        />
      </RNPickerSelect>
      <Button
        title="Generate Tour"
        buttonStyle={styles.buttonStyle}
        titleStyle={{ fontSize: 20, fontWeight: "600" }}
        onPress={() => navigation.navigate("TourManualCreate")}
      />
    </ScrollView>
  );
};

TourAutoGenerateScreen.navigationOptions = () => {
  return {
    title: "Tour Title",
    headerBackTitle: " ",
  };
};
const styles = StyleSheet.create({
  inputStyle: {
    // borderWidth: 2,
    // borderColor: "#229186",
    paddingVertical: 15,
    // borderRadius: 50,
    paddingHorizontal: 10,
    fontSize: 22,
    textAlign: "center",
    color: "#011627",
    fontWeight: "bold",
    // marginBottom: -15,
  },
  labelStyle: {
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    color: "#011627",
  },
  inputContainer: {
    borderWidth: 2,
    borderColor: "#229186",
    borderRadius: 50,
    marginBottom: -20,
    // paddingBottom: ,
  },
  buttonStyle: {
    marginHorizontal: 80,
    paddingVertical: 20,
    borderRadius: 50,
    backgroundColor: "#229186",
    marginVertical: 10,
  },
});

export default TourAutoGenerateScreen;
