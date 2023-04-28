import React from "react";
// import { View } from "react-native/Libraries/Components/View/View";
import { StyleSheet, Text, View } from "react-native";

const InterestTableItem = ({ item }) => (
  <View style={styles.item}>
    <Text style={styles.tagItem}>{item.activity}</Text>
    <Text style={styles.tagItem}>{item.attitude}</Text>
    <Text style={styles.tagItem}>{item.skillLevel}</Text>
  </View>
);
export default InterestTableItem;
const styles = StyleSheet.create({
  item: {
    backgroundColor: "#e6e6e6",
    borderRadius: 5,
    // padding: "5pt 10pt",
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    marginRight: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  tagItem: {
    fontSize: 10,
  },
});
