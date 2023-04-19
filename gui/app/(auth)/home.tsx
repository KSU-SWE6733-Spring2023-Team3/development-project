import { Image, StyleSheet, Text, ImageBackground } from 'react-native';
import globalStyles from "../../styles/global";
import { View } from '../../components/Themed';
import * as React from "react";
import { Link } from 'expo-router';

export default function LoginLayout() {
    return (
        <ImageBackground source={{ uri: 'https://images.unsplash.com/reserve/Af0sF2OS5S5gatqrKzVP_Silhoutte.jpg?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' }} 
        style={styles.container}
        >
            <View style={styles.body}>

                {/* <Text style={globalStyles.text}> Welcome to KSU SWE 6733 Spring 2023 Group 3 Development Project! </Text> */}
                <Text style={globalStyles.text}> Join a community of adventurous singles and start your journey to love! </Text>
                <Link style={{...globalStyles.text, ...globalStyles.btn}} href="/(auth)/login">Login!</Link>
                <Link style={{...globalStyles.text, ...globalStyles.btn}} href="/(auth)/register">Sign Up!</Link>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode:'cover'
    },
    body:{
        width:'100%',
        height:'100%',
        backgroundColor:'rgba(52, 52, 52, 0.8)',
        justifyContent:'center',
        alignItems:'center'
    },
});