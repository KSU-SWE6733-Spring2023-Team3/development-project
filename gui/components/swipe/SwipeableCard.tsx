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
  const { data, loading, error } = useFetch(`/api/user/interest/${item.email}`);
  const temdata = [
    {
      activity: "Activity",
      attitude: "Attitude",
      skillLevel: "SkillLevel",
    },
    {
      activity: "Activity",
      attitude: "Attitude",
      skillLevel: "SkillLeve",
    },
    {
      activity: "Activity",
      attitude: "Attitude",
      skillLevel: "SkillLevel",
    },
  ];
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
  // TODO: remove comment when intergrating with backend.
  // if (loading) {
  //   return <Text>Loading...</Text>;
  // }

  if (error) {
    return <Text>Error: some thing went wrong</Text>;
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
          uri: item.imageUrl,
        }}
        style={{ flex: 1, height: "100%", width: "100%" }}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "flex-end" }}
        >
          <Text style={styles.cardTitleStyle}> {item.name} </Text>
          <Text style={styles.cardTitleStyle}> {item.interests} </Text>

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
      {/* TODO: Uncomment this if you want display the user interest in the card. */}
      {/* <View
        style={{
          flexDirection: "row",
          margin: 5,
          alignSelf: "flex-start",
        }}
      >
        <Text style={{ fontSize: 20 }}>Interests :</Text>
        <InterestTable DATA={temdata} />
      </View> */}
    </Animated.View>
  );
};

export default SwipeableCard;
