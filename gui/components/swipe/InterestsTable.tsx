import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import InterestTableItem from "./InterestTableItem";

const InterestTable = ({ DATA }) => {
  const renderItem = ({ item }) => <InterestTableItem item={item} />;

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      style={styles.InterestTable}
      contentContainerStyle={{
        flexDirection: "row",
        alignItems: "flex-start",
      }}
    />
  );
};

const styles = StyleSheet.create({
  InterestTable: { flexDirection: "row", marginTop: 3, marginLeft: 3 },
  itemText: {
    fontSize: 10,
    color: "#333",
    marginLeft: 5,
  },
});

export default InterestTable;
