// Login and SignUp page 

import {useContext, useState} from 'react';
import {StyleSheet, View, TextInput, Button, Text, AppConfig} from 'react-native';

import {postRequest} from "../../../util/ajax";
import {useAuth} from "../../../context/auth";

// Login Page
const Login = () => {

    const {signIn} = useAuth();
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
                if(response.data == 'Login success') {
                    signIn(true);
                } else {
                    signIn(false);
                }
            });

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

export default Login;
