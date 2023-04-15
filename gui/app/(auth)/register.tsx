import { ImageBackground, StyleSheet, Text } from 'react-native';
import { View } from '../../components/Themed';
import * as React from "react";
import { useNavigation, Link } from 'expo-router';
import RegistrationScreen from "../../components/auth/registration";


export default function Register() {

    const navigation = useNavigation();
    const isPresented = navigation.canGoBack();


    return (
        // <View style={styles.container}>
        <ImageBackground source={{ uri: 'https://images.unsplash.com/reserve/Af0sF2OS5S5gatqrKzVP_Silhoutte.jpg?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' }}
            style={styles.container}
        >
            <View style={styles.body}>

                {!isPresented && <Link href="../">Dismiss</Link>}
                <RegistrationScreen />
            </View>
        </ImageBackground>
        // </View> 
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    body:{
        width:'100%',
        height:'100%',
        backgroundColor:'rgba(52, 52, 52, 0.8)',
        justifyContent:'center',
        alignItems:'center'
    },
});