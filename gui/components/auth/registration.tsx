import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import RegistrationForm from "./forms/registrationForm";



const RegistrationScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <RegistrationForm/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
});

export default RegistrationScreen;