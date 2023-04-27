import {StyleSheet, Text} from 'react-native';
import globalStyles from "../../styles/global";
import {View} from '../../components/Themed';
import * as React from "react";
import LoginLayout from "../../components/auth/login";
import {useNavigation, Link} from 'expo-router';


export default function Login() {

    const navigation = useNavigation();
    const isPresented = navigation.canGoBack();


    return (
        <View style={styles.container}>
            {!isPresented && <Link href="../">Dismiss</Link>}

            <LoginLayout/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
});