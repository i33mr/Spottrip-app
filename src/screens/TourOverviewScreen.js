import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Modal,
} from "react-native";
import { Button, Text, Input } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { Context as TourContext } from "../context/TourContext";
import { Context as InvitesContext } from "../context/InvitesContext";
import { Context as NotificationContext } from "../context/NotificationContext";
import { NavigationEvents } from "react-navigation";
import TourInvite from "../components/TourInvite";
import TourAttractionTile from "../components/TourAttractionTile";
import TourSummaryBar from "../components/TourSummaryBar";
import { StackActions } from "react-navigation";
import { NavigationActions } from "react-navigation";
import DraggableFlatList, {
  ScaleDecorator,
  ShadowDecorator,
  OpacityDecorator,
} from "react-native-draggable-flatlist";

const TourOverviewScreen = ({ navigation, route }) => {
  const tourId = navigation.getParam("_id");

  const Tour = useContext(TourContext);
  const Invite = useContext(InvitesContext);
  const Notification = useContext(NotificationContext);

  const [isAddFriendFormVisible, setIsAddFriendFormVisible] = useState(false);
  const [isShowFriends, setIsShowFriends] = useState(false);
  const [isShowAttractions, setIsShowAttractions] = useState(true);
  const [friendUsername, setFriendUsername] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [invites, setInvites] = useState([]);
  const [tour, setTour] = useState(null);
  const [reordering, setReordering] = useState(false);
  const [reorderedAttractions, setReorderedAttractions] = useState([]);
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    // Invite.fetchTourInvites(tourId);
    // console.log(tourId);
    // if (tourId !== null) {
    // console.log("Get tour");
    Tour.getTour(tourId);
    Invite.fetchTourInvites(tourId);

    // }
  }, []);

  useEffect(() => {
    // console.log("Setting tour");
    // console.log(Tour.state.tour);

    if (tourId !== null) {
      setTour(Tour.state.tour);
      // console.log(tour);
      // console.log("tour set");
      // console.log(tour);
    }
  }, [Tour.state.tour]);
  useEffect(() => {
    if (tour !== null) {
      setAttractions(tour.attractions);
    }
  }, [tour]);
  useEffect(() => {
    // console.log("Setting invites");
    setInvites(Invite.state.invites);
  }, [Invite.state.invites]);

  const sendInvite = async () => {
    setIsSending(true);
    await Invite.sendTourInvite(tourId, friendUsername);
    setIsSending(false);
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    Tour.getTour(tourId);

    Invite.fetchTourInvites(tourId);

    setRefreshing(false);
  };

  const activateTour = async () => {
    try {
      await Tour.updateTourStatus(tourId, "Active");
      // console.log(Tour.state.tours);
      await Notification.addLocalNotification(tour);
      const actionToDispatch = StackActions.reset({
        index: 1,
        // key: null,
        actions: [
          NavigationActions.navigate({ routeName: "TourList" }),

          NavigationActions.navigate({
            routeName: "ActiveTour",
            params: {
              _id: tourId,
              tourTitle: navigation.getParam("tourTitle"),
              // method: navigation.getParam("method"),
            },
          }),
        ],
      });
      navigation.dispatch(actionToDispatch);
      // navigation.navigate("ActiveTour", { _id: tourId });
    } catch (error) {
      console.log(error);
    }
  };

  const reorderAttractions = async () => {
    await Tour.updateAttractionsOrder(tourId, attractions);
  };

  return (
    <View style={styles.container}>
      {tour !== null ? (
        <DraggableFlatList
          data={attractions}
          onDragEnd={({ data }) => setAttractions(data)}
          keyExtractor={(item) => item._id._id}
          renderItem={({ item, index, drag, isActive }) => {
            return isShowAttractions ? (
              <OpacityDecorator>
                <ShadowDecorator>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                      <TourAttractionTile
                        attraction={item}
                        removeAttraction={Tour.removeAttraction}
                        tourId={tourId}
                        getTour={Tour.getTour}
                      />
                    </View>
                    {reordering ? (
                      <TouchableOpacity
                        onLongPress={drag}
                        style={{
                          position: "absolute",
                          alignItems: "center",
                          justifyContent: "center",
                          top: 10,
                          bottom: 0,
                          left: -5,
                          backgroundColor: "rgba(220,220,220,0.5)",
                          borderTopLeftRadius: 25,
                          borderBottomLeftRadius: 25,
                        }}
                      >
                        <MaterialIcons
                          name="drag-indicator"
                          size={45}
                          color="#011627"
                          style={{
                            shadowColor: "#000",
                            shadowOffset: {
                              width: 0,
                              height: 12,
                            },
                            shadowOpacity: 0.58,
                            shadowRadius: 16.0,

                            elevation: 24,
                            // backgroundColor: "rgba(220,220,220,0.5)",
                          }}
                        />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                </ShadowDecorator>
              </OpacityDecorator>
            ) : null;
          }}
          ListHeaderComponent={
            <>
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
                      style={{
                        color: "#FFF",
                        paddingHorizontal: 10,
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      Enter Your Friend's Username
                    </Text>
                    {Invite.state.inviteMsg ? (
                      <Text
                        style={Invite.state.inviteMsg.code === 200 ? styles.success : styles.error}
                      >
                        {Invite.state.inviteMsg.msg}
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
                    color="#011627"
                    style={{ padding: 0 }}
                  />
                }
                buttonStyle={styles.showElementsButtonStyle}
                titleStyle={{ fontSize: 20, fontWeight: "bold", color: "#000" }}
                type="clear"
                style={{ alignItems: "flex-start" }}
                onPress={() => setIsShowFriends(!isShowFriends)}
              />
              {isShowFriends ? (
                <View style={styles.showFriendsView}>
                  {invites.map((invite) => {
                    return (
                      <TourInvite
                        invite={invite}
                        key={invite._id}
                        removeInvite={Invite.removeInvite}
                      />
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
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Button
                  title="Attractions"
                  icon={
                    <MaterialIcons
                      name={isShowAttractions ? "arrow-drop-down" : "arrow-right"}
                      size={36}
                      color="#011627"
                      style={{ padding: 0 }}
                    />
                  }
                  buttonStyle={styles.showElementsButtonStyle}
                  titleStyle={{ fontSize: 20, fontWeight: "bold", color: "#000" }}
                  type="clear"
                  style={{ alignItems: "flex-start" }}
                  onPress={() => setIsShowAttractions(!isShowAttractions)}
                />
                {isShowAttractions && !reordering ? (
                  <TouchableOpacity onPress={() => setReordering(true)} style={{ marginRight: 10 }}>
                    <FontAwesome name="list-ol" size={36} color="#011627" />
                  </TouchableOpacity>
                ) : null}
                {reordering ? (
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      onPress={() => {
                        reorderAttractions();
                        setReordering(false);
                      }}
                      style={{ marginRight: 10 }}
                    >
                      <MaterialIcons name="save" size={36} color="#011627" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setReordering(false);
                        setAttractions(tour.attractions);
                      }}
                      style={{ marginRight: 10 }}
                    >
                      <MaterialIcons name="cancel" size={36} color="black" />
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            </>
          }
          ListFooterComponent={
            <>
              <View
                style={{
                  borderBottomColor: "#011627",
                  borderBottomWidth: 1,
                  marginVertical: 10,
                }}
              />
              {tour !== null ? <TourSummaryBar tour={tour} /> : null}

              <View style={styles.buttonGroup}>
                <View style={styles.buttonContainer}>
                  <Button
                    // icon={<Magic_icon fill="#FDFFFC" />}
                    // style={{ flex: 1 }}
                    title="Add Attractions"
                    buttonStyle={[styles.buttonStyle, { borderColor: "#229186", borderWidth: 1 }]}
                    titleStyle={{ color: "#229186", fontWeight: "bold" }}
                    onPress={() => navigation.navigate("TourAddAttraction", { _id: tourId })}
                    type="outline"
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    title="Save Tour"
                    buttonStyle={[styles.buttonStyle, { borderColor: "#FF9F1C", borderWidth: 1 }]}
                    titleStyle={{ color: "#FF9F1C", fontWeight: "bold" }}
                    onPress={() => navigation.navigate("TourList")}
                    type="outline"
                  />
                </View>
              </View>
              <Button
                title="Start Tour"
                buttonStyle={[styles.buttonStyle, { backgroundColor: "#229186", marginBottom: 10 }]}
                titleStyle={{ color: "#FDFFFC", fontWeight: "bold" }}
                onPress={() => activateTour()}
              />
            </>
          }
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      ) : null}
      {/* <>
          <View
            style={{
              borderBottomColor: "#011627",
              borderBottomWidth: 1,
              marginVertical: 10,
            }}
          />
          {tour !== null ? <TourSummaryBar tour={tour} /> : null}

          <View style={styles.buttonGroup}>
            <View style={styles.buttonContainer}>
              <Button
                // icon={<Magic_icon fill="#FDFFFC" />}
                // style={{ flex: 1 }}
                title="Add Attractions"
                buttonStyle={[styles.buttonStyle, { borderColor: "#229186", borderWidth: 1 }]}
                titleStyle={{ color: "#229186", fontWeight: "bold" }}
                onPress={() => navigation.navigate("TourAddAttraction", { _id: tourId })}
                type="outline"
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Save Tour"
                buttonStyle={[styles.buttonStyle, { borderColor: "#FF9F1C", borderWidth: 1 }]}
                titleStyle={{ color: "#FF9F1C", fontWeight: "bold" }}
                onPress={() => navigation.navigate("TourList")}
                type="outline"
              />
            </View>
          </View>
          <Button
            title="Start Tour"
            buttonStyle={[styles.buttonStyle, { backgroundColor: "#229186", marginBottom: 10 }]}
            titleStyle={{ color: "#FDFFFC", fontWeight: "bold" }}
            onPress={() => activateTour()}
          />
        </> */}
      {/* </ScrollView> */}
      {Tour.state.isLoading || Invite.state.isLoading ? (
        <Modal animationType="none" transparent={true} visible={true}>
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#FF9F1C" />
          </View>
        </Modal>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexDirection: "column",
    flex: 1,
    paddingHorizontal: 10,
  },
  addFriendButtonStyle: {
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: "#011627",
    marginVertical: 10,
  },
  addFriendView: {
    backgroundColor: "#011627",
    borderRadius: 15,
    marginTop: 10,
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
  },
  showElementsButtonStyle: {
    borderColor: "red",
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginLeft: -10,
  },
  elementView: {
    borderRadius: 15,
    backgroundColor: "#011627",
    marginTop: 10,
    flexDirection: "row",
  },
  friendImg: {
    marginHorizontal: 5,
  },
  AttractionDetali: {
    flex: 1,
  },
  elementDetaliText: {
    color: "#FFF",
    fontWeight: "500",
    marginTop: 5,
  },
  dotStyle: {
    marginHorizontal: 5,
    marginTop: 3,
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 5,
  },
  buttonStyle: {
    // width: "75%",
    // flex: 1,
    // flexWrap: "wrap",
    // alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 50,
  },
  buttonGroup: {
    // width: "100%",
    marginVertical: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  attractionImg: {
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    height: 150,
    width: 150,
    marginRight: 10,
  },
  tourDetails: {
    backgroundColor: "#FF9F1C",
    // height: 50,
    // marginBottom: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  attractionDetailText: {
    fontSize: 15,
    fontWeight: "bold",
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
});

TourOverviewScreen.navigationOptions = ({ navigation }) => {
  return {
    title: navigation.getParam("tourTitle"),
    headerBackTitle: " ",
    headerRight: () => (
      <Button
        onPress={() =>
          navigation.navigate("TourSettings", {
            _id: navigation.getParam("_id"),
            method: navigation.getParam("method"),
          })
        }
        icon={<Ionicons name="settings-sharp" size={24} color="#011627" />}
        type="clear"
      />
    ),
  };
};
export default TourOverviewScreen;
