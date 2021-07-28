import React from 'react'
import { StyleSheet, SafeAreaView, View, Platform, Button } from 'react-native';
import { useState, useEffect  } from 'react';
import { Input } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase/app';



export default function MakePost(props) {
    const [post, setPost] = useState("")
    const dateLabel = new Date()

    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

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
             <View >
                <Button title="Pick an image from camera roll" onPress={pickImage} />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>
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