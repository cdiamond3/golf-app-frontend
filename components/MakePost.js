import React from 'react'
import { StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import { useState } from 'react';
import { Button, Input } from 'react-native-elements';


export default function MakePost() {
    const [post, setPost] = useState("")
    const dateLabel = new Date()

    const savePost = () => {

        fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify({
                input: post,
                date: dateLabel,
                user: "Test"
            }),
        })
            .then(() => { })
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