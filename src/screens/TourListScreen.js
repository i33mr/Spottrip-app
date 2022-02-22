import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from "react-native";
import { SearchBar, Text } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const TourListScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <View style={styles.container}>
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
          <TouchableOpacity
            onPress={() => navigation.navigate("ActiveTour")}
            style={styles.tourItem}
          >
            <View style={styles.imgLayout}>
              <Image
                style={styles.attractionImg}
                source={require("../../assets/images/attractions/batu-caves1.jpg")}
              />
              <Image
                style={styles.attractionImg}
                source={require("../../assets/images/attractions/Kepong-Metropolitan-Park.png")}
              />
              <Image
                style={styles.attractionImg}
                source={require("../../assets/images/attractions/Taman-Tasik-Cempaka.png")}
              />
            </View>
            <View style={styles.tourDetail}>
              <Text style={[styles.tourTitle, { fontSize: 18 }]}>My First KL Visit</Text>
              <Text style={[styles.tourTitle, { fontSize: 15 }]}>Active tour</Text>
              <Text style={{ color: "#FFF", marginTop: 5 }}>Group:</Text>
              <Text style={{ color: "#FF9F1C", marginTop: 5, fontSize: 13 }}>David Spencer</Text>
              <Text style={{ color: "#FF9F1C", marginTop: 5, fontSize: 13 }}>Pamela Fuller</Text>

              <View style={[styles.tourExtraDetail, { marginTop: 10 }]}>
                <AntDesign name="clockcircle" size={12} color="#FFF" />
                <Text style={{ color: "#FFF", fontSize: 12 }}> 8:30 hours</Text>
              </View>
              <View style={styles.tourExtraDetail}>
                {/* <EvilIcons name="location" size={18} color="#FFF" /> */}
                <Ionicons name="location-outline" size={12} color="#FFF" />
                <Text style={{ color: "#FFF", fontSize: 12 }}>3 Attractions</Text>
              </View>
              <View style={styles.tourExtraDetail}>
                <MaterialCommunityIcons name="road" size={12} color="#FFF" />
                <Text style={{ color: "#FFF", fontSize: 12 }}> 14 km</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("PastTour")}
            style={[styles.tourItem, { backgroundColor: "#011627" }]}
          >
            <View style={styles.imgLayout}>
              <Image
                style={styles.attractionImg}
                source={require("../../assets/images/attractions/27_lepoh.jpg")}
              />
              <Image
                style={styles.attractionImg}
                source={require("../../assets/images/attractions/Serendah.png")}
              />
              <Image
                style={styles.attractionImg}
                source={require("../../assets/images/attractions/Sungai-Chilling.jpg")}
              />
              <Image
                style={styles.attractionImg}
                source={require("../../assets/images/attractions/attraction.jpg")}
              />
            </View>
            <View style={styles.tourDetail}>
              <Text style={[styles.tourTitle, { fontSize: 18 }]}>Selangor Nature</Text>
              <Text style={[styles.tourTitle, { fontSize: 15 }]}>Past tour</Text>
              <Text style={{ color: "#FFF", marginTop: 5 }}></Text>
              <Text style={{ color: "#FF9F1C", marginTop: 5, fontSize: 13 }}></Text>
              <Text style={{ color: "#FF9F1C", marginTop: 5, fontSize: 13 }}></Text>

              <View style={[styles.tourExtraDetail, { marginTop: 10 }]}>
                <AntDesign name="clockcircle" size={12} color="#FFF" />
                <Text style={{ color: "#FFF", fontSize: 12 }}> 8 hours</Text>
              </View>
              <View style={styles.tourExtraDetail}>
                {/* <EvilIcons name="location" size={18} color="#FFF" /> */}
                <Ionicons name="location-outline" size={12} color="#FFF" />
                <Text style={{ color: "#FFF", fontSize: 12 }}>5 Attractions</Text>
              </View>
              <View style={styles.tourExtraDetail}>
                <MaterialCommunityIcons name="road" size={12} color="#FFF" />
                <Text style={{ color: "#FFF", fontSize: 12 }}> 23 km</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("TourManualCreate")}
            style={[styles.tourItem, { backgroundColor: "#011627" }]}
          >
            <View style={styles.imgLayout}>
              <Image
                style={styles.attractionImg}
                source={require("../../assets/images/attractions/att2.jpg")}
              />
              <Image
                style={styles.attractionImg}
                source={require("../../assets/images/attractions/attraction.jpg")}
              />
              <Image
                style={styles.attractionImg}
                source={require("../../assets/images/attractions/att3.jpg")}
              />
              <Image
                style={styles.attractionImg}
                source={require("../../assets/images/attractions/att4.jpg")}
              />
            </View>
            <View style={styles.tourDetail}>
              <Text style={[styles.tourTitle, { fontSize: 18 }]}>Weekend in Malacca</Text>
              <Text style={[styles.tourTitle, { fontSize: 15 }]}>Draft tour</Text>
              <Text style={{ color: "#FFF", marginTop: 5 }}></Text>
              <Text style={{ color: "#FF9F1C", marginTop: 5, fontSize: 13 }}></Text>
              <Text style={{ color: "#FF9F1C", marginTop: 5, fontSize: 13 }}></Text>

              <View style={[styles.tourExtraDetail, { marginTop: 10 }]}>
                <AntDesign name="clockcircle" size={12} color="#FFF" />
                <Text style={{ color: "#FFF", fontSize: 12 }}> 10:30 hours</Text>
              </View>
              <View style={styles.tourExtraDetail}>
                <Ionicons name="location-outline" size={12} color="#FFF" />
                <Text style={{ color: "#FFF", fontSize: 12 }}>8 Attractions</Text>
              </View>
              <View style={styles.tourExtraDetail}>
                <MaterialCommunityIcons name="road" size={12} color="#FFF" />
                <Text style={{ color: "#FFF", fontSize: 12 }}> 36 km</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    marginBottom: 70,
  },
  tourItem: {
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
});

export default TourListScreen;
