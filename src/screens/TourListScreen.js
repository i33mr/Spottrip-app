import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Modal,
} from "react-native";
import { SearchBar } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Context as TourContext } from "../context/TourContext";
import { NavigationEvents } from "react-navigation";
import TourTile from "../components/TourTile";

const TourListScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { state, fetchTours } = useContext(TourContext);

  useEffect(() => {
    // console.log(forwardedSearchTerm);
    // fetchTours();
  }, []);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={fetchTours} />
      <ScrollView>
        <View style={styles.customHeader}>
          <SearchBar
            containerStyle={styles.searchContainer}
            inputContainerStyle={{ backgroundColor: "white" }}
            leftIconContainerStyle={{ backgroundColor: "rgba(0,0,0,0)" }}
            inputStyle={{ backgroundColor: "rgba(0,0,0,0)" }}
            placeholder="Search by tour title..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            returnKeyType={"search"}
            raised
          />
          <TouchableOpacity style={{ marginRight: 10 }}>
            <Ionicons name="add-circle-outline" size={40} color="#229186" />
          </TouchableOpacity>
        </View>
        <View style={styles.toursList}>
          {state.tours.map((tour) => {
            return <TourTile navigation={navigation} tour={tour} key={tour._id} />;
          })}
        </View>
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
  tourItem: {
    backgroundColor: "#011627",
    borderRadius: 15,
    marginBottom: 10,
    padding: 10,
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
  },
  tourItemActive: {
    backgroundColor: "#229186",
    borderRadius: 15,
    marginBottom: 10,
    padding: 10,
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
  },
  imgLayout: {
    flexDirection: "row",
    flex: 1,
    alignItems: "flex-start",
    flexWrap: "wrap",
    // backgroundColor: "rgba(202,204,201, 0.4)",
    marginRight: 5,
  },
  attractionImg: {
    width: "50%",
    // width: 25,
    height: 80,
  },
  tourDetail: {
    // height: 70,
    fontWeight: "bold",
    width: 0,
    flexGrow: 1,
  },
  tourTitle: {
    fontWeight: "700",
    color: "#FFF",
  },
  tourExtraDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
    // flex: 1,
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
