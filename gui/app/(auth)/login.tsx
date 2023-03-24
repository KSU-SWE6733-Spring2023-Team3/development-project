import {StyleSheet, Text} from 'react-native';
import globalStyles from "../../styles/global";
import {View} from '../../components/Themed';
import * as React from "react";
import Login from "../../components/auth/loginForm";

export default function LoginLayout() {
    return (
        <View style={styles.container}>
            <Text> Welcome to KSU SWE 6733 Spring 2023 Group 3 Development Project! </Text>

            <View>
                <Login/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});