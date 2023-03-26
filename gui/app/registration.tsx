import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { z } from 'zod';
import globalStyles from '../styles/global';


const registrationSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(16, { message: "Password must be at least 16 characters" }),
    profilePicture: z.any()
});

type RegistrationFormData = z.infer<typeof registrationSchema>

const RegistrationScreen: React.FC = () => {
    const [formData, setFormData] = useState<RegistrationFormData>({
        name: '',
        email: '',
        password: '',
        profilePicture: '',
    });




    const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
            setFormData({...formData, profilePicture: result.assets[0].uri});
        }
    };

    const handleNameChange = (text: string) => {

        setFormData({...formData, name: text});
    };

    const handleEmailChange = (text: string) => {
        setFormData({...formData, email: text});
    };

    const handlePasswordChange = (text: string) => {
        setFormData({...formData, password: text});
    };

    const handleSubmit = async () => {
        const validationResult = registrationSchema.safeParse(formData);

        if (!validationResult.success) {
            // @ts-ignore
            setErrors(validationResult.error.flatten().fieldErrors);
            return;
        }

        setErrors({});
        //
        let uploadData = new FormData();
        uploadData.append('name', formData.name);
        uploadData.append('email', formData.email);
        uploadData.append('password', formData.password);
        uploadData.append('profilePicture', formData.profilePicture);


        // Perform registration logic with formData
        await fetch('http://localhost:8000/api/user', {
            method: 'POST',
            body: uploadData
        });
        
    };

    return (
        <View style={styles.container}>
            <Text style={globalStyles.title}>Registration</Text>
            <TouchableOpacity style={styles.profilePictureContainer} onPress={handleChoosePhoto}>
                {formData.profilePicture ? (
                    <Image style={styles.profilePicture} source={{ uri: formData.profilePicture.uri }} />
                ) : (
                    <View style={styles.profilePicturePlaceholder}>
                        <Text style={styles.profilePicturePlaceholderText}>Upload Profile Picture</Text>
                    </View>
                )}
                <Text style={styles.profilePictureButtonText}>Choose Photo</Text>
            </TouchableOpacity>
            <TextInput
                style={globalStyles.input}
                placeholderTextColor="#000000"
                placeholder="Name"
                onChangeText={handleNameChange}
                value={formData.name}
            />
             {errors['name'] && <Text style={styles.errorText}>{errors['name']}</Text>}
            <TextInput
                style={globalStyles.input}
                placeholderTextColor="#000000"
                placeholder="Email"
                onChangeText={handleEmailChange}
                value={formData.email}
                keyboardType="email-address"
                autoCapitalize="none"
                />
                {errors['email'] && <Text style={styles.errorText}>{errors['email']}</Text>}
            <TextInput
                style={globalStyles.input}
                placeholderTextColor="#000000"
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={handlePasswordChange}
                // value={formData.password}
                />
                {errors['password'] && <Text style={styles.errorText}>{errors['password']}</Text>}
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
    errorText:{
        color:'red',
        fontSize:15
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
        borderRadius: 100,
        marginTop: 15
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