import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginForm({setUser, setUserName, username}) {

    const [password, setPassword] = useState("")

    const [newUserName, setNewUserName] = useState("")
    const [newUserPassword, setNewUserPassword] = useState("")

    const handleLogin = event => {
        event.preventDefault();
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password
                }
            })
        })
            .then(response => response.json())
            .then(result => {
                if (result.error) {
                    console.error(result.error);
                } else {
                    console.log('token', result.token);
                    AsyncStorage.setItem('token', result.token)
                        .then(setUser(result))
                }
            });
        setUserName('');
        setNewUserPassword('');
    }

    const saveUser = () => {
        const newUser = {
            username: newUserName,
            password: newUserPassword,
        }
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify(newUser),
        })
            .then(() => { })
    }

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                onChangeText={(text) => setUserName(text)}
                style={styles.loginForm}
                placeholder="Enter Username..."
                value={username}
            />
            <TextInput
                onChangeText={(text) => setPassword(text)}
                style={styles.loginForm}
                placeholder="Enter Password..."
                value={password}
                secureTextEntry={true}
            />
            <Button title="Login" style={styles.button} onPress={handleLogin} />
            <Text></Text>
            <TextInput
                onChangeText={(e) => setNewUserName(e)}
                style={styles.signinForm}
                placeholder="Make New User"
            />
            <TextInput
                onChangeText={(e) => setNewUserPassword(e)}
                style={styles.signinForm}
                placeholder="Make New Password"
                secureTextEntry={true}
            />
            <Button title="Register New user" style={styles.button} onPress={(e) => saveUser(e)} />
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: .5
    },
    loginForm: {
        borderWidth: 1,
        width: 300,
        height: 40,
        borderRadius: 40 / 2,
        padding: 10,
        marginTop: 10,
    },
    signinForm: {
        borderWidth: 1,
        width: 300,
        height: 40,
        borderRadius: 40 / 2,
        padding: 10,
        marginTop: 10,
    },
    button: {
        // flex:1,
        padding: 1,
        margin: 1,
        borderRadius: 40 / 2,
    }
})
