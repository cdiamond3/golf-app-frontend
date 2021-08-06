import React from 'react'
import { StyleSheet, SafeAreaView, Text, Button, View } from 'react-native';
import { useState } from 'react';
import { Input, ImageBackground } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageUpload from './ImageUpload';



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
                    .then(res => res.json())
                    .then(data => props.setPostsArea(...props.postsArea, data))
                    .then(() => { })
            )
    }

    const image = { uri: "https://wallpaperaccess.com/full/1128313.jpg" };



    return (
        <SafeAreaView style={styles.input}>
            
            <Input
                placeholder="Post"
                onChangeText={(e) => setPost(e)}
            />
            <Button
                buttonStyle={{ borderRadius: 50, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                title='Post'
                onPress={(e) => savePost(e)}
            />
            <View>
                <ImageUpload style={styles.container}/>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        flex: 1,
        position: "relative",
        top: 300,
        width: 200
    },
});


