import React, { useEffect, useState } from "react";
// @ts-ignore
import { TextInput, StyleSheet, Picker, Button, Image, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import * as ImagePicker from 'expo-image-picker';
import { Text, View } from "../components/Themed";
import globalStyles from "../styles/global";
import { getRequest, postRequest } from "../util/ajax";
import { useRouter } from 'expo-router';
// import { useAuth } from "../context/auth";

type Option = {
    label: string
    value: string
}

const sexInit = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
];

const desireInit = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
];


export default function PostRegistration() {
    const [sexDrop, setSexDrop] = useState(false);
    const [interestsDrop, setInterestsDrop] = useState(false);
    const [desireDrop, setDesireDrop] = useState(false);


    const [activityOptions, setActivityOptions] = useState<Option[]>([]);
    const [attitudeOptions, setAttitudeOptions] = useState<Option[]>([]);
    const [skillLvlOptions, setSkillLvlOptions] = useState<Option[]>([]);


    const [sex, setSex] = useState(null);
    const [interests, setInterests] = useState<[]>([]);
    const [interestsDegree, setInterestsDegree] = useState({});
    const [zip, setZip] = useState("");
    const [desire, setDesire] = useState("");
    const [age, setAge] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
        //   allowsEditing: true,
        //   aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };


    useEffect(() => {

        /*TODO: Here we need another fetch request to fetch the existing profile info */



        getRequest('api/activity').then(response => {
            if (response.data.hasOwnProperty('success')) {

                const activityArr = response.data.success;
                let formattedActivities: Option[] = [];
                activityArr.map((activity) => {
                    formattedActivities.push({
                        label: activity,
                        value: activity,
                    });
                });

                setActivityOptions(formattedActivities);
            }
        });

        getRequest('api/attitude').then(response => {
            if (response.data.hasOwnProperty('success')) {
                const attitudeArr = response.data.success;
                let formattedAttitudes: Option[] = [];
                attitudeArr.map((attitude) => {
                    formattedAttitudes.push({
                        label: attitude,
                        value: attitude
                    });
                });

                setAttitudeOptions(formattedAttitudes);
            }
        });

        getRequest('api/skillLevel').then(response => {
            if (response.data.hasOwnProperty('success')) {
                const skillArr = response.data.success;
                let formattedSkills: Option[] = [];
                skillArr.map((skill) => {
                    formattedSkills.push({
                        label: skill,
                        value: skill,
                    });
                });

                setSkillLvlOptions(formattedSkills);
            }
        });
    }, []);

    const router = useRouter();

    const handleSubmit = () => {
        /*TODO: Here new submit function needed to update the profile info*/



        const formattedInterests: any = [];

        for (const activity in interestsDegree) {
            formattedInterests.push({
                'activity': activity,
                'attitude': interestsDegree[activity].attitude,
                'skillLevel': interestsDegree[activity].skillLevel,
            });
        }

        postRequest('api/user/interest', { 'interests': formattedInterests }).then(response => {
            if (response.data.hasOwnProperty('success')) {
                router.replace('/');
            }
        });

    };



    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View
                style={{ width: "50%", justifyContent: "center", alignItems: "center", gap: 10 }}
            >
                <TouchableOpacity onPress={pickImage}>

                    <View style={styles.profilImageContainer}>
                        <Image
                            source={{ uri: image }}
                            style={styles.image}
                        />
                    </View>
                </TouchableOpacity>
                <TextInput
                    style={globalStyles.input}
                    placeholderTextColor="#000"
                    placeholder="Name"
                    onChangeText={(text) => {
                        setName(text);
                    }}
                    value={name}
                    autoCapitalize="none" />
                <TextInput
                    style={globalStyles.input}
                    placeholderTextColor="#000"
                    placeholder="Age"
                    onChangeText={(text) => {
                        setAge(text);
                    }}
                    value={age}
                    autoCapitalize="none" />
                <TextInput
                    style={globalStyles.input}
                    placeholderTextColor="#000"
                    placeholder="Zip Code"
                    onChangeText={(text) => {
                        setZip(text);
                    }}
                    value={zip}
                    autoCapitalize="none"
                />
                <View
                    style={{
                        width: "80%",
                        zIndex: 3
                    }}
                >
                    <DropDownPicker
                        open={interestsDrop}
                        value={interests}
                        items={activityOptions}
                        setOpen={setInterestsDrop}
                        setValue={setInterests}
                        placeholder="Select Interests"
                        multiple

                    />
                </View>
                {interests &&
                    interests?.map((item, index) => {
                        return (
                            <View style={{ marginTop: 10, width: "80%", borderWidth: 1, padding: 8, borderRadius: 8, borderStyle: 'dashed' }} key={index}>
                                <Text
                                    style={{
                                        textTransform: "capitalize",
                                        marginBottom: 7,
                                        fontWeight: "600",
                                        fontSize: 16,
                                    }}
                                >
                                    {item}
                                </Text>
                                <Text
                                    style={{
                                        textTransform: "capitalize",
                                        marginTop: 7,
                                        fontWeight: "400",
                                        fontSize: 14,
                                    }}
                                >
                                    How interested in this activity are you?
                                </Text>
                                <Picker
                                    style={styles.picker}
                                    // @ts-ignore
                                    selectedValue={interestsDegree[item]?.often}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setInterestsDegree((prev) => ({
                                            ...prev,
                                            // @ts-ignore
                                            [item]: { ...prev[item], attitude: itemValue },
                                        }));
                                    }}
                                >
                                    {attitudeOptions.map((option: Option, index) => (
                                        <Picker.Item
                                            key={index}
                                            label={option.label}
                                            value={option.value}
                                        />
                                    ))}
                                </Picker>
                                <Text
                                    style={{
                                        textTransform: "capitalize",
                                        marginTop: 7,
                                        fontWeight: "400",
                                        fontSize: 14,
                                    }}
                                >
                                    What’s your experience level?
                                </Text>
                                <Picker
                                    style={styles.picker}
                                    // @ts-ignore
                                    selectedValue={interestsDegree[item]?.experience}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setInterestsDegree((prev) => ({
                                            ...prev,
                                            // @ts-ignore
                                            [item]: { ...prev[item], skillLevel: itemValue },
                                        }));
                                    }}
                                >
                                    {skillLvlOptions.map((option: Option, index) => (
                                        <Picker.Item
                                            key={index}
                                            label={option.label}
                                            value={option.value}
                                        />
                                    ))}
                                </Picker>
                            </View>
                        );
                    })}

                <View
                    style={{
                        width: "80%",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 2,
                    }}
                >
                    <DropDownPicker
                        open={sexDrop}
                        value={sex}
                        items={sexInit}
                        setOpen={setSexDrop}
                        setValue={setSex}
                        placeholder="What's Your Gender?"
                    />
                </View>

                <View
                    style={{

                        width: "80%",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex:1
                    }}
                >
                    <DropDownPicker
                        open={desireDrop}
                        value={desire}
                        items={desireInit}
                        setOpen={setDesireDrop}
                        setValue={setDesire}
                        placeholder="Which Gender(s) Are You Interested In?"
                    />
                </View>

                <View style={{ marginTop: 10 }}>
                    <Button onPress={handleSubmit} title='Update Info' />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    picker: {
        width: "100%",
        borderRadius: 5,
        padding: 10,
        borderWidth: 1,
        backgroundColor: "transparent",
        marginTop: 10,
    },
    profilImageContainer: {
        width: 150,
        height: 150,
        margin: 5,
        borderRadius: 75,
        overflow: 'hidden',
        borderWidth: 1
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
