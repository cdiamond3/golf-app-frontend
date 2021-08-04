import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, ImageBackground  } from 'react-native';
import ProfileCards from './ProfileCards';


export default function MyProfileArea({user}) {
    const [myProfile, setMyProfile] = useState({})

    useEffect(() => {
        AsyncStorage.getItem("token")
            .then(result =>
                fetch("http://localhost:3000/profile", {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${result}`
                    },
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data.comments)
                        console.log(data)
                        setMyProfile(data)
                    })
            )
        }, [])
        
        const image = { uri: "https://wallpaperaccess.com/full/1128313.jpg" };

        const showProfile = () => {
            return <ProfileCards myProfile={myProfile} setMyProfile={setMyProfile} user={user}/>
        }

        return (
            <ScrollView style={styles.ScrollView}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image} blurRadius={1}>
                {showProfile()}
            </ImageBackground>
    
            </ScrollView>
        )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "red"
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    card:{
        
    }
});