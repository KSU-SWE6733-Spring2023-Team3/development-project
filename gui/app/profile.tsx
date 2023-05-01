import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Button, TextInput } from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import { useRouter } from "expo-router";


type Content = {
    id: string
    type: string
    uri: string
}

const data: Content[] = [
    {
        id: '1',
        type: 'image',
        uri: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
        id: '2',
        type: 'video',
        uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
        id: '3',
        type: 'image',
        uri: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
        id: '4',
        type: 'image',
        uri: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    {
        id: '5',
        type: 'video',
        uri: 'https://www.w3schools.com/html/movie.mp4',
    },
    {
        id: '6',
        type: 'image',
        uri: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
    {
        id: '7',
        type: 'image',
        uri: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    {
        id: '8',
        type: 'video',
        uri: 'https://www.w3schools.com/html/movie.mp4',
    },
    {
        id: '9',
        type: 'image',
        uri: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
    {
        id: '10',
        type: 'image',
        uri: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    {
        id: '11',
        type: 'video',
        uri: 'https://www.w3schools.com/html/movie.mp4',
    },
    {
        id: '12',
        type: 'image',
        uri: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
    {
        id: '13',
        type: 'image',
        uri: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
        id: '14',
        type: 'video',
        uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
        id: '15',
        type: 'image',
        uri: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
        id: '16',
        type: 'image',
        uri: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
        id: '17',
        type: 'video',
        uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
    },
    {
        id: '18',
        type: 'image',
        uri: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
]

const UserProfileScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<Content>({ id: '', type: '', uri: '' })
    const profileInfo = {
        name: 'John Doe',
        age: 25,
        bio: 'This is a sample bio',
        image: 'https://randomuser.me/api/portraits/men/1.jpg',
        intests: ['Bouldering', 'Backpacking', 'Hiking']
    }

    const router = useRouter()

    // @ts-ignore
    const renderItem = ({ item }) => {
        if (item.type === 'image') {
            return (
                <TouchableOpacity onPress={() => handleImagePress(item)}>

                    <View style={styles.imageContainer}>
                        <Image source={{ uri: item.uri }} style={styles.image} />
                    </View>
                </TouchableOpacity>
            );
        } else if (item.type === 'video') {
            return (
                <TouchableOpacity onPress={() => handleImagePress(item)}>
                    <View style={styles.videoContainer}>
                        <Video
                            source={{ uri: item.uri }}
                            style={styles.video}

                            resizeMode={"cover" as ResizeMode}
                            shouldPlay={false}
                            isLooping={false}
                        // useNativeControls
                        />
                    </View>
                </TouchableOpacity>
            );
        }
    };

    const handleEditProfile = () => {
        router.push('editprofile')
    }

    const handleUpload = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            const uri = result.assets[0].uri

            //TODO:   implement the fetch functionality here
        }
    }

    const handleImagePress = (image: Content) => {
        setSelectedImage(image);
        setModalVisible(true);
    };

    return (
        <>

            <View style={styles.container}>
                <View style={styles.profileContainer}>
                    <View style={styles.profilImageContainer}>
                        <Image
                            source={{ uri: profileInfo.image }}
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>{profileInfo.name}</Text>
                        <Text style={styles.age}>{profileInfo.age}</Text>
                        {/* <Text style={styles.bio}>
                            {profileInfo.bio}
                        </Text> */}
                        <View style={{ flexDirection: 'row', gap: 5, marginTop: 5 }}>
                            {profileInfo.intests.map((item, index) =>
                            (<View key={index} style={{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: 'lightgray', borderRadius: 10 }}>
                                <Text>{item}</Text>
                            </View>
                            ))}
                        </View>
                        <TouchableOpacity onPress={handleEditProfile}>

                            <View style={styles.editProfile}>
                                <Text style={styles.editProfileText}>Edit Profile</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    // @ts-ignore
                    renderItem={renderItem}
                    numColumns={3}
                    contentContainerStyle={styles.contentContainer}
                />
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity onPress={handleUpload}>
                        <View style={styles.uploadBtn}>
                            <Entypo name="upload" size={24} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)} onBackButtonPress={() => setModalVisible(false)}>
                {
                    selectedImage.type === 'image' ?
                        <View style={{ flex: 1 }}>
                            <Image source={{ uri: selectedImage.uri }} style={styles.modalImage} resizeMode="contain" />
                            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 20 }}>

                                <Button title='Delete' color='red' />
                                <Button title='Make Profile picture' />
                            </View>
                        </View>
                        :
                        <View style={{ flex: 1 }}>
                            <Video
                                source={{ uri: selectedImage.uri }}
                                style={styles.modalImage}

                                resizeMode={"contain" as ResizeMode}
                                shouldPlay={false}
                                isLooping={false}
                                useNativeControls
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 20 }}>
                                <Button title='Delete' color='red' />
                            </View>
                        </View>
                }
            </Modal>

        </>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 18
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    profileContainer: {
        // flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
    },
    profilImageContainer: {
        width: 100,
        height: 100,
        margin: 5,
        borderRadius: 50,
        overflow: 'hidden',
    },
    imageContainer: {
        width: 100,
        height: 100,
        margin: 5,
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    infoContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    age: {
        fontSize: 18,
        color: 'gray'
    },

    bio: {
        fontSize: 12,
        textAlign: 'center'
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    videoContainer: {
        width: 100,
        height: 100,
        margin: 5,
        borderRadius: 8,
        overflow: 'hidden',
    },
    video: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    modalImage: {
        flex: 1,
        width: undefined,
        height: undefined,
    },
    editProfile: {
        marginTop: 10,
        padding: 10,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: '#BCBCBC'
    },
    editProfileText: {
        color: 'black',
        fontSize: 14,
        fontWeight: '600'
    },
    uploadBtn: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'blue',
        position: 'absolute',
        bottom: 10,
        // right: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }

});

export default UserProfileScreen