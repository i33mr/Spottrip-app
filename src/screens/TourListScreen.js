import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
  RefreshControl,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Context as TourContext } from "../context/TourContext";
import { Context as NotificationContext } from "../context/NotificationContext";
import { NavigationEvents } from "react-navigation";
import TourTile from "../components/TourTile";

const TourListScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tours, setTours] = useState([]);

  const { state, fetchTours } = useContext(TourContext);
  const Notification = useContext(NotificationContext);

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
    console.log(formatQuery);
  };

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={fetchTours} />
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
          <TouchableOpacity style={{ marginRight: 10 }}>
            <Ionicons name="add-circle-outline" size={40} color="#229186" />
          </TouchableOpacity>
        </View>
        <View style={styles.toursList}>
          {tours.map((tour) => {
            // console.log(tour);
            return <TourTile navigation={navigation} tour={tour} key={tour._id} />;
          })}
        </View>
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
});

export default TourListScreen;
