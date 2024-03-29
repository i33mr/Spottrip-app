import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import Modal from "react-native-modal";

import { SearchBar, Button, Text, Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Context as TourContext } from "../context/TourContext";
import { Context as NotificationContext } from "../context/NotificationContext";
import { NavigationEvents } from "react-navigation";
import TourTile from "../components/TourTile";
import No_tours_icon from "../../assets/images/no-tours.svg";
const TourListScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tours, setTours] = useState([]);

  const { state, fetchTours } = useContext(TourContext);
  const Notification = useContext(NotificationContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newTourTitle, setNewTourTitle] = useState("");
  const [newTourTitleError, setNewTourTitleError] = useState("");
  // useEffect(() => {
  //   fetchTours();
  // }, []);

  // searchTerm;

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // fetchTourInvites(tourId);
    fetchTours();
    // fetchToursAndSetNotifications();

    setRefreshing(false);
  };

  // const fetchToursAndSetNotifications = async () => {
  //   await fetchTours();

  // };

  useEffect(() => {
    Notification.resetLocalNotifications(state.tours);
    Notification.getAllNotifications();
    setTours(state.tours);
  }, [state.tours]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    const formatQuery = searchTerm.toLowerCase();
    const tempTours = state.tours.filter((tour) => {
      if (tour.title.toLowerCase().includes(formatQuery)) return tour;
    });
    setTours(tempTours);
  };

  const createNewTour = () => {
    toggleModal();

    navigation.navigate("TourCreate", { tourTitle: newTourTitle, newTour: true });

    setNewTourTitle("");
    setNewTourTitleError("");
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={fetchTours} />
      <Modal isVisible={isModalVisible} avoidKeyboard={true}>
        <View style={styles.modalStyle}>
          <Button
            icon={<MaterialCommunityIcons name="close-thick" size={36} color="#FFF" />}
            iconPosition="left"
            onPress={toggleModal}
            type="clear"
            style={{ width: 50 }}
          />
          <Text style={styles.modalTextStyle}>Enter Tour Title</Text>
          {newTourTitleError ? (
            <Text
              style={{ color: "#E71D36", marginTop: 15, alignSelf: "center", fontWeight: "bold" }}
            >
              {newTourTitleError}
            </Text>
          ) : null}

          <Input
            inputStyle={styles.modalInputStyle}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            style={{ marginBottom: 0 }}
            value={newTourTitle}
            onChangeText={setNewTourTitle}
          />
          {/* <Button title="Create New Tour" onPress={toggleModal} /> */}
          <Button
            title="Create New Tour"
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
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.customHeader}>
          <SearchBar
            containerStyle={styles.searchContainer}
            inputContainerStyle={{ backgroundColor: "white" }}
            leftIconContainerStyle={{ backgroundColor: "rgba(0,0,0,0)" }}
            inputStyle={{ backgroundColor: "rgba(0,0,0,0)" }}
            placeholder="Search by tour title..."
            value={searchTerm}
            onChangeText={handleSearch}
            returnKeyType={"search"}
            raised
          />
          <TouchableOpacity style={{ marginRight: 10 }} onPress={toggleModal}>
            <Ionicons name="add-circle-outline" size={40} color="#229186" />
          </TouchableOpacity>
        </View>
        <View style={styles.toursList}>
          {tours.map((tour) => {
            // console.log(tour);
            return <TourTile navigation={navigation} tour={tour} key={tour._id} />;
          })}
        </View>
        {state.tours.length ? null : (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <No_tours_icon height={300} />
            <Text
              style={{
                color: "#FF9F1C",
                fontSize: 24,
                fontWeight: "bold",
                textAlign: "center",
                margin: 10,
              }}
            >
              Create new tours and they will be shown here!
            </Text>
            {/* <Text style={{ color: "#FF9F1C", fontSize: 16, fontWeight: "bold" }}></Text> */}
          </View>
        )}
      </ScrollView>
      {state.isLoading ? (
        // <Modal animationType="none" transparent={true} visible={true}>
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#FF9F1C" />
        </View>
      ) : null}
    </View>
  );
};

TourListScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexDirection: "column",
    flex: 1,
  },
  customHeader: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0)",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  toursList: {
    marginTop: 20,
    marginHorizontal: 10,
    // marginBottom: 70,
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
  },
  modalTextStyle: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: -20,
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

export default TourListScreen;
