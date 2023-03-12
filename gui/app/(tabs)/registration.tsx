import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface RegistrationFormData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    profilePicture: string | null;
}

const RegistrationScreen: React.FC = () => {
    const [formData, setFormData] = useState<RegistrationFormData>({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        profilePicture: null,
    });

    const handleChoosePhoto = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled) {
            setFormData({ ...formData, profilePicture: result.assets[0].uri });
        }
    };

    const handleFirstNameChange = (text: string) => {
        setFormData({ ...formData, firstName: text });
    };

    const handleLastNameChange = (text: string) => {
        setFormData({ ...formData, lastName: text });
    };

    const handleUserNameChange = (text: string) => {
        setFormData({ ...formData, username: text });
    };

    const handleEmailChange = (text: string) => {
        setFormData({ ...formData, email: text });
    };

    const handlePasswordChange = (text: string) => {
        setFormData({ ...formData, password: text });
    };

    const handleProfilePictureChange = (uri: string | null) => {
        setFormData({ ...formData, profilePicture: uri });
    };

    const handleSubmit = () => {
        console.log(formData);
    };

    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Registrations</Text> */}
            <TouchableOpacity style={styles.profilePictureContainer} onPress={handleChoosePhoto }>
                {formData.profilePicture ? (
                    <Image style={styles.profilePicture} source={{ uri: formData.profilePicture }} />
                ) : (
                    <View style={styles.profilePicturePlaceholder}>
                        <Text style={styles.profilePicturePlaceholderText}>Upload Profile Picture</Text>
                    </View>
                )}
                <Text style={styles.profilePictureButtonText}>Choose Photo</Text>
            </TouchableOpacity>
            <TextInput
                style={styles.input} 
                placeholderTextColor="#000000"
                placeholder="First Name"
                onChangeText={handleFirstNameChange}
                value={formData.firstName}
            />
            <TextInput
                style={styles.input} 
                placeholderTextColor="#000000"
                placeholder="Last Name"
                onChangeText={handleLastNameChange}
                value={formData.lastName}
            />
            <TextInput
                style={styles.input} 
                placeholderTextColor="#000000"
                placeholder="Username"
                onChangeText={handleUserNameChange}
                value={formData.username}
            />
            <TextInput
                style={styles.input} 
                placeholderTextColor="#000000"
                placeholder="Email"
                onChangeText={handleEmailChange}
                value={formData.email}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input} 
                placeholderTextColor="#000000"
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={handlePasswordChange}
                // value={formData.password}
            />
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 32,
    },
    input: {
        width: '80%',
        height: 48,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        paddingVertical: 16,
        paddingHorizontal: 32,
        marginTop: 16,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    profilePictureContainer: {
        width: 200,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: '#000',
        borderRadius: 100,
        overflow: 'hidden',
        marginBottom: 20,
    },
    profilePicture: {
        width: 200,
        height: 200,
        borderRadius:100,
        marginTop:15
    },
    profilePicturePlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#F2F2F2',
        //   borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profilePicturePlaceholderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    profilePictureButton: {
        backgroundColor: '#007AFF',
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginTop: 8,
    },
    profilePictureButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RegistrationScreen