import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Icon } from "react-native-elements";

const FloatingButton = ({ toggleModal }) => {
  return (
    <View activeOpacity={0.5} style={styles.floatingViewStyle}>
      <Button
        onPress={toggleModal}
        buttonStyle={styles.floatingButtonStyle}
        titleStyle={{ fontWeight: "500", fontSize: 24 }}
        icon={<Icon name="map" type="Feather" size={25} color="#FFF" style={{ marginRight: 5 }} />}
        title="Create New Tour"
      />
    </View>
  );
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

export default FloatingButton;
