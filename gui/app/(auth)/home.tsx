import {StyleSheet, Text} from 'react-native';
import globalStyles from "../../styles/global";
import {View} from '../../components/Themed';
import * as React from "react";
import {Link} from 'expo-router';

export default function LoginLayout() {
    return (
        <View style={styles.container}>
            <Text> Welcome to KSU SWE 6733 Spring 2023 Group 3 Development Project! </Text>
            <Link href="/(auth)/login">Login!</Link>
            <Link href="/(auth)/register">Sign Up!</Link>
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