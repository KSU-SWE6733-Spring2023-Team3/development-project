import {useNavigation} from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {useNavigationLink} from "react-native-paper/lib/typescript/src/react-navigation/adapter";

const ChatItem = ({ item }) => {

  const navigation = useNavigation();
  console.log(item);
  return (
    <TouchableOpacity onPress={() =>  navigation.navigate("chats", {
      'userID': item.id
    })}>
      <View style={styles.container}>
        <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
        <View style={styles.chatContent}>
          <View style={styles.chatHeader}>
            <Text style={styles.name}>{item.user}</Text>
            <Text style={styles.time}>{item['created_at']}</Text>
          </View>
          <Text style={styles.message}>{item.text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  chatContent: {
    marginLeft: 10,
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  time: {
    color: "#666",
    fontSize: 12,
  },
  message: {
    color: "#666",
    fontSize: 14,
  },
});

export default ChatItem;
