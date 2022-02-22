import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Text, Input } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import GMaps_icon from "../../assets/images/google-maps.svg";
import { EvilIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

const ActiveTourScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.tourDetails}>
          <AntDesign name="clockcircle" size={24} color="#011627" />
          <Text style={styles.attractionDetailText}> 8:30 hours</Text>
          <EvilIcons name="location" size={28} color="#011627" />
          <Text style={styles.attractionDetailText}>3 Attractions</Text>
          <MaterialCommunityIcons name="road" size={28} color="#011627" />
          <Text style={styles.attractionDetailText}> 14 km</Text>
        </View>
        <View style={styles.tourLocation}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#229186",
              width: "25%",
            }}
          >
            9:00 am
          </Text>
          <Octicons name="primitive-dot" style={styles.dotStyle} size={40} />
          <View style={styles.tourLocationElement}>
            <Text style={{ color: "#FFF", fontSize: 20, fontWeight: "bold" }}>Start Location</Text>
          </View>
        </View>
        <View>
          <Octicons name="primitive-dot" style={[styles.dotStyle, { marginLeft: 99 }]} size={20} />
          <View style={styles.locationTravelTime}>
            <Text style={{ fontSize: 11, color: "#FF9F1C", width: "26.4%" }}>
              30 minutes travel
            </Text>
            <Octicons name="primitive-dot" style={[styles.dotStyle, {}]} size={20} />
          </View>
          <Octicons name="primitive-dot" style={[styles.dotStyle, { marginLeft: 99 }]} size={20} />
        </View>
        <View style={styles.tourLocation}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              color: "#229186",
              width: "25%",
            }}
          >
            9:30 am - 11:30 am
          </Text>
          <Octicons name="primitive-dot" style={styles.dotStyle} size={40} />
          <View style={styles.tourLocationElement}>
            <Text
              style={{
                color: "#FFF",
                fontSize: 20,
                fontWeight: "bold",
                width: "80%",
              }}
            >
              Batu Caves
            </Text>
            <GMaps_icon />
          </View>
        </View>
        <View>
          <Octicons name="primitive-dot" style={[styles.dotStyle, { marginLeft: 99 }]} size={20} />
          <View style={styles.locationTravelTime}>
            <Text style={{ fontSize: 11, color: "#FF9F1C", width: "26.4%" }}>
              15 minutes travel
            </Text>
            <Octicons name="primitive-dot" style={[styles.dotStyle, {}]} size={20} />
          </View>
          <Octicons name="primitive-dot" style={[styles.dotStyle, { marginLeft: 99 }]} size={20} />
        </View>
        <View style={styles.tourLocation}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              color: "#229186",
              width: "25%",
            }}
          >
            11:45 am - 2:45 pm
          </Text>
          <Octicons name="primitive-dot" style={styles.dotStyle} size={40} />
          <View style={styles.tourLocationElement}>
            <Text
              style={{
                color: "#FFF",
                fontSize: 20,
                fontWeight: "bold",
                width: "84%",
              }}
            >
              Kepong Metropolitan Park
            </Text>
            <GMaps_icon />
          </View>
        </View>
        <View>
          <Octicons name="primitive-dot" style={[styles.dotStyle, { marginLeft: 99 }]} size={20} />
          <View style={styles.locationTravelTime}>
            <Text style={{ fontSize: 11, color: "#FF9F1C", width: "26.4%" }}>
              25 minutes travel
            </Text>
            <Octicons name="primitive-dot" style={[styles.dotStyle, {}]} size={20} />
          </View>
          <Octicons name="primitive-dot" style={[styles.dotStyle, { marginLeft: 99 }]} size={20} />
        </View>
        <View style={styles.tourLocation}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              color: "#229186",
              width: "25%",
            }}
          >
            3:10 pm - 5:10 pm
          </Text>
          <Octicons name="primitive-dot" style={styles.dotStyle} size={40} />
          <View style={styles.tourLocationElement}>
            <Text
              style={{
                color: "#FFF",
                fontSize: 20,
                fontWeight: "bold",
                width: "84%",
              }}
            >
              Taman Tasik Cempaka
            </Text>
            <GMaps_icon />
          </View>
        </View>
        <View>
          <Octicons name="primitive-dot" style={[styles.dotStyle, { marginLeft: 99 }]} size={20} />
          <View style={styles.locationTravelTime}>
            <Text style={{ fontSize: 11, color: "#FF9F1C", width: "26.4%" }}>
              20 minutes travel
            </Text>
            <Octicons name="primitive-dot" style={[styles.dotStyle, {}]} size={20} />
          </View>
          <Octicons name="primitive-dot" style={[styles.dotStyle, { marginLeft: 99 }]} size={20} />
        </View>
        <View style={[styles.tourLocation, { marginBottom: 15 }]}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#229186",
              width: "25%",
            }}
          >
            5:30 pm
          </Text>
          <Octicons name="primitive-dot" style={styles.dotStyle} size={40} />
          <View style={styles.tourLocationElement}>
            <Text style={{ color: "#FFF", fontSize: 20, fontWeight: "bold" }}>Finish Location</Text>
          </View>
        </View>
        <Button
          title="End Tour Now"
          buttonStyle={styles.buttonStyle}
          titleStyle={{ fontSize: 20, fontWeight: "600" }}
          onPress={() => navigation.navigate("TourList")}
        />
      </ScrollView>
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
  tourDetails: {
    backgroundColor: "#FF9F1C",
    // height: 50,
    marginTop: 10,
    marginBottom: 25,
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
  tourLocation: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: -15,
  },
  dotStyle: {
    marginHorizontal: 5,
    // marginTop: 3,
    color: "#E71D36",
  },
  tourLocationElement: {
    // marginLeft: 15,
    backgroundColor: "#011627",
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  locationTravelTime: {
    flexDirection: "row",
  },
  buttonStyle: {
    marginHorizontal: 80,
    paddingVertical: 20,
    borderRadius: 50,
    backgroundColor: "#E71D36",
    marginBottom: 15,
  },
});

ActiveTourScreen.navigationOptions = () => {
  return {
    title: "My First KL Visit",
    headerBackTitle: " ",
    headerRight: () => (
      <Button
        icon={<MaterialCommunityIcons name="bell" size={24} color="#229186" />}
        type="clear"
      />
    ),
  };
};

export default ActiveTourScreen;
