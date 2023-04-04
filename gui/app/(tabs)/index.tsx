import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Animated,
  PanResponder,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const SwipeableCard = ({
  item,
  removeCard,
  swipedDirection,
  lastSwipedItemId,
}:any) => {
  const [xPosition, setXPosition] = useState(new Animated.Value(0));
  let swipeDirection = "";
  let cardOpacity = new Animated.Value(1);

  let panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => false,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      xPosition.setValue(gestureState.dx);
      if (gestureState.dx > SCREEN_WIDTH - 250) {
        swipeDirection = "Right";
      } else if (gestureState.dx < -SCREEN_WIDTH + 250) {
        swipeDirection = "Left";
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (
        gestureState.dx < SCREEN_WIDTH - 50 &&
        gestureState.dx > -SCREEN_WIDTH + 50
      ) {
        swipedDirection("--");
        Animated.spring(xPosition, {
          toValue: 0,
          speed: 5,
          bounciness: 10,
          useNativeDriver: false,
        }).start();
      } else if (gestureState.dx > SCREEN_WIDTH - 50) {
        Animated.parallel([
          Animated.timing(xPosition, {
            toValue: SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(cardOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start(() => {
          swipedDirection(swipeDirection);
          removeCard(item.id, swipeDirection);
        });
      } else if (gestureState.dx < -SCREEN_WIDTH + 50) {
        Animated.parallel([
          Animated.timing(xPosition, {
            toValue: -SCREEN_WIDTH,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(cardOpacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start(() => {
          swipedDirection(swipeDirection);
          removeCard(item.id, swipeDirection);
        });
      }
    },
  });
  const swipe = (direction) => {
    if (direction == "Left") {
      Animated.parallel([
        Animated.timing(xPosition, {
          toValue: -SCREEN_WIDTH,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(cardOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start(() => {
        removeCard(item.id, direction);
      });
    }
    if (direction == "Right") {
      Animated.parallel([
        Animated.timing(xPosition, {
          toValue: SCREEN_WIDTH,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(cardOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start(() => {
        removeCard(item.id, direction);
      });
    }
  };
  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.cardStyle,
        {
          backgroundColor: "gray",
          width: "50%",
          transform: [{ translateX: xPosition }],
        },
      ]}
    >
      <ImageBackground
        source={{
          uri: item.imageUrl,
        }}
        style={{ flex: 1, height: "100%", width: "100%" }}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end'}}>
          <Text style={styles.cardTitleStyle}> {item.name} </Text>
          <Text style={styles.cardTitleStyle}> {item.interests} </Text>
          <View style={{ flexDirection: "row", margin: 5 }}>
            <TouchableOpacity
              onPress={() => swipe("Left")}
              style={{ margin: 5 }}
            >
              <Text style={{color:"white", fontWeight:"900"}}>NOPE </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => swipe("Right")}
              style={{ margin: 5 }}
            >
              <Text  style={{fontWeight:"900", color:"white",}}>LIKE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </Animated.View>
  );
};

const Swipe = () => {
  const [noMoreCard, setNoMoreCard] = useState(false);
  const [sampleCardArray, setSampleCardArray] = useState([]);
  const [swipeDirection, setSwipeDirection] = useState("--");
  const [lastSwipedItemId, setLastSwipedItemId] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);

  const [usersLiked, setUsersLiked] = useState<any>([]);
  const [usersDisliked, setUsersDisliked] = useState<any>([]);

  useEffect( ()=>{
    //TODO: call db to get users array.
   getUsersFromDb().then(data=>setSampleCardArray([...sampleCardArray,...data as never[]]));

  },[]);

  const removeCard = (id, direction) => {
    // sampleCardArray.splice(
    //   sampleCardArray.findIndex((item) => item.id == id),
    //   1
    // );
    console.log(direction);
    console.log(id);
    setSampleCardArray(sampleCardArray);
    if (direction === "Left") {
      console.log("left swipe direction", id);
      setUsersDisliked([...usersDisliked, sampleCardArray[id]]);
    } else if (direction === "Right") {
      console.log("right swipe direction", id);
      setUsersLiked([...usersLiked, sampleCardArray[id]]);
    }
    if (sampleCardArray.length == 0) {
      setNoMoreCard(true);
    }
  };

  const lastSwipedDirection = (swipeDirection) => {
    setSwipeDirection(swipeDirection);
  };

  return (
    <SafeAreaView style={{ flex: 1, width: "100%",height:"50%", justifyContent:"center" }}>
      <Text style={styles.swipeText}>
        Last Card Swipe Direction was{"\n"}
        {swipeDirection}
      </Text>
      <View style={styles.container}>
        {sampleCardArray.map((item, key) => (
          <SwipeableCard
            key={key}
            item={item}
            removeCard={removeCard}
            swipedDirection={lastSwipedDirection}
            lastSwipedItemId={lastSwipedItemId}
          />
        ))}
        {noMoreCard ? (
          <Text style={{ fontSize: 22, color: "#000" }}>No Cards Found.</Text>
        ) : null}
      </View>
      <Text style={styles.swipeText}>
        User Liked: {usersLiked.length}
        User Disliked :{usersDisliked.length} 
      </Text>
    </SafeAreaView>
  );
};

export default Swipe;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 20,
  },
  cardStyle: {
    width: "95%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    borderRadius: 7,
  },
  cardTitleStyle: {
    color: "black",
    fontSize: 24,
  },
  swipeText: {
    fontSize: 18,
    textAlign: "center",
  },
});



async function getUsersFromDb(){

/*
  getRequest('api/users').then(response => {
    if(response.data ) {
        return response.data
    } else {
      return [];
    }
});
  */  
  const DEMO_CONTENT = [
    {
      id: 0,
      name: "Erica",
      age: 28,
      interests: ["Music", "Art", "Travel"],
      imageUrl:
        "https://images.unsplash.com/photo-1678875922894-7d3210b0787d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 1,
      name: "Jane",
      age: 25,
      interests: ["Hiking", "Food", "Reading"],
      imageUrl:
        "https://images.unsplash.com/photo-1678875922894-7d3210b0787d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    // add more users here...
  ];
  return DEMO_CONTENT; 

}