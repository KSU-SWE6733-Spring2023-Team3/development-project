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
import { useAuth } from "../../context/auth";
import ChatBox from "./chatBox";
import {getRequest, postRequest} from "../../util/ajax";

const ChatScreen = ({ chatId }) => {
  const [message, setMessage] = React.useState("");
    const { user }:any = useAuth();
  // const user = { name: "John" };
  const isYou = (name) => user.name === name;

  const [messages, setMessages] = useState<any>([]);
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState<any>(true);


  useEffect(() => {
    getRequest('api/user/messages/' + chatId).then((response) => {
      if (response.data.hasOwnProperty('success')) {
        console.log(response.data.success);
        setMessages(response.data.success);
      } else {
        setError(response.data.error);
      }
      setLoading(false);

    });

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
  }, [chatId]);

  const [keyboardOffset, setKeyboardOffset] = React.useState(0);
  const handleKeyboardDidShow = (event) => {
    setKeyboardOffset(event.endCoordinates.height);
  };

  const handleKeyboardDidHide = () => {
    setKeyboardOffset(0);
  };
  const handleSend = () => {
    if (message) {

      let postData = new FormData();
      postData.append('toUser', chatId);
      postData.append('message', message);

      postRequest('api/user/message', postData).then((response) => {
        if(response.data.hasOwnProperty('success')) {
          const newMessage = {
            id: String(Math.random()),
            avatarUrl:user?.icon || "https://randomuser.me/api/portraits/men/4.jpg",
            name: user?.name,
            message,
            time: new Date().toISOString(),
          };
          setMessages([newMessage, ...messages]);
          setMessage("");
        } else {
          setError(response.data.error);
        }
      });
    }
  };

  const handleKeyDown=(e)=>{
    if(e.nativeEvent.key==="Enter"){
      handleSend();
    } 
  };


  const renderItem = ({ item }) => <ChatBox item={item} />;
  if(loading){
    return <Text>Loading...</Text>
  }
  if(error.length > 0){
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
    borderColor: '#000000',
    borderWidth: 1,
    borderStyle: "solid"

  },
  sendButton: { padding: 10, marginBottom: 10 },
  sendButtonText: {},
});
export default ChatScreen;
