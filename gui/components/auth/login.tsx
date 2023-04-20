import {StyleSheet} from 'react-native';
import {View, Text} from '../Themed';
import * as React from "react";
import Login from "./forms/loginForm";
import globalStyles from "../../styles/global";

export default function LoginLayout() {
    return (
        <View style={styles.container}>
            <Text style={globalStyles.title}>Login!</Text>
            <Login/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
});