import {StyleSheet, Text} from 'react-native';
import {View} from '../../components/Themed';
import * as React from "react";
import {useNavigation, Link} from 'expo-router';
import RegistrationScreen from "../../components/auth/registration";


export default function Register() {

    const navigation = useNavigation();
    const isPresented = navigation.canGoBack();


    return (
        <View style={styles.container}>
            {!isPresented && <Link href="../">Dismiss</Link>}
            <RegistrationScreen/>
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