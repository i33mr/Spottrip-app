import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList, Image, ScrollView } from "react-native";
import { SearchBar, Button, Text, Icon, Input } from "react-native-elements";
import { Octicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [isPrefPressed, setIsPrefPressed] = useState(true);
  const [isParksPressed, setIsParksPressed] = useState(false);
  const [isWaterPressed, setIsWaterPressed] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
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

          <Input
            inputStyle={styles.modalInputStyle}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            style={{ marginBottom: 0 }}
          />
          {/* <Button title="Create New Tour" onPress={toggleModal} /> */}
          <Button
            title="Create New Tour"
            buttonStyle={[styles.modalButtonStyle]}
            titleStyle={{ fontSize: 22, fontWeight: "bold" }}
            onPress={() => {
              toggleModal();
              navigation.navigate("TourCreate");
            }}
          />
        </View>
      </Modal>
      <ScrollView>
        <SearchBar
          containerStyle={styles.searchContainer}
          inputContainerStyle={{ backgroundColor: "white" }}
          leftIconContainerStyle={{ backgroundColor: "rgba(0,0,0,0)" }}
          inputStyle={{ backgroundColor: "rgba(0,0,0,0)" }}
          placeholder="Explore Attractions..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          returnKeyType={"search"}
          raised
        />

        <View style={{ marginTop: 10 }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={[
              {
                item: (
                  <Button
                    buttonStyle={isPrefPressed ? styles.buttonStylePressed : styles.buttonStyle}
                    onPress={() => {
                      setIsPrefPressed(!isPrefPressed);
                    }}
                    title="Your preferences"
                    titleStyle={{ fontWeight: "bold" }}
                  />
                ),
                key: 1,
              },
              {
                item: (
                  <Button
                    buttonStyle={isParksPressed ? styles.buttonStylePressed : styles.buttonStyle}
                    onPress={() => {
                      setIsParksPressed(!isParksPressed);
                    }}
                    title="Parks"
                    titleStyle={{ fontWeight: "bold" }}
                  />
                ),
                key: 2,
              },
              {
                item: (
                  <Button
                    buttonStyle={isWaterPressed ? styles.buttonStylePressed : styles.buttonStyle}
                    onPress={() => {
                      setIsWaterPressed(!isWaterPressed);
                    }}
                    title="Waterfalls"
                    titleStyle={{ fontWeight: "bold" }}
                  />
                ),
                key: 3,
              },
            ]}
            renderItem={({ item }) => item.item}
          />
        </View>
        <View style={styles.attractionsList}>
          <TouchableOpacity
            style={styles.attractionItem}
            onPress={() => navigation.navigate("AttractionDetail")}
          >
            <Image
              style={styles.attractionImg}
              source={require("../../assets/images/attractions/batu-caves1.jpg")}
            />
            <View style={styles.attractionDetail}>
              <View style={{ flexDirection: "row" }}>
                <Text>Historical</Text>
                <Octicons name="primitive-dot" style={styles.dotStyle} />
                <Text>2 hours</Text>
                <Octicons name="primitive-dot" style={styles.dotStyle} />
                <Text>3 km</Text>
              </View>
              <Text h3 style={styles.attractionTitle}>
                Batu Caves
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.attractionItem}>
            <Image
              style={styles.attractionImg}
              source={require("../../assets/images/attractions/Kepong-Metropolitan-Park.png")}
            />
            <View style={styles.attractionDetail}>
              <View style={{ flexDirection: "row" }}>
                <Text>Parks</Text>
                <Octicons name="primitive-dot" style={styles.dotStyle} />
                <Text>3 hours</Text>
                <Octicons name="primitive-dot" style={styles.dotStyle} />
                <Text>4 km</Text>
              </View>
              <Text h3 style={styles.attractionTitle}>
                Kepong Metropolitan Park
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.attractionItem}>
            <Image
              style={styles.attractionImg}
              source={require("../../assets/images/attractions/Taman-Tasik-Cempaka.png")}
            />
            <View style={styles.attractionDetail}>
              <View style={{ flexDirection: "row" }}>
                <Text>Park</Text>
                <Octicons name="primitive-dot" style={styles.dotStyle} />
                <Text>2 hours</Text>
                <Octicons name="primitive-dot" style={styles.dotStyle} />
                <Text>5 km</Text>
              </View>
              <Text h3 style={styles.attractionTitle}>
                Taman Tasik Cempaka
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View activeOpacity={0.5} style={styles.floatingViewStyle}>
        <Button
          onPress={toggleModal}
          buttonStyle={styles.floatingButtonStyle}
          titleStyle={{ fontWeight: "500", fontSize: 24 }}
          icon={
            <Icon name="map" type="Feather" size={25} color="#FFF" style={{ marginRight: 5 }} />
          }
          title="Create New Tour"
        />
      </View>
    </View>
  );
};

HomeScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#FFF",
    flexDirection: "column",
    flex: 1,
  },
  searchContainer: {
    marginTop: 30,
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
  buttonOuterLayout: {
    flex: 1,
    backgroundColor: "blue",
  },
  buttonStyle: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: "#CACCC9",
  },
  buttonStylePressed: {
    // marginBottom: 10,
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: "red",
  },
  attractionsList: {
    marginTop: 20,
    marginHorizontal: 10,
    marginBottom: 70,
  },
  attractionItem: {
    height: 200,
    // backgroundColor: "blue",
    borderRadius: 15,
    marginBottom: 10,
  },
  attractionImg: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  attractionDetail: {
    marginTop: -70,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    height: 70,
    padding: 10,
    fontWeight: "bold",
    // justifyContent:""
  },
  attractionTitle: {
    fontWeight: "600",
  },
  floatingViewStyle: {
    position: "absolute",
    alignSelf: "center",
    bottom: 10,
    resizeMode: "contain",
  },
  floatingButtonStyle: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    backgroundColor: "#229186",
  },
  dotStyle: {
    marginHorizontal: 5,
    marginTop: 3,
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

export default HomeScreen;
