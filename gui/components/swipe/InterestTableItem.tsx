import React from "react";
// import { View } from "react-native/Libraries/Components/View/View";
import { StyleSheet, Text, View } from "react-native";

const InterestTableItem = ({ item }) => (
  <View style={styles.item}>
    <Text>{item.activity}</Text>
    <Text>{item.attitude}</Text>
    <Text>{item.skillLevel}</Text>
  </View>
);
export default InterestTableItem;
const styles = StyleSheet.create({
  item: {
    backgroundColor: "#e6e6e6",
    borderRadius: 5,
    padding: "5px 10px",
    marginRight: "10px",
    marginBottom: "10px",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});
