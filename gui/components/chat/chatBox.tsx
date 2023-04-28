import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {useAuth} from "../../context/auth";

const ChatBox = ({ item }) => {
    const { user } = useAuth();
  const isYou = (name) => user.name === name;
  return (
    <View style={isYou(item.author) ? styles.isYourchatItem : styles.chatItem}>
      <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
      <View style={styles.chatContent}>
        <View
          style={isYou(item.author) ? styles.isYouchatHeader : styles.chatHeader}
        >
          <Text style={styles.name}>
            {isYou(item.author) ? <Text>You</Text> : item.author}
          </Text>
          <Text style={styles.time}>{item.created_at}</Text>
        </View>
        <Text style={isYou(item.author) ? styles.isYourMessage : styles.message}>
          {item.text}
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
