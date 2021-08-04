import React, { useState } from 'react'
import { Alert, StyleSheet, TextInput, View, Image } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginForm({ setUser, setUserName, username }) {
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
                    // console.log('token', result.token);
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
        Alert.alert(
            "Congrats!",
            `You have registered a new user!`,
            [
                { text: "OK", onPress: () => { setNewUserName(''), setNewUserPassword('') } }
            ]
        );


    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.backDrop}>
                <Text h1 style={styles.text1} >My Pocket Caddie</Text>
                <Image
                    style={styles.logo}
                    source={{
                        uri: 'http://clipart-library.com/images_k/golf-transparent-background/golf-transparent-background-23.png',
                    }}
                />
                <Text h3 style={styles.text} >Log in below!</Text>
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
                <Button
                    buttonStyle={{ borderRadius: 50, marginLeft: 0, marginRight: 0, marginTop: 25, backgroundColor: "#52BA30" }}
                    title="Login" style={styles.button} onPress={handleLogin} />
                <Text h3 style={styles.text} >Don't Have An Account? SignUp Below!</Text>
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
                <Button
                    buttonStyle={{ borderRadius: 50, marginLeft: 0, marginRight: 0, marginTop: 25, backgroundColor: "#52BA30" }}
                    title="Register New user" style={styles.button, { color: 'red' }} onPress={(e) => saveUser(e)} />
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: .5,
    },
    loginForm: {
        borderWidth: 1,
        width: 425,
        height: 40,
        borderRadius: 40 / 2,
        padding: 10,
        marginTop: 10,
        backgroundColor: "white",
    },
    signinForm: {
        borderWidth: 1,
        width: 425,
        height: 40,
        borderRadius: 40 / 2,
        padding: 10,
        marginTop: 10,
        backgroundColor: "white",
    },
    button: {
        padding: 2,
        margin: 1,
        borderRadius: 40 / 2,
    },
    text: {
        textAlign: "center",
        color: "white"
    },
    text1: {
        textAlign: "center",
        color: "white",
        position: "relative",
        top: -180
    },
    backDrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 50,
        minHeight: 1100,
        minWidth: 430,
        shadowRadius: 50,
    },
    // tinyLogo: {
    //     width: 50,
    //     height: 50,
    // },
    logo: {
        position: "absolute",
        top: -110,
        left: 160,
        width: 125,
        height: 100,
    },
});
