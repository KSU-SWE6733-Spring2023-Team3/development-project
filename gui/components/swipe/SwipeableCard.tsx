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
import useFetch from "../../hooks/useFetch";
import InterestTable from "./InterestsTable";
import {getRequest} from "../../util/ajax";
const SCREEN_WIDTH = Dimensions.get("window").width;

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

const SwipeableCard = ({
  item,
  removeCard,
  swipedDirection,
  lastSwipedItemId,
}: any) => {


  const [loading, setLoading] = useState(true);
  const [xPosition, setXPosition] = useState(new Animated.Value(0));
  const [user, setUser] = useState(item);


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

  useEffect(() => {
    getRequest('api/user/interest/' + item.email).then((response) => {
      if(response.hasOwnProperty('data')) {
        const responseData = response.data;
        if(responseData.hasOwnProperty("success")) {
          const userInterests = responseData.success;
          const newUser = user;
          newUser.interests = userInterests;
          newUser.interestsBrief = '';
          for (let i = 0; i < userInterests.length; i++) {
            newUser.interestsBrief += userInterests[i].activity;
            if(i < (userInterests.length - 1)) {
              newUser.interestsBrief += ',';
            }
          }
          setUser(newUser);
          setLoading(false);
        }
      }
    })
  }, []);


  // TODO: add comment when not connected  with backend.
  if (loading) {
    return <Text>Loading...</Text>;
  }

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
          uri: user.imageUrl,
        }}
        style={{ flex: 1, height: "100%", width: "100%" }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
        >
          <Text style={styles.cardTitleStyle}> {user.name} </Text>
          <Text style={styles.cardTitleStyle}> {user.interestsBrief} </Text>

          <View style={{ flexDirection: "row", margin: 5 }}>
            <TouchableOpacity
              onPress={() => swipe("Left")}
              style={{ margin: 5 }}
            >
              <Text style={{ color: "white", fontWeight: "900" }}>NOPE </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => swipe("Right")}
              style={{ margin: 5 }}
            >
              <Text style={{ fontWeight: "900", color: "white" }}>LIKE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <View
        style={{
          flexDirection: "row",
          margin: 5,
          alignSelf: "flex-start",
        }}
      >
        <Text style={{ fontSize: 20 }}>Interests :</Text>
        <InterestTable DATA={user.interests} />
      </View>
    </Animated.View>
  );
};

export default SwipeableCard;
