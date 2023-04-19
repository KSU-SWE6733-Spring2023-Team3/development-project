import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet,Text } from "react-native";
import Swipe from "./Swipe";
import {getRequest} from "../../util/ajax";

const Cards = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRequest(`api/user/`).then((response) => {
      setUsers(response.data);
      setLoading(false);
    });

  }, [loading]);


  if(loading) {
    return (
        <>
          Loading!
        </>
    )
  }


  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: "100%",
        height: "50%",
        justifyContent: "center",
      }}
    >
      <Swipe cards={users} />
    </SafeAreaView>
  );
};
export default Cards;

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

