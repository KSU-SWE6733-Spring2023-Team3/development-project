import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text, Dimensions } from "react-native";
import SwipeableCard from "./SwipeableCard";
import SwipeCount from "./swipeCounts";
const SCREEN_WIDTH = Dimensions.get("window").width;

const Swipe = ({ cards }) => {


  const [noMoreCard, setNoMoreCard] = useState(false);
  const [sampleCardArray, setSampleCardArray] = useState(cards);
  const [swipeDirection, setSwipeDirection] = useState("--");
  const [lastSwipedItemId, setLastSwipedItemId] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);

  const [usersLiked, setUsersLiked] = useState<any>([]);
  const [usersDisliked, setUsersDisliked] = useState<any>([]);

  const removeCard = (id, direction) => {
    // sampleCardArray.splice(
    //   sampleCardArray.findIndex((item) => item.id == id),
    //   1
    // );

    setSampleCardArray(sampleCardArray);
    if (direction === "Left") {
      setUsersDisliked([...usersDisliked, sampleCardArray[id]]);
    } else if (direction === "Right") {
      setUsersLiked([...usersLiked, sampleCardArray[id]]);
    }
    if (sampleCardArray.length == 0) {
      setNoMoreCard(true);
    }
  };

  const lastSwipedDirection = (swipeDirection) => {
    setSwipeDirection(swipeDirection);
  };

  console.log("sample cards");
  console.log(sampleCardArray);

  return (
    <>
      <View style={styles.container}>
        {sampleCardArray &&
          sampleCardArray.map((item, key) => (
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
      <SwipeCount
        userDislikedCount={usersDisliked.length}
        userLikedCount={usersLiked.length}
      />
    </>
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
