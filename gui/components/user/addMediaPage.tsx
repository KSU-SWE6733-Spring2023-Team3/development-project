import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as React from "react";
import MediaSelector from "../mediaSelector";

export default function AddMediaPage() {
    return (
        <React.Fragment>
            <Text> Upload Pictures!</Text>
            <MediaSelector selectType={"multi"} />
        </React.Fragment>
        );
}
