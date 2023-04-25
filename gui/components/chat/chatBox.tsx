import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ChatBox = ({ item }) => {
  //   const { user } = useAuth();
  const user = { name: "John" };
  const isYou = (name) => user.name === name;
  return (
    <View style={isYou(item.name) ? styles.isYourchatItem : styles.chatItem}>
      <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
      <View style={styles.chatContent}>
        <View
          style={isYou(item.name) ? styles.isYouchatHeader : styles.chatHeader}
        >
          <Text style={styles.name}>
            {isYou(item.name) ? <Text>You</Text> : item.name}
          </Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={isYou(item.name) ? styles.isYourMessage : styles.message}>
          {item.message}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  isYourchatItem: {
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,

    textAlign: "right",
  },
  chatContent: {
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  isYouchatHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "right",
  },
  time: {
    color: "#666",
    fontSize: 12,
  },
  message: {
    color: "#666",
    fontSize: 14,
    textAlign: "left",
  },
  isYourMessage: {
    color: "#666",
    fontSize: 14,
    textAlign: "right",
  },
});
export default ChatBox;
