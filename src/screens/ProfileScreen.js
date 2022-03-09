import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
  Modal as RNModal,
  ActivityIndicator,
} from "react-native";
import { SearchBar, Button, Text, Icon, Input, Card } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";
import spottripAPI from "../api/spottripAPI";
import moment from "moment";
import Modal from "react-native-modal";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Image } from "react-native-expo-image-cache";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

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
// import { Context as AuthContext } from "../context/AuthContext";

const ProfileScreen = ({ navigation }) => {
  const { state, signOut, setToken } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalAccountInfoVisible, setModalAccountInfoVisible] = useState(false);
  const [isModalPreferencesVisible, setModalPreferencesVisible] = useState(false);

  const [userEmail, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [changesPassword, setChangesPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const filterList = [
    {
      name: "Parks",
      hook: useState(false),
      icon: function (fill) {
        return <Park_icon fill={fill} />;
      },
    },
    {
      name: "Historical",
      hook: useState(false),
      icon: function (fill) {
        return <Historical_icon fill={fill} />;
      },
    },
    {
      name: "Mountains",
      hook: useState(false),
      icon: function (fill) {
        return <Waterfall_icon fill={fill} />;
      },
    },
    {
      name: "Beach",
      hook: useState(false),
      icon: function (fill) {
        return <Beach_icon fill={fill} />;
      },
    },
    {
      name: "Museum",
      hook: useState(false),
      icon: function (fill) {
        return <Museum_icon fill={fill} />;
      },
    },
    {
      name: "Zoo",
      hook: useState(false),
      icon: function (fill) {
        return <Zoo_icon fill={fill} />;
      },
    },
    {
      name: "Sport",
      hook: useState(false),
      icon: function (fill) {
        return <Sport_icon fill={fill} />;
      },
    },
    {
      name: "Markets",
      hook: useState(false),
      icon: function (fill) {
        return <Markets_icon fill={fill} />;
      },
    },
    {
      name: "Festivals",
      hook: useState(false),
      icon: function (fill) {
        return <Festivals_icon fill={fill} />;
      },
    },
    {
      name: "Malls",
      hook: useState(false),
      icon: function (fill) {
        return <Malls_icon fill={fill} />;
      },
    },
    {
      name: "Cultural",
      hook: useState(false),
      icon: function (fill) {
        return <Cultural_icon fill={fill} />;
      },
    },
    {
      name: "Unique",
      hook: useState(false),
      icon: function (fill) {
        return <Unique_icon fill={fill} />;
      },
    },
  ];

  const isFilterSelected = (filter) => {
    return filterList.filter((obj) => {
      return obj.name === filter.name;
    })[0].hook[0];
  };
  // useContext;
  // const [userEmail, setEmail] = useState("");
  // const [dateOfBirth, setDateOfBirth] = useState(new Date("2001-01-01"));

  useEffect(() => {
    (async () => {
      // setIsLoading(true);
      try {
        const response = await spottripAPI.get(`v1/users/me`);
        setUser(response.data.data.user);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();

    // clean useEffect
  }, []);

  useEffect(() => {
    if (user !== null) {
      setEmail(user.email);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      filterList.forEach((element) => {
        if (user.preferences.includes(element.name)) {
          element.hook[1](true);
        }
      });
    }
  }, [user]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      updateImage(result.uri);
    }
  };

  const updateImage = async (uri) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("photo", {
      name: "profile.jpg",
      uri: Platform.OS === "ios" ? uri.replace("file://", "") : uri,
      type: "image/jpeg",
    });

    // console.log(formData);

    try {
      const response = await fetch("http://2f00-151-255-174-169.ngrok.io/v1/users/me", {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${state.token}`,
          Access: "application/json",
          "Content-Type": "multipart/form-data;",
        },
      });

      if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
      }

      const responseJSON = await response.json();

      setUser(responseJSON.data.user);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
      setIsLoading(false);
    }
  };

  const submitProfileChanges = async () => {
    try {
      setIsLoading(true);

      const response = await spottripAPI.patch(`v1/users/me`, {
        email: userEmail,
        firstName,
        lastName,
        password: changesPassword,
      });
      setUser(response.data.data.user);
      // setChangesPassword("");
      // setShowPasswordField(false);
      setIsLoading(false);
      toggleAccountInfoModal();
    } catch (error) {
      console.log(error);
      setShowPasswordField(false);
    }
  };

  const updatePassword = async () => {
    try {
      setIsLoading(true);

      const response = await spottripAPI.patch(`v1/users/updatePassword`, {
        currentPassword,
        newPassword,
        newPasswordConfirm: passwordConfirm,
      });
      // console.log(response);
      setToken(response.data.data.token);
      setUser(response.data.data.user);
      // setChangesPassword("");
      // setShowPasswordField(false);
      setIsLoading(false);
      toggleAccountInfoModal();
    } catch (error) {
      console.log(error);
      setShowPasswordField(false);
    }
  };

  const updatePreference = async () => {
    try {
      setIsLoading(true);
      const prefArray = [];
      filterList.forEach((element) => {
        if (element.hook[0]) {
          prefArray.push(element.name);
        }
      });

      const response = await spottripAPI.patch(`v1/users/me`, { preferences: prefArray });
      setUser(response.data.data.user);
      // setChangesPassword("");
      // setShowPasswordField(false);
      setIsLoading(false);
      togglePreferencesModal();
    } catch (error) {
      console.log(error);
      setShowPasswordField(false);
    }
  };

  const toggleAccountInfoModal = () => {
    setChangesPassword("");
    setShowPasswordField(false);

    setModalAccountInfoVisible(!isModalAccountInfoVisible);
  };

  const togglePreferencesModal = () => {
    // setChangesPassword("");
    // setShowPasswordField(false);

    setModalPreferencesVisible(!isModalPreferencesVisible);
  };
  const onDateChange = (event, selectedDate) => {
    // console.log(event);
    // const currentDate = selectedDate || date;
    // console.log(currentDate);
    // setDateOfBirth(currentDate);
    // setChoseDOB(true);
    // console.log(moment().subtract(13, "years").toDate());
  };

  return (
    <View style={styles.container}>
      {user != null ? (
        <>
          <Modal isVisible={isModalAccountInfoVisible} avoidKeyboard={true}>
            <ScrollView
              style={styles.modalStyle}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <Button
                icon={<MaterialCommunityIcons name="close-thick" size={36} color="#FFF" />}
                iconPosition="left"
                onPress={toggleAccountInfoModal}
                type="clear"
                style={{ width: 50 }}
              />
              <Text style={styles.modalTextStyle}>Personal Info</Text>
              {/* <View style={styles.inputGroup}> */}
              {/* <Input label="Email" /> */}
              <Input
                label="Email"
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                autoCorrect={false}
                autoCapitalize="none"
                leftIcon={<MaterialCommunityIcons name="email" size={28} color="#229186" />}
                inputContainerStyle={styles.inputContainer}
                leftIconContainerStyle={{ marginLeft: 10 }}
                // placeholder="HH"
                keyboardType="email-address"
                // keyboardType="decimal-pad"
                onChangeText={setEmail}
                value={userEmail}
                returnKeyType="done"
              />
              <View style={styles.nameGroup}>
                <View style={styles.nameFieldContainer}>
                  <Input
                    label="First Name"
                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    autoCorrect={false}
                    autoCapitalize="none"
                    // leftIcon={<MaterialCommunityIcons name="email" size={28} color="#229186" />}
                    inputContainerStyle={styles.inputContainer}
                    leftIconContainerStyle={{ marginLeft: 10 }}
                    // placeholder="HH"
                    // keyboardType="email-address"
                    // keyboardType="decimal-pad"
                    onChangeText={setFirstName}
                    value={firstName}
                    returnKeyType="done"
                  />
                </View>
                <View style={styles.nameFieldContainer}>
                  <Input
                    label="Last Name"
                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    autoCorrect={false}
                    autoCapitalize="none"
                    // leftIcon={<MaterialCommunityIcons name="email" size={28} color="#229186" />}
                    inputContainerStyle={styles.inputContainer}
                    leftIconContainerStyle={{ marginLeft: 10 }}
                    // placeholder="HH"
                    // keyboardType=""
                    // keyboardType="decimal-pad"
                    onChangeText={setLastName}
                    value={lastName}
                    returnKeyType="done"
                  />
                </View>
              </View>
              {!showPasswordField ? (
                <Button
                  title="Confirm Changes"
                  buttonStyle={{
                    marginVertical: 20,
                    backgroundColor: "#229186",
                    marginHorizontal: 50,
                    paddingVertical: 20,
                    borderRadius: 50,
                    marginBottom: 15,
                  }}
                  titleStyle={{ fontWeight: "bold" }}
                  onPress={() => setShowPasswordField(true)}
                  type="solid"
                />
              ) : null}

              {showPasswordField ? (
                <>
                  <Input
                    label="Please enter your password to continue"
                    inputStyle={styles.inputStyle}
                    labelStyle={styles.labelStyle}
                    autoCorrect={false}
                    autoCapitalize="none"
                    inputContainerStyle={styles.inputContainer}
                    leftIconContainerStyle={{ marginLeft: 10 }}
                    onChangeText={setChangesPassword}
                    value={changesPassword}
                    secureTextEntry={true}
                    textContentType="oneTimeCode"
                  />
                  <Button
                    // icon={<Magic_icon fill="#FDFFFC" />}
                    // style={{ flex: 1 }}
                    title="Submit"
                    buttonStyle={{
                      marginVertical: 20,
                      backgroundColor: "#229186",
                      marginHorizontal: 50,
                      paddingVertical: 20,
                      borderRadius: 50,
                      marginBottom: 15,
                    }}
                    titleStyle={{ fontWeight: "bold" }}
                    onPress={() => submitProfileChanges()}
                    type="solid"
                  />
                </>
              ) : null}
              <Text style={styles.modalTextStyle}>Password</Text>
              <Input
                label="Current Password"
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                autoCorrect={false}
                autoCapitalize="none"
                inputContainerStyle={styles.inputContainer}
                leftIconContainerStyle={{ marginLeft: 10 }}
                onChangeText={setCurrentPassword}
                value={currentPassword}
                secureTextEntry={true}
                textContentType="oneTimeCode"
              />
              <Input
                label="New Password"
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                autoCorrect={false}
                autoCapitalize="none"
                inputContainerStyle={styles.inputContainer}
                leftIconContainerStyle={{ marginLeft: 10 }}
                onChangeText={setNewPassword}
                value={newPassword}
                secureTextEntry={true}
                textContentType="oneTimeCode"
              />
              <Input
                label="Confirm Password"
                inputStyle={styles.inputStyle}
                labelStyle={styles.labelStyle}
                autoCorrect={false}
                autoCapitalize="none"
                inputContainerStyle={styles.inputContainer}
                leftIconContainerStyle={{ marginLeft: 10 }}
                onChangeText={setPasswordConfirm}
                value={passwordConfirm}
                secureTextEntry={true}
                textContentType="oneTimeCode"
              />
              <Button
                title="Change password"
                buttonStyle={{
                  marginVertical: 20,
                  backgroundColor: "#229186",
                  marginHorizontal: 50,
                  paddingVertical: 20,
                  borderRadius: 50,
                  marginBottom: 15,
                }}
                titleStyle={{ fontWeight: "bold" }}
                onPress={() => updatePassword()}
                type="solid"
              />
              {/* </View> */}

              {isLoading ? (
                <RNModal animationType="none" transparent={true} visible={true}>
                  <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#FF9F1C" />
                  </View>
                </RNModal>
              ) : null}
            </ScrollView>
          </Modal>
          <Modal isVisible={isModalPreferencesVisible} avoidKeyboard={true}>
            <ScrollView
              style={styles.modalStyle}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <Button
                icon={<MaterialCommunityIcons name="close-thick" size={36} color="#FFF" />}
                iconPosition="left"
                onPress={togglePreferencesModal}
                type="clear"
                style={{ width: 50 }}
              />
              <Text style={styles.modalTextStyle}>Your Preferred Categories</Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#FFF",
                  fontWeight: "400",
                  marginTop: 5,
                  marginLeft: 10,
                }}
              >
                The selected categories are highlighted
              </Text>

              <View style={{ paddingVertical: 15, marginVertical: 15 }}>
                <View style={styles.buttonGroup}>
                  {filterList.map((preference) => {
                    return (
                      <TouchableOpacity
                        key={preference.name}
                        style={
                          isFilterSelected(preference)
                            ? styles.buttonStyleSelected
                            : styles.preferenceButtonStyle
                        }
                        onPress={() => {
                          preference.hook[1](!isFilterSelected(preference));
                        }}
                      >
                        {preference.icon
                          ? preference.icon(isFilterSelected(preference) ? "#FFF" : "#229186")
                          : null}
                        <Text
                          style={
                            isFilterSelected(preference)
                              ? styles.buttonLabelSelected
                              : styles.buttonLabel
                          }
                        >
                          {preference.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
              <Button
                title="Confirm Changes"
                buttonStyle={{
                  marginVertical: 20,
                  backgroundColor: "#229186",
                  marginHorizontal: 50,
                  paddingVertical: 20,
                  borderRadius: 50,
                  marginBottom: 15,
                }}
                titleStyle={{ fontWeight: "bold" }}
                onPress={() => updatePreference()}
                type="solid"
              />
              {isLoading ? (
                <RNModal animationType="none" transparent={true} visible={true}>
                  <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#FF9F1C" />
                  </View>
                </RNModal>
              ) : null}
            </ScrollView>
          </Modal>
        </>
      ) : null}
      {user != null ? (
        <ScrollView horizontal={false}>
          <View style={styles.ellipse}>
            <View style={styles.upperInfo}>
              {/* <Image
                style={styles.profileImg}
                source={require("../../assets/images/avatars/person4.png")}
              /> */}

              <View style={styles.profileImgContainer}>
                <Image
                  style={styles.profileImg}
                  // {...{ uri }}
                  uri={`http://2f00-151-255-174-169.ngrok.io/img/users/${user.photo}`}
                  preview={{
                    uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
                  }}
                />
              </View>
              <TouchableOpacity style={styles.uploadPicButton} onPress={pickImage}>
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
                <Text style={styles.nameStyle}>{`${user.firstName} ${user.lastName}`}</Text>
              </View>
              <Text style={{ fontSize: 16, marginTop: 15 }}>{user.username}</Text>
            </View>
          </View>
          <View style={styles.mainContent}>
            <View style={[styles.infoCard]}>
              <View style={styles.infoCardTitle}>
                <Text style={{ fontWeight: "bold" }}>Account Information</Text>
                <TouchableOpacity onPress={toggleAccountInfoModal}>
                  <Icon name="pencil-circle" type="material-community" size={30} color="#229186" />
                </TouchableOpacity>
              </View>
              <View style={styles.pieceOfInfo}>
                <Text style={{ fontSize: 16, width: 125 }}>Email Address</Text>
                <Text>{user.email}</Text>
              </View>
              <View style={styles.pieceOfInfo}>
                <Text style={{ fontSize: 16, width: 125 }}>Date of Birth</Text>
                <Text>{moment(user.dateOfBirth).format("DD/MM/YYYY")}</Text>
              </View>
              <View style={styles.pieceOfInfo}>
                <Text style={{ fontSize: 16, width: 125 }}>Password</Text>
                <Text>**************</Text>
              </View>
            </View>
            <View style={[styles.infoCard]}>
              <View style={styles.infoCardTitle}>
                <Text style={{ fontWeight: "bold" }}>Preferences</Text>
                <TouchableOpacity onPress={togglePreferencesModal}>
                  <Icon name="pencil-circle" type="material-community" size={30} color="#229186" />
                </TouchableOpacity>
              </View>
              {user != null
                ? user.preferences.map((preference) => {
                    return (
                      <View key={preference} style={styles.pieceOfInfo}>
                        <Text style={{ fontSize: 16, width: 125 }}>{preference}</Text>
                      </View>
                    );
                  })
                : null}
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
      ) : null}
      {isLoading ? (
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
  profileImgContainer: {
    height: 150,
    width: 150,
  },
  profileImg: {
    height: "100%",
    width: "100%",
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
    // flexDirection: "row",
    // justifyContent: "space-evenly",
    alignItems: "center",
  },
  nameStyle: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 15,
    color: "#011627",
    alignSelf: "center",
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
  modalStyle: {
    backgroundColor: "#011627",
    borderRadius: 15,
    flex: 1,
  },
  inputStyle: {
    // borderWidth: 2,
    // borderColor: "#229186",
    paddingVertical: 15,
    // borderRadius: 50,
    paddingHorizontal: 10,
    // fontSize: 22,
    // textAlign: "center",
    color: "#011627",
    // fontWeight: "bold",
    // marginBottom: -15,
  },
  labelStyle: {
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    color: "#FFF",
  },
  inputContainer: {
    borderWidth: 2,
    borderColor: "#229186",
    borderRadius: 50,
    marginBottom: -20,
    // paddingBottom: ,
    backgroundColor: "#FFF",
  },
  nameGroup: {
    // width: "100%",
    // marginVertical: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  nameFieldContainer: {
    flex: 1,
    // paddingHorizontal: 5,
  },
  modalTextStyle: {
    color: "#FF9F1C",
    // textAlign: "center",
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
    // marginTop: -20,
  },
  buttonGroup: {
    // marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  buttonStyleSelected: {
    marginTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 15,
    borderColor: "#229186",
    borderWidth: 1,
    backgroundColor: "#229186",
  },
  preferenceButtonStyle: {
    // width: 90,
    marginTop: 5,
    backgroundColor: "#FFF",

    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 15,
    borderColor: "#229186",
    borderWidth: 1,
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
});

ProfileScreen.navigationOptions = () => {
  return {
    // title: "Tours",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="account" type="material-community" color={tintColor} size={28} />
    ),
  };
};

export default ProfileScreen;
