import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const Item = ({ item }) => (
  <View style={styles.item}>
    <Text>{item.activity}</Text>
    <Text>{item.attitude}</Text>
    <Text>{item.skillLevel}</Text>
  </View>
);

const InterestTable = ({ DATA }) => {
  const renderItem = ({ item }) => <Item item={item} />;

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.InterestTable}
      contentContainerStyle={{
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
      }}
    />
  );
};

const styles = StyleSheet.create({
  InterestTable: { flexDirection: "row", marginTop: "3px", marginLeft: "3px" },
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
  itemText: {
    fontSize: "14px",
    color: "#333",
    marginLeft: "5px",
  },
});

export default InterestTable;
