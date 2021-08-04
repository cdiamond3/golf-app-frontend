import React from 'react'
import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, ImageBackground  } from 'react-native';
import ProfileCards from './ProfileCards';


export default function MyProfileArea({user, myProfile, setMyProfile}) {
    
        
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