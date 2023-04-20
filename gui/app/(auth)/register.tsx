import { StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import * as React from "react";
import { useNavigation, Link } from 'expo-router';
import RegistrationScreen from "../../components/auth/registration";


export default function Register() {

    const navigation = useNavigation();
    const isPresented = navigation.canGoBack();


    return (
        <View style={styles.container}>
            <View style={styles.body}>

                {!isPresented && <Link href="../">Dismiss</Link>}
                <RegistrationScreen />
            </View>
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
    body:{
        width:'100%',
        height:'100%',
        // backgroundColor:'rgba(52, 52, 52, 0.8)',
        backgroundColor: 'white',
        justifyContent:'center',
        alignItems:'center'
    },
});