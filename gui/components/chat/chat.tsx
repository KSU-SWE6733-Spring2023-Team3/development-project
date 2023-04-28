import { Link, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback, Button,
} from "react-native";
import ChatItem from "./ChatItem";
import ChatScreen from "./chatScreen";

const Chat = ({ setChat, chatId }) => {

  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity onPress={() => setChat("")}>
        <Button title={"Go Back"} onPress={() => {
          navigation.navigate("chats", {
          });
          setChat("");

        }}/>
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.chatScreen}>
          <ChatScreen chatId={chatId} />
        </View>
      </View>
    </>
  );
};
export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    width: "100%",
    textAlign: "center",
    // borderWidth: 1,
  },
  chatSideBar: {
    fontWeight: "bold",
    textAlign: "center",
    width: "30%",
    height: "100%",
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColorLeftColor: "#666",
    borderColorRightColor: "#666",
    overflowY: "scroll",
  },
  chatScreen: {
    flex: 1,
    height: "100%",
  },
  cardTitleStyle: {
    color: "black",
    fontSize: 24,
  },
  textTitle: {
    fontSize: 15,
  },
  chatItem: {
    textAlign: "left",
    margin: 5,
    borderBottomWidth: 2,
  },
});
