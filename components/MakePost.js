import React from 'react'
import { StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import { useState } from 'react';
import { Button, Input } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function MakePost(props) {
    const [post, setPost] = useState("")
    const dateLabel = new Date()

    const savePost = () => {
        AsyncStorage.getItem("token")
            .then(token =>
                fetch('http://localhost:3000/posts', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        "Accept": 'application/json'
                    },
                    body: JSON.stringify({
                        "post": {
                            "input": post,
                            "date": dateLabel,
                        }
                    }),
                })
                    .then(result => console.log(result))
                    .then(() => { })
            )
    }
    return (
        <SafeAreaView style={styles.input}>
            <Input
                placeholder="Comment"
                onChangeText={(e) => setPost(e)}
            />
            <Button
                buttonStyle={{ borderRadius: 50, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                title='Post'
                onPress={(e) => savePost(e)}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: 200
    }
});