import React from 'react'
import { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import Posts from './Posts';

export default function PostCards() {
    const [postsArea, setPostsArea] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/posts")
            .then(res => res.json())
            .then(data => {
                setPostsArea(data)
            })
    }, [])



    const showPosts = () => postsArea.map(post => {
        return <Posts post={post} />
    })

    return (
        <ScrollView style={styles.ScrollView}>
            {showPosts()}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});