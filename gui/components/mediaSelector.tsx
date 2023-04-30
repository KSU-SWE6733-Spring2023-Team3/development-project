import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as React from "react";
import * as ImagePicker from "expo-image-picker";


export default function MediaSelector(props: any) {


    const selectMultiple = props.selectType === "single";

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


return (
    <TouchableOpacity style={ /*set the form data here*/ ?
        {
            width: 150,
            height: 150,
            backgroundColor: 'gray',
            borderRadius: 75,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 0
        } :
        {
            width: 150,
            height: 150,
            borderRadius: 75,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 0
        }

    } onPress={handleChooseMedia}>
        {formData.profilePicture ? (
            <Image style={{zIndex: 1, width: '100%', height: '100%', resizeMode: 'contain', marginBottom: -25}}
                   source={{uri: }}/>
        ) : (
            <View style={styles.profilePicturePlaceholder}>
                <Text style={{...styles.text}}>Upload Profile Picture</Text>
            </View>
        )}
        <Text style={{marginTop: 10}}>Choose Photo</Text>
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    text: {
        color: '#fff'
    }

});