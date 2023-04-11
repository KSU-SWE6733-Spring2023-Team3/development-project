import React, { useState } from 'react'
import { TextInput, StyleSheet, TouchableOpacity, Picker } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { Text, View } from '../Themed'
import globalStyles from '../../styles/global'

const interestsInit = [{ value: 'hiking', label: "Hiking" }, { value: 'biking', label: "Biking" }, { value: 'swimming', label: "Swimming" }, { value: 'fishing', label: "Fishing" }, { value: 'rock_climbing', label: "Rock Climbing" }, { value: 'trailblazing', label: "Trailblazing" }, { value: 'running/jogging', label: "Running/Jogging" }, { value: 'horse_back_riding', label: "Horse Back Riding" }, { value: 'rafting', label: "Rafting" }, { value: 'camping', label: "Camping" }, { value: 'ziplining', label: "Ziplining" }, { value: 'skiing/snowboarding', label: "Skiing/Snowboarding" }, { value: 'bungee_jumping', label: "Bungee Jumping" }, { value: 'canoeing', label: "Canoeing" }, { value: 'skydiving', label: "Skydiving" }]

const sexInit = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
]

const oftenInit = [
  { value: 1, label: 'Less than once a month' },
  { value: 2, label: 'Once a month' },
  { value: 3, label: 'Twice a month' },
  { value: 4, label: 'Weekly' },
  { value: 5, label: 'More than once a week' },
]

const experienceInit = [
  {value:1, label:'Novice'},
  {value:2, label:'Beginner'},
  {value:3, label:'Intermediate'},
  {value:4, label:'Expert'},
  {value:5, label:'Master'}
]

export default function PostRegistration() {
  const [sexDrop, setSexDrop] = useState(false)
  const [interestsDrop, setinterestsDrop] = useState(false)


  const [sex, setSex] = useState(null);
  const [interests, setInterests] = useState(null)
  const [interestsDegree, setInterestsDegree] = useState({})
  const [zip, setZip] = useState('')
  const [orientation, setOrientation] = useState('')
  const [age, setAge] = useState('')

  const handleDegree = (interest, degree) => {
    const arr = [...interestsDegree]
    const index = interestsDegree.findIndex(obj => obj.interest === interest);
    console.log(index)
    if (index !== -1) {
      arr[index].degree = degree;
    } else {
      arr.push({ interest, degree });
    }
    setInterestsDegree([...arr])
  }

  const handleSubmit = () => {
    const data = {
      interests: interestsDegree,
      sex,
      age,
      zip,
      orientation
    }
    console.log(data)
  }

  return (
    <>

      <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: '80%', paddingLeft: '10%', justifyContent: 'center', zIndex: 1 }}>
          <DropDownPicker
            open={interestsDrop}
            value={interests}
            items={interestsInit}
            setOpen={setinterestsDrop}
            setValue={setInterests}
            placeholder="Select Interests"
            multiple
            zIndex={1}
            style={globalStyles.input}
          />
        </View>
        {
          interests && interests?.map((item, index) => {
            return <View style={{ marginTop: 10, width:'80%' }} key={index}>

              <Text style={{ textTransform: 'capitalize', marginBottom: 7, fontWeight: '600', fontSize:16 }}>{item}</Text>
              <Text style={{ textTransform: 'capitalize', marginTop:7, fontWeight: '400', fontSize:14 }}>How often do you go?</Text>
              <Picker
                style={styles.picker}
                selectedValue={interestsDegree[item]?.often}
                onValueChange={(itemValue, itemIndex) => {
                  setInterestsDegree((prev) => ({ ...prev, [item]: { ...prev[item], often: itemValue } })
                  )
                }}
              >
                {oftenInit.map((option, index) => (
                  <Picker.Item key={index} label={option.label} value={option.value} />
                  ))}
              </Picker>
                  <Text style={{ textTransform: 'capitalize', marginTop: 7, fontWeight: '400', fontSize:14 }}>What’s your experience level?</Text>
              <Picker
                style={styles.picker}
                selectedValue={interestsDegree[item]?.experience}
                onValueChange={(itemValue, itemIndex) => {
                  setInterestsDegree((prev) => ({ ...prev, [item]: { ...prev[item], experience: itemValue } })
                  )
                }}
              >
                {experienceInit.map((option, index) => (
                  <Picker.Item key={index} label={option.label} value={option.value} />
                ))}
              </Picker>
            </View>
          })
        }
        <TextInput
          style={globalStyles.input}
          placeholderTextColor="#000"
          placeholder="Zip Code"
          onChangeText={(text) => { setZip(text) }}
          value={zip}
          autoCapitalize="none"
        />
        <View style={{ width: '80%', paddingLeft: '10%', justifyContent: 'center', alignItems: 'center' }}>
          <DropDownPicker
            open={sexDrop}
            value={sex}
            items={sexInit}
            setOpen={setSexDrop}
            setValue={setSex}
            placeholder="Select Sex"
            zIndex={0}
            style={globalStyles.input}
          />
        </View>
        <TextInput
          style={globalStyles.input}
          placeholderTextColor="#000"
          placeholder="Orientation"
          onChangeText={(text) => { setOrientation(text) }}
          value={orientation}
          autoCapitalize="none"
        />
        <TextInput
          style={globalStyles.input}
          placeholderTextColor="#000"
          placeholder="Age"
          onChangeText={(text) => { setAge(text) }}
          value={age}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.btn}
          onPress={handleSubmit}
        >
          <Text>Continue</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  btn: {
    width: '80%',
    height: 48,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  picker: {
    width: '100%',
    borderRadius: 5,
    padding: 10,
    borderWidth: 1, // Remove outline
    backgroundColor: 'transparent', // Remove outline
    marginTop:10
  },
})