import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import globalStyles from "../../../styles/global";
import * as React from "react";
import {useAuth} from "../../../context/auth";
import * as ImagePicker from "expo-image-picker";
import {postRequest} from "../../../util/ajax";
import {z} from "zod";
import {useState} from "react";



const registrationSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(16, { message: "Password must be at least 16 characters" }),
    profilePicture: z.any()
});

type RegistrationFormData = z.infer<typeof registrationSchema>

export default function RegistrationForm() {

    const [formData, setFormData] = useState<RegistrationFormData>({
        name: '',
        email: '',
        password: '',
        profilePicture: '',
    });

    const {signIn} = useAuth();



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
        postRequest('api/user', uploadData).then(response => {
            if(response.statusText == "OK" ) {
                signIn(true);
            } else {
                signIn(false);
            }
        })

    };

    return (
        <>
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
            <TouchableOpacity style={globalStyles.button} onPress={handleSubmit}>

                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
},

});