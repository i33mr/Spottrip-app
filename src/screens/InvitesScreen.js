import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SearchBar, Button, Text, Icon, Input } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { Context as InvitesContext } from "../context/InvitesContext";
import { Image } from "react-native-expo-image-cache";
import No_invites_icon from "../../assets/images/no-invites.svg";
const InvitesScreen = () => {
  const { state, fetchUserInvites, respondToInvite } = useContext(InvitesContext);
  const [refreshing, setRefreshing] = useState(false);
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    fetchUserInvites();
  }, []);

  useEffect(() => {
    setInvites(state.userInvites);
  }, [state.userInvites]);

  const onRefresh = () => {
    setRefreshing(true);
    // fetchTourInvites(tourId);
    fetchUserInvites();
    // fetchToursAndSetNotifications();

    setRefreshing(false);
  };

  const respondToInviteAndRefresh = (tourId, inviteId, status) => {
    respondToInvite(tourId, inviteId, status), fetchUserInvites();
  };
  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={fetchUserInvites} />
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {invites.map((invite) => {
          // console.log(invite);
          // if (invite.status === "Pending") {
          return (
            <View style={styles.invite} key={invite._id}>
              {/* <Image
                  style={styles.invitePic}
                  source={require("../../assets/images/avatars/person1.jpeg")}
                /> */}
              <View style={{ width: 110, height: 110 }}>
                <Image
                  style={styles.invitePic}
                  // {...{ uri }}
                  uri={`http://ef98-2001-f40-935-492-70cd-9dd8-7fa2-beea.ngrok.io/img/users/${invite.inviter.photo}`}
                  preview={{
                    uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
                  }}
                />
              </View>
              <View style={styles.inviteDetail}>
                <Text h4 style={[styles.inviteDetailText, { fontWeight: "bold" }]}>
                  {invite.tour.title}
                </Text>
                <Text
                  style={styles.inviteDetailText}
                >{`By: ${invite.inviter.firstName} ${invite.inviter.lastName}`}</Text>
                <View style={styles.buttonGroup}>
                  <Button
                    buttonStyle={[styles.buttonStyle, { backgroundColor: "#E71D36" }]}
                    title="Deny"
                    titleStyle={[styles.inviteDetailText, { fontWeight: "bold" }]}
                    onPress={() =>
                      respondToInviteAndRefresh(invite.tour._id, invite._id, "Rejected")
                    }
                  />
                  <Button
                    buttonStyle={[styles.buttonStyle, { backgroundColor: "#229186" }]}
                    title="Accept"
                    titleStyle={[styles.inviteDetailText, { fontWeight: "bold" }]}
                    onPress={() =>
                      respondToInviteAndRefresh(invite.tour._id, invite._id, "Accepted")
                    }
                  />
                </View>
              </View>
            </View>
          );
          // }
        })}
        {invites.length ? null : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 30,
            }}
          >
            <No_invites_icon height={300} />
            <Text
              style={{
                color: "#229186",
                fontSize: 24,
                fontWeight: "bold",
                textAlign: "center",
                margin: 10,
              }}
            >
              Your received invites will be displayed here.
            </Text>
            {/* <Text style={{ color: "#FF9F1C", fontSize: 16, fontWeight: "bold" }}></Text> */}
          </View>
        )}
      </ScrollView>
      {state.isLoading ? (
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
    // flex: 1,
    backgroundColor: "#FFF",
    flexDirection: "column",
    flex: 1,
    paddingHorizontal: 15,
  },
  invite: {
    backgroundColor: "#FF9F1C",
    // temp height
    // height: 100,
    marginTop: 30,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  invitePic: {
    // maxHeight: 110,
    // maxWidth: 110,
    height: "100%",
    width: "100%",
    borderRadius: 60,
  },
  inviteDetail: {
    flex: 1,
    marginLeft: 10,
  },
  inviteDetailText: {
    color: "#FDFFFC",
  },
  buttonGroup: {
    flexDirection: "row-reverse",
    // alignItems: "",
    // flex: 1,
    // borderWidth: 3,
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonStyle: {
    // height: 50,
    // width: 50,
    borderRadius: 50,
    paddingVertical: 10,
    // paddingHorizontal: 20,
    width: 100,
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

InvitesScreen.navigationOptions = () => {
  return {
    // title: "Tours",
    tabBarIcon: ({ tintColor }) => (
      <Icon name="envelope-letter" type="simple-line-icon" color={tintColor} size={28} />
    ),
  };
};

export default InvitesScreen;
