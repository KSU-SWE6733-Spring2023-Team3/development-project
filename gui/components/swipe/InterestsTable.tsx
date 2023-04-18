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
        flexWrap: "wrap",
        alignItems: "flex-start",
      }}
    />
  );
};

const styles = StyleSheet.create({
  InterestTable: { flexDirection: "row", marginTop: "3px", marginLeft: "3px" },
  itemText: {
    fontSize: "14px",
    color: "#333",
    marginLeft: "5px",
  },
});

export default InterestTable;
