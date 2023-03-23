// Login and SignUp page 

import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';

import {getRequest, postRequest} from "./../../util/ajax";

// Login Page
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [iserr, setIsErr] = useState(false);


    const handleLogin = async () => {
        // Handle login functionality
        if (!email.includes("@") || email.length < 4 || password.length < 16) {
            setIsErr(true)
        } else {

            let uploadData = new FormData();
            uploadData.append('email', email);
            uploadData.append('password', password);

            postRequest('api/login', uploadData).then(response => {
                console.log(response);
                getRequest('api/user').then(getResponse => {
                    console.log(getResponse);
                })
            })
        }
    };

        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                />
                {iserr && <div>Credentials are not valid!</div>}
                <Button title="Login" onPress={handleLogin}/>
            </View>
        );
    };


const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <View style={styles.container}>
      {isLogin ? <Login /> : <div>Here RegistrationForm</div> }
      <Text
        style={styles.toggleText}
        onPress={() => setIsLogin(!isLogin)}
      >
        {isLogin ? 'Need to create an account?' : 'Already have an account?'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderColor: 'green',
    borderWidth: 2,
  },
  toggleText: {
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});

export default App;
