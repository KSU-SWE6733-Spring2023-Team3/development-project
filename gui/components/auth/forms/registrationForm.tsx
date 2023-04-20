import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import globalStyles from "../../../styles/global";
import * as React from "react";
import { useAuth } from "../../../context/auth";
import * as ImagePicker from "expo-image-picker";
import { postRequest } from "../../../util/ajax";
import { z } from "zod";
import { useState } from "react";
import {Redirect, useRouter } from "expo-router";



const registrationSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(16, { message: "Password must be at least 16 characters" }),
    profilePicture: z.any()
});

type RegistrationFormData = z.infer<typeof registrationSchema>

export default function RegistrationForm() {
    const router = useRouter();

    const [formData, setFormData] = useState<RegistrationFormData>({
        name: '',
        email: '',
        password: '',
        profilePicture: '',
    });

    const { signIn } = useAuth();

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
            setFormData({ ...formData, profilePicture: result.assets[0].uri });
        }
    };

    const handleNameChange = (text: string) => {

        setFormData({ ...formData, name: text });
    };

    const handleEmailChange = (text: string) => {
        setFormData({ ...formData, email: text });
    };

    const handlePasswordChange = (text: string) => {
        setFormData({ ...formData, password: text });
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
        postRequest('api/user', uploadData).then(response => {
            if(response.data) {
                signIn({name: formData.name});
            }
        });

    };

    return (
        <>
            <Text style={globalStyles.title}>Registration</Text>
            <TouchableOpacity style={formData.profilePicture ? 
            { width: 150, height: 150, backgroundColor: 'gray', borderRadius: 75, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', zIndex: 0 }:
            { width: 150, height: 150, borderRadius: 75, overflow: 'hidden', justifyContent: 'center', alignItems: 'center', zIndex: 0 }
        
        } onPress={handleChoosePhoto}>
                {formData.profilePicture ? (
                    <Image style={{ zIndex: 1, width: '100%', height: '100%', resizeMode: 'contain', marginBottom: -25 }} source={{ uri: formData.profilePicture }} />
                ) : (
                    <View style={styles.profilePicturePlaceholder}>
                        <Text style={{ ...styles.text }}>Upload Profile Picture</Text>
                    </View>
                )}
                <Text style={{ marginTop: 10 }}>Choose Photo</Text>
            </TouchableOpacity>
            <TextInput
                style={globalStyles.input}
                placeholderTextColor="#000"
                placeholder="Name"
                onChangeText={handleNameChange}
                value={formData.name}
            />
            {errors['name'] && <Text style={globalStyles.errorText}>{errors['name']}</Text>}
            <TextInput
                style={globalStyles.input}
                placeholderTextColor="#000"
                placeholder="Email"
                onChangeText={handleEmailChange}
                value={formData.email}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            {errors['email'] && <Text style={globalStyles.errorText}>{errors['email']}</Text>}
            <TextInput
                style={globalStyles.input}
                placeholderTextColor="#000"
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={handlePasswordChange}
            // value={formData.password}
            />
            {errors['password'] && <Text style={globalStyles.errorText}>{errors['password']}</Text>}
            <View style={{ marginTop: 10 }}>
                <Button title="Register" onPress={handleSubmit} />
            </View>
            {/* <TouchableOpacity style={globalStyles.btn} onPress={handleSubmit}>

                <Text style={globalStyles.text}>Register</Text>
            </TouchableOpacity> */}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff'
    }

});