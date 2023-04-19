import React, { useState } from "react";
import { TextInput, StyleSheet, TouchableWithoutFeedback, Picker,Button } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Text, View } from "../Themed";
import globalStyles from "../../styles/global";

const interestsInit = [
	{ value: "hiking", label: "Hiking" },
	{ value: "biking", label: "Biking" },
	{ value: "swimming", label: "Swimming" },
	{ value: "fishing", label: "Fishing" },
	{ value: "rock_climbing", label: "Rock Climbing" },
	{ value: "trailblazing", label: "Trailblazing" },
	{ value: "running/jogging", label: "Running/Jogging" },
	{ value: "horse_back_riding", label: "Horse Back Riding" },
	{ value: "rafting", label: "Rafting" },
	{ value: "camping", label: "Camping" },
	{ value: "ziplining", label: "Ziplining" },
	{ value: "skiing/snowboarding", label: "Skiing/Snowboarding" },
	{ value: "bungee_jumping", label: "Bungee Jumping" },
	{ value: "canoeing", label: "Canoeing" },
	{ value: "skydiving", label: "Skydiving" },
];

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

const oftenInit = [
	{ value: 1, label: "Less than once a month" },
	{ value: 2, label: "Once a month" },
	{ value: 3, label: "Twice a month" },
	{ value: 4, label: "Weekly" },
	{ value: 5, label: "More than once a week" },
];

const experienceInit = [
	{ value: 1, label: "Novice" },
	{ value: 2, label: "Beginner" },
	{ value: 3, label: "Intermediate" },
	{ value: 4, label: "Expert" },
	{ value: 5, label: "Master" },
];

export default function PostRegistration() {
	const [sexDrop, setSexDrop] = useState(false);
	const [interestsDrop, setinterestsDrop] = useState(false);
	const [desireDrop, setDesireDrop] = useState(false);

	const [sex, setSex] = useState(null);
	const [interests, setInterests] = useState(null);
	const [interestsDegree, setInterestsDegree] = useState({});
	const [zip, setZip] = useState("");
	const [desire, setDesire] = useState("");
	const [age, setAge] = useState("");

	const handleDegree = (interest, degree) => {
		const arr = [...interestsDegree];
		const index = interestsDegree.findIndex((obj) => obj.interest === interest);
		
		if (index !== -1) {
			arr[index].degree = degree;
		} else {
			arr.push({ interest, degree });
		}
		setInterestsDegree([...arr]);
	};

	const handleSubmit = () => {
		const data = {
			interests: interestsDegree,
			sex,
			age,
			zip,
			desire,
		};
	
	};

	

	return (
		<>
			<View
				style={{ width: "50%", justifyContent: "center", alignItems: "center" }}
			>
				<View
					style={{
						width: "80%",
						zIndex: 2,
					}}
				>
					<DropDownPicker
						open={interestsDrop}
						value={interests}
						items={interestsInit}
						setOpen={setinterestsDrop}
						setValue={setInterests}
						placeholder="Select Interests"
						multiple
						zIndex={1}
						
				/>
				</View>
				{interests &&
					interests?.map((item, index) => {
						return (
							<View style={{ marginTop: 10, width: "80%",borderWidth: 1, padding: 8, borderRadius: 8, borderStyle: 'dashed' }} key={index}>
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
									How often do you go?
								</Text>
								<Picker
									style={styles.picker}
									selectedValue={interestsDegree[item]?.often}
									onValueChange={(itemValue, itemIndex) => {
										setInterestsDegree((prev) => ({
											...prev,
											[item]: { ...prev[item], often: itemValue },
										}));
									}}
								>
									{oftenInit.map((option, index) => (
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
									selectedValue={interestsDegree[item]?.experience}
									onValueChange={(itemValue, itemIndex) => {
										setInterestsDegree((prev) => ({
											...prev,
											[item]: { ...prev[item], experience: itemValue },
										}));
									}}
								>
									{experienceInit.map((option, index) => (
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
						justifyContent: "center",
						alignItems: "center",
						zIndex: 0,
					}}
				>
					<DropDownPicker
						open={sexDrop}
						value={sex}
						items={sexInit}
						setOpen={setSexDrop}
						setValue={setSex}
						placeholder="What's Your Gender?"
						zIndex={1}
						style={globalStyles.input}
					/>
				</View>
				
				<View 
					style={{
						
						width: "80%",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<DropDownPicker
						open={desireDrop}
						value={desire}
						items={desireInit}
						setOpen={setDesireDrop}
						setValue={setDesire}
						placeholder="Which Gender(s) Are You Interested In?"
						zIndex={2}
						style={globalStyles.input}
					/>
				</View>
				<TextInput
					style={globalStyles.input}
					placeholderTextColor="#000"
					placeholder="Age"
					onChangeText={(text) => {
						setAge(text);
					}}
					value={age}
					autoCapitalize="none"/>
					<View style={{ marginTop: 10 }}>
					<Button onPress={handleSubmit} title='Continue' />
				  </View>
			</View>
		</>
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
});
