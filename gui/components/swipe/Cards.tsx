import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet,Text } from "react-native";
import Swipe from "./Swipe";

const Cards = () => {
  const { data, loading, error } = useFetch(`/api/users/`);
  // TODO : Uncomment this before connectinog with backend.
    if(loading){
      return <Text>Loading...</Text>
    }
    if(error){
      return <Text>Try Again. Some thing went wrong.</Text>
    }
  // const DEMO_CONTENT = [
  //   {
  //     id: 0,
  //     name: "Erica",
  //     age: 28,
  //     interests: ["Music", "Art", "Travel"],
  //     email: "test@gmail.com",
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1678875922894-7d3210b0787d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  //   },
  //   {
  //     id: 1,
  //     name: "Jane",
  //     age: 25,
  //     interests: ["Hiking", "Food", "Reading"],
  //     email: "won@gmail.com",
  //     imageUrl:
  //       "https://images.unsplash.com/photo-1678875922894-7d3210b0787d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  //   },
  //   // add more users here...
  // ];
  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: "100%",
        height: "50%",
        justifyContent: "center",
      }}
    >
      <Swipe cards={data} />
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

async function getUsersFromDb() {
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
      email: "test@gmail.com",
      imageUrl:
        "https://images.unsplash.com/photo-1678875922894-7d3210b0787d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 1,
      name: "Jane",
      age: 25,
      interests: ["Hiking", "Food", "Reading"],
      email: "won@gmail.com",
      imageUrl:
        "https://images.unsplash.com/photo-1678875922894-7d3210b0787d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    // add more users here...
  ];
  return DEMO_CONTENT;
}
function useFetch(arg0: string): { data: any; loading: any; error: any; } {
  throw new Error("Function not implemented.");
}

