import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";
import { SearchBar } from 'react-native-elements';


const DATA = [
  {
    id: '1',
    name: 'John Doe',
    imageUri: 'https://randomuser.me/api/portraits/men/1.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, ante vitae ultrices vestibulum, mi urna eleifend ipsum, vel placerat quam sapien eget nunc.',
  },
  {
    id: '2',
    name: 'Jane Doe',
    imageUri: 'https://randomuser.me/api/portraits/women/1.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, ante vitae ultrices vestibulum, mi urna eleifend ipsum, vel placerat quam sapien eget nunc.',
  },
  {
    id: '3',
    name: 'Bob Smith',
    imageUri: 'https://randomuser.me/api/portraits/men/2.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, ante vitae ultrices vestibulum, mi urna eleifend ipsum, vel placerat quam sapien eget nunc.',
  },
  {
    id: '4',
    name: 'John Doe',
    imageUri: 'https://randomuser.me/api/portraits/men/1.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, ante vitae ultrices vestibulum, mi urna eleifend ipsum, vel placerat quam sapien eget nunc.',
  },
  {
    id: '5',
    name: 'Jane Doe',
    imageUri: 'https://randomuser.me/api/portraits/women/1.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, ante vitae ultrices vestibulum, mi urna eleifend ipsum, vel placerat quam sapien eget nunc.',
  },
  {
    id: '6',
    name: 'Bob Smith',
    imageUri: 'https://randomuser.me/api/portraits/men/2.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, ante vitae ultrices vestibulum, mi urna eleifend ipsum, vel placerat quam sapien eget nunc.',
  },
  {
    id: '7',
    name: 'John Doe',
    imageUri: 'https://randomuser.me/api/portraits/men/1.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, ante vitae ultrices vestibulum, mi urna eleifend ipsum, vel placerat quam sapien eget nunc.',
  },
  {
    id: '8',
    name: 'Jane Doe',
    imageUri: 'https://randomuser.me/api/portraits/women/1.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, ante vitae ultrices vestibulum, mi urna eleifend ipsum, vel placerat quam sapien eget nunc.',
  },
  {
    id: '9',
    name: 'Bob Smith',
    imageUri: 'https://randomuser.me/api/portraits/men/2.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, ante vitae ultrices vestibulum, mi urna eleifend ipsum, vel placerat quam sapien eget nunc.',
  },
  {
    id: '10',
    name: 'John Doe',
    imageUri: 'https://randomuser.me/api/portraits/men/1.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, ante vitae ultrices vestibulum, mi urna eleifend ipsum, vel placerat quam sapien eget nunc.',
  },
  {
    id: '11',
    name: 'Jane Doe',
    imageUri: 'https://randomuser.me/api/portraits/women/1.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, ante vitae ultrices vestibulum, mi urna eleifend ipsum, vel placerat quam sapien eget nunc.',
  },
  {
    id: '12',
    name: 'Bob Smith',
    imageUri: 'https://randomuser.me/api/portraits/men/2.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, ante vitae ultrices vestibulum, mi urna eleifend ipsum, vel placerat quam sapien eget nunc.',
  },
  {
    id: '13',
    name: 'John Doe',
    imageUri: 'https://randomuser.me/api/portraits/men/1.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, ante vitae ultrices vestibulum, mi urna eleifend ipsum, vel placerat quam sapien eget nunc.',
  },
  {
    id: '14',
    name: 'Jane Doe',
    imageUri: 'https://randomuser.me/api/portraits/women/1.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, ante vitae ultrices vestibulum, mi urna eleifend ipsum, vel placerat quam sapien eget nunc.',
  },
  {
    id: '15',
    name: 'Bob Smith',
    imageUri: 'https://randomuser.me/api/portraits/men/2.jpg',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, ante vitae ultrices vestibulum, mi urna eleifend ipsum, vel placerat quam sapien eget nunc.',
  },
];
// @ts-ignore
const ProfileListScreen = () => {
  const [searchText, setSearchText] = useState('');

  const router = useRouter();
  // @ts-ignore
  const renderItem = ({ item }) => {
    return (
      <>
        

        <TouchableOpacity onPress={() => router.push('profile')}>
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.imageUri }} style={styles.itemImage} />
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemBio} numberOfLines={2}>
                {item.bio}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View>
          <SearchBar
            placeholder="Search for users..."
            // @ts-ignore
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
            lightTheme
            containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
            inputContainerStyle={{ backgroundColor: '#F0EEEE' }}
            placeholderTextColor="#BBBBBB"
            inputStyle={{ fontSize: 16, paddingRight:40 }}
            onSubmitEditing={() => router.push(`/search?q=${searchText}`)}
          />
        </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  itemTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemBio: {
    fontSize: 14,
    marginTop: 5,
  },
});

export default ProfileListScreen;
