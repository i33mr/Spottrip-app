import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Modal as RNModal,
} from "react-native";
import { Button, Text, Input } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Magic_icon from "../../assets/images/magic.svg";
import Pointer_icon from "../../assets/images/pointer.svg";
import { Context as InvitesContext } from "../context/InvitesContext";
import { Context as TourContext } from "../context/TourContext";
import { NavigationEvents } from "react-navigation";
import spottripAPI from "../api/spottripAPI";
import TourInvite from "../components/TourInvite";
import Modal from "react-native-modal";
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const TourCreateScreen = ({ navigation }) => {
  const { state, fetchTourInvites, sendTourInvite, clearInviteMessage, removeInvite } =
    useContext(InvitesContext);

  const Tour = useContext(TourContext);

  const tourTitle = navigation.getParam("tourTitle");

  const [isAddFriendFormVisible, setIsAddFriendFormVisible] = useState(false);
  const [isShowFriends, setIsShowFriends] = useState(false);
  const [friendUsername, setFriendUsername] = useState("");
  const [tourId, setTourId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [invites, setInvites] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(async () => {
    if (navigation.getParam("newTour")) {
      try {
        const response = await spottripAPI.post(`/v1/tours`, { title: tourTitle });

        setTourId(response.data.data.tour._id);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      setTourId(navigation.getParam("_id"));
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (tourId !== null) {
      fetchTourInvites(tourId);
    }
  }, [tourId]);

  useEffect(() => {
    // console.log("Setting invites");
    setInvites(state.invites);
  }, [state.invites]);

  const sendInvite = async () => {
    setIsSending(true);
    await sendTourInvite(tourId, friendUsername);
    setIsSending(false);
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    fetchTourInvites(tourId);

    setRefreshing(false);
  };

  const toggleModal = async () => {
    if (!isModalVisible) await fetchTourInvites(tourId);
    setModalVisible(!isModalVisible);
  };

  const removeInviteFromTour = async (inviteId, inviteeId) => {
    try {
      await removeInvite(tourId, inviteId);
    } catch (error) {
      showMessage({
        message: "Couldn't Remove Invite",
        description: error.message,
        type: "danger",
        duration: 4000,
        floating: true,
        hideOnPress: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearInviteMessage} />
      <Modal isVisible={isModalVisible} avoidKeyboard={true}>
        <View style={styles.modalStyle}>
          <Button
            icon={<MaterialCommunityIcons name="close-thick" size={36} color="#FFF" />}
            iconPosition="left"
            onPress={toggleModal}
            type="clear"
            style={{ width: 50 }}
          />

          <Text style={styles.modalTextStyle}>
            {`The following friends' will be considered in the tour generation (accepted invite): `}
          </Text>

          {invites.map((invite) => {
            if (invite.status === "Accepted")
              return (
                <Text
                  style={{
                    color: "#229186",
                    alignSelf: "center",
                    fontWeight: "bold",
                    fontSize: 18,
                    marginVertical: 10,
                  }}
                  key={invite.invitee._id}
                >
                  {invite.invitee.username}
                </Text>
              );
          })}

          <Button
            title="Continue"
            buttonStyle={[styles.modalButtonStyle]}
            titleStyle={{ fontSize: 22, fontWeight: "bold" }}
            onPress={() => {
              {
                newTourTitle ? createNewTour() : setNewTourTitleError("Tour title cannot be empty");
              }
            }}
          />
        </View>
      </Modal>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View style={styles.addFriendView}>
          <Button
            title="Add Friend"
            icon={<AntDesign name="addusergroup" size={24} color="#FFF" />}
            buttonStyle={styles.addFriendButtonStyle}
            titleStyle={{ fontSize: 20, fontWeight: "bold" }}
            onPress={() => setIsAddFriendFormVisible(!isAddFriendFormVisible)}
          />
          {isAddFriendFormVisible ? (
            <View style={styles.addFriendForm}>
              <Text
                style={{ color: "#FFF", paddingHorizontal: 10, fontWeight: "bold", fontSize: 18 }}
              >
                Enter Your Friend's Username
              </Text>
              {state.inviteMsg ? (
                <Text style={state.inviteMsg.code === 200 ? styles.success : styles.error}>
                  {state.inviteMsg.msg}
                </Text>
              ) : null}
              <Input
                // label="Enter Your Friend’s Username"
                inputStyle={styles.usernameInputStyle}
                inputContainerStyle={{ borderBottomWidth: 0 }}
                // style={{ marginTop: 15 }}
                labelStyle={{ color: "#FFF" }}
                value={friendUsername}
                onChangeText={setFriendUsername}
              />
              <Button
                title="Send Invite"
                buttonStyle={styles.inviteButtonStyle}
                titleStyle={{ fontSize: 20, fontWeight: "600" }}
                onPress={sendInvite}
                loading={isSending ? true : false}
                disabled={isSending ? true : false}
                disabledStyle={{ backgroundColor: "#229186" }}
                // loading
              />
            </View>
          ) : null}
        </View>

        <View
          style={{
            borderBottomColor: "#011627",
            borderBottomWidth: 1,
            marginVertical: 10,
          }}
        />
        <Button
          title="Friends"
          icon={
            <MaterialIcons
              name={isShowFriends ? "arrow-drop-down" : "arrow-right"}
              size={36}
              color="black"
              style={{ padding: 0 }}
            />
          }
          buttonStyle={styles.showFriendsButtonStyle}
          titleStyle={{ fontSize: 20, fontWeight: "bold", color: "#000" }}
          type="clear"
          style={{ alignItems: "flex-start" }}
          onPress={() => setIsShowFriends(!isShowFriends)}
        />
        {isShowFriends ? (
          <View style={styles.showFriendsView}>
            {invites.map((invite) => {
              return (
                <TourInvite invite={invite} key={invite._id} removeInvite={removeInviteFromTour} />
              );
            })}
          </View>
        ) : null}
        <View
          style={{
            borderBottomColor: "#011627",
            borderBottomWidth: 1,
            marginVertical: 10,
          }}
        />
        <View style={styles.buttonGroup}>
          <Button
            icon={<Magic_icon fill="#FDFFFC" />}
            title="Generate Based on Preferences"
            buttonStyle={[styles.buttonStyle, { backgroundColor: "#229186" }]}
            titleStyle={{ color: "#FDFFFC", fontWeight: "bold" }}
            // onPress={() => navigation.navigate("TourSettings")}
            onPress={
              invites.length
                ? toggleModal
                : () =>
                    navigation.navigate("TourSettings", {
                      method: "generate",
                      _id: tourId,
                      tourTitle: tourTitle,
                    })
            }
          />
          <Button
            icon={<Pointer_icon fill="#FDFFFC" />}
            title="Manually Select Attractions"
            buttonStyle={[styles.buttonStyle, { backgroundColor: "#E71D36" }]}
            titleStyle={{ color: "#FDFFFC", fontWeight: "bold" }}
            onPress={() =>
              navigation.navigate("TourSettings", {
                method: "manual",
                _id: tourId,
                tourTitle: tourTitle,
              })
            }
          />
        </View>
      </ScrollView>
      {isLoading || state.isLoading || Tour.isLoading ? (
        <RNModal animationType="none" transparent={true} visible={true}>
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#FF9F1C" />
          </View>
        </RNModal>
      ) : null}
      <FlashMessage position={"top"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#FFF",
    flexDirection: "column",
    flex: 1,
    paddingHorizontal: 10,
    // paddingTop: 10,
  },
  addFriendButtonStyle: {
    // marginVertical: 10,
    // paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: "#011627",
    marginVertical: 10,
  },
  addFriendView: {
    backgroundColor: "#011627",
    // height: 200,
    borderRadius: 15,
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
    marginTop: 10,
  },
  addFriendForm: {
    // height: 200,
  },
  usernameInputStyle: {
    paddingVertical: 15,
    borderRadius: 50,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    marginTop: 10,
  },
  inviteButtonStyle: {
    marginHorizontal: 80,
    paddingVertical: 10,
    borderRadius: 50,
    backgroundColor: "#229186",
    marginBottom: 20,
    // marginTop: -20,
  },
  showFriendsButtonStyle: {
    borderColor: "red",
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginLeft: -10,
    // borderWidth: 3,
    // marginTop: 0,
  },
  showFriendsView: {},
  friendView: {
    // height: 200,
    borderRadius: 15,
    backgroundColor: "#011627",
    marginTop: 10,
    flexDirection: "row",
  },
  friendImg: {
    marginHorizontal: 5,
    // borderRadius: 50,
    // height: "100%",
    // width: "28%",
  },
  friendDetailText: {
    color: "#FFF",
    fontWeight: "500",
    marginTop: 5,
  },
  inviteStatusApproved: {
    color: "#229186",
    fontWeight: "500",
    marginTop: 5,
  },
  inviteStatusPending: {
    color: "#FF9F1C",
    fontWeight: "500",
    marginTop: 5,
  },

  buttonStyle: {
    // paddingHorizontal: 5,
    width: 170,
    height: 170,
    paddingVertical: 50,
    borderRadius: 35,
    flexDirection: "column",
  },
  buttonGroup: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
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
  error: {
    color: "#E71D36",
    paddingHorizontal: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  success: {
    color: "#229186",
    paddingHorizontal: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  modalStyle: {
    backgroundColor: "#011627",
    borderRadius: 15,
    // flex:1
  },
  modalTextStyle: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  modalInputStyle: {
    paddingVertical: 15,
    borderRadius: 50,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    marginVertical: 20,
  },
  modalButtonStyle: {
    marginHorizontal: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: "#229186",
    marginBottom: 20,
  },
});

TourCreateScreen.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam("tourTitle"),
    headerBackTitle: " ",
  };
};
export default TourCreateScreen;
