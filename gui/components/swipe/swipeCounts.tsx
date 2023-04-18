import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, View, Text, Dimensions } from "react-native";
import SwipeableCard from "../../components/swipe/SwipeableCard";
const SCREEN_WIDTH = Dimensions.get("window").width;

const SwipeCount = ({ userLikedCount, userDislikedCount }) => {
  return (
    <Text style={styles.swipeText}>
      User Liked: {userLikedCount}
      User Disliked :{userDislikedCount}
    </Text>
  );
};

export default SwipeCount;

const styles = StyleSheet.create({
  swipeText: {
    fontSize: 18,
    textAlign: "center",
  },
});
