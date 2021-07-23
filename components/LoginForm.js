import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginForm(props) {

    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const [newUserName, setNewUserName] = useState("")
    const [newUserPassword, setNewUserPassword] = useState("")

    const handleSubmit1 = (e) => {
        props.setUser({
            username,
            password,
        })
    }

    const saveUser = () => {
        const newUser = {
            "username": newUserName,
            "password": newUserPassword,
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
                style={styles.loginFormUN}
                placeholder="username"
                value={username}
            />
            <TextInput
                onChangeText={(text) => setPassword(text)}
                style={styles.loginFormPW}
                placeholder="password"
                value={password}
                secureTextEntry={true}
            />
            <Button title="Submit" style={styles.button} onPress={handleSubmit1} />
            <TextInput
                onChangeText={() => setNewUserName()}
                style={styles.signinFormUN}
                placeholder="Make New User"

            />
            <TextInput
                onChangeText={(e) => setNewUserPassword(e)}
                style={styles.signinFormPW}
                placeholder="password"

                secureTextEntry={true}
            />
            <Button title="Submit" onPress={(e) => saveUser(e)} />
        </SafeAreaView>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loginFormUN: {
        flex:1,
        padding:1,
        margin:1,
        position: "relative",
        top:50
    },
    loginFormPW: {
        flex:1,
        padding:1,
        margin:2
    }
})
