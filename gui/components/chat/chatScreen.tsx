import React, { useEffect,useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  
  Keyboard,
  
} from "react-native";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../../context/auth";
import ChatBox from "./chatBox";

const ChatScreen = ({ chatId }) => {
  const [message, setMessage] = React.useState("");
    const { user }:any = useAuth();
  // const user = { name: "John" };
  const isYou = (name) => user.name === name;
  // TODO: uncomment when connected with database to retrieve previous messages
  const { data, loading, error } = useFetch(`/api/users/chats?chatID=3`);
  const [messages, setMessages] = useState<any>(data);
  
  //TODO: commenct when not connected with db 
  // const [messages, setMessages] = React.useState([
  //   {
  //     id: "1",
  //     avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
  //     name: "Jane",
  //     message: "Hello",
  //     time: "10:00 AM",
  //   },

  //   {
  //     id: "3",
  //     avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
  //     name: "Jane",
  //     message: "How are you?",
  //     time: "10:05 AM",
  //   },
  // ]);
  useEffect(() => {
    //TODO: fetch messages using chatId and set them to messages

    const showSubscription = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardDidShow
    );
    const hideSubscription = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardDidHide
    );
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const [keyboardOffset, setKeyboardOffset] = React.useState(0);
  const handleKeyboardDidShow = (event) => {
    setKeyboardOffset(event.endCoordinates.height);
  };

  const handleKeyboardDidHide = () => {
    setKeyboardOffset(0);
  };
  const handleSend = () => {
    if (message) {
      // TODO: Uncomment when not connected with database
      // const newMessage = {
      //   id: String(Math.random()),
      //   avatarUrl: "https://randomuser.me/api/portraits/men/4.jpg",
      //   name: "John",
      //   message,
      //   time: "10:10 AM",

      // };
   
      // TODO uncomment when connected with database
      const newMessage = {
        // id: String(Math.random()),
        avatarUrl:user?.icon || "https://randomuser.me/api/portraits/men/4.jpg",
        name: user?.name,
        message,
        time: new Date(),
      };
      setMessages([newMessage, ...messages]);
      setMessage("");
    }

  };
  const handleKeyDown=(e)=>{
    if(e.nativeEvent.key==="Enter"){
      console.log("key down ")
      handleSend();
    } 
  }
  const renderItem = ({ item }) => <ChatBox item={item} />;
  // TODO : Uncomment this before connectinog with database.
  if(loading){
    return <Text>Loading...</Text>
  }
  if(error){
    return <Text>Try Again. Some thing went wrong.</Text>
  }
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={keyboardOffset + 100}
    >
      <View style={styles.container}>
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          inverted
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message"
            value={message}
            onChangeText={setMessage}
            onKeyPress={handleKeyDown}
            
            
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "#fff",
  },
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  textInput: {
    flex: 1,
    height: 40,
    flexBasis: 0,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
  },
  sendButton: { padding: 10, marginBottom: 10 },
  sendButtonText: {},
});
export default ChatScreen;
