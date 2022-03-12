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
});

export default FloatingButton;
