import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import ChatItem from "../../components/chat/ChatItem";
import { BackHandler } from "react-native";
import { useNavigation, useRouter } from "expo-router";
import Chat from "../../components/chat/chat";
import { useRoute } from "@react-navigation/native";
import useFetch from "./../../hooks/useFetch"
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
  //   TODO: comment when not  connected with db
  const { data, loading, error } = useFetch(`/api/users/chats`);
  const [chats, setChats] = useState(data);
  
  //   TODO: comment when connected with db
  // const [chats, setChats] = useState(arr);

  const route = useRoute();
  let name = "";
  let userId = "";
  // if (route.params) {
  //   name = route.params;
  //   userId = route.params;
  // }

  const [selectChat, setSelectChat] = useState("");
  // if (name && userId) {
  //   console.log("run");
  //   setSelectChat(userId);
  // }


  function handleBackButtonClick() {
    console.log("back button pressed");
    setSelectChat("");
    return true;
  }

  const renderItem = ({ item }) => (
    <ChatItem item={item} setSelectChat={setSelectChat} />
  );

  // TODO : Uncomment this before connectinog with database.
  if(loading){
    return <Text>Loading...</Text>
  }
  if(error){
    return <Text>Try Again. Some thing went wrong.</Text>
  }
  return (
    <View style={styles.container}>
      {!selectChat ? (
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
