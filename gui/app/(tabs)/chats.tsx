import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import ChatItem from "../../components/chat/ChatItem";
import { BackHandler } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import Chat from "../../components/chat/chat";
import { useRoute } from "@react-navigation/native";
import useFetch from "./../../hooks/useFetch"
import {getRequest} from "../../util/ajax";
const Chats = ({}) => {
  const arr = [
    {
      name: "JOE",
      id: "2",
      avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      lastMessage: "This is simple message.",
      time: "12:00",
    },
    {
      id: "3",
      name: "JOE",
      avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      lastMessage: "This is simple message.",
      time: "12:00",
    },

    {
      id: "4",
      name: "JOE",
      avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      lastMessage: "This is simple message.",
      time: "12:00",
    },

    {
      id: "5",
      name: "JOE",
      avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      lastMessage: "This is simple message.",
      time: "12:00",
    },

    {
      id: "6",
      name: "JOE",
      avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
      lastMessage: "This is simple message.",
      time: "12:00",
    },
    {
      name: "JANE",
      id: "7",
      avatarUrl: "https://randomuser.me/api/portraits/men/4.jpg",
      lastMessage: "This is simple message.",
      time: "12:00",
    },
  ];

    const [chats, setChats] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectChat, setSelectChat] = useState("");

  const route = useRoute();
    useEffect(() => {
      console.log("Loaded chats tab");
      let name = "";
      let userId = "";
      let url = 'api/user/messages';
      let doRequest = true;
      if (route.params) {
        console.log("In route params");
        name = route.params["name"];
        userId = route.params["userID"];

        if (typeof userId !== 'undefined') {
          setSelectChat(userId);
          doRequest = false;
        }
      }

        if(doRequest) {
          getRequest(url).then( (response) => {
            if(response.data.hasOwnProperty('success')) {
              let messages = [];
              Object.keys(response.data.success ).forEach(key => {
                messages.push(response.data.success[key]);
              });
              setChats(messages);
              setSelectChat(undefined);
            } else {
              setError(response.data.error);
            }
          });
        }

        setLoading(false);
    }, [selectChat, route]);

  const renderItem = ({ item }) => (
    <ChatItem item={item} setSelectChat={setSelectChat} />
  );

  if(loading){
    return <Text>Loading...</Text>
  }
  if(error){
    return <Text>Try Again. Some thing went wrong.</Text>
  }
  console.log(selectChat);
  console.log(typeof selectChat);
  return (
    <View style={styles.container}>
      {typeof selectChat === "undefined" || selectChat.length == 0 ? (
        <FlatList
          data={chats}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Chat setChat={setSelectChat} chatId={selectChat} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  chatItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  chatName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  chatLastMessage: {
    color: "#666",
    fontSize: 14,
  },
});

export default Chats;
