import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, ImageBackground } from 'react-native';
import Posts from './Posts';

export default function PostCards({user, myProfile, setMyProfile}) {
    const [postsArea, setPostsArea] = useState([])

    useEffect(() => {
        AsyncStorage.getItem("token")
            .then(result =>
                fetch("http://localhost:3000/posts", {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${result}`
                    },
                })
                    .then(res => res.json())
                    .then(data => {
                        setPostsArea(data)
                    })
            )
    }, [])

    const showPosts = () => postsArea.map(post => {
        return <Posts key={post.id} post={post} postsArea={postsArea} user={user} setPostsArea={setPostsArea} myProfile={myProfile} setMyProfile={setMyProfile}/>
    })

    const image = { uri: "https://wallpaperaccess.com/full/1128313.jpg" };


    return (
        <ScrollView style={styles.ScrollView}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image} blurRadius={1}>
            {showPosts()}
        </ImageBackground>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"red"
    },
    image: {
        flex: 1,
        justifyContent: "center"
      },
});