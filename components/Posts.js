import React, { useState } from 'react'
import { Button, Input, Card, Rating, Text, Avatar } from 'react-native-elements';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Posts({ post, setPostsArea, postsArea, user }) {
    const [comment, setComment] = useState("")

    console.log(user.user.id)

    function ratingCompleted(rating, comment) {
        AsyncStorage.getItem("token")
            .then(result =>
                fetch('http://localhost:3000/ratings', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${result}`,
                        'Content-Type': 'application/json',
                        "Accept": 'application/json'
                    },
                    body: JSON.stringify({
                        "rating": {
                            "value": rating,
                            "user_id": user.user.id,
                            "comment_id": comment.id
                        }
                    }),
                })
                    .then(res => res.json()))
        Alert.alert(
            "Alert!",
            `You have rated this comment a ${rating} out of 5!`,
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );
        console.log(rating)
    }

    

    const saveComment = () => {
        AsyncStorage.getItem("token")
            .then(result =>
                fetch('http://localhost:3000/comments', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${result}`,
                        'Content-Type': 'application/json',
                        "Accept": 'application/json'
                    },
                    body: JSON.stringify({
                        "comment": {
                            "input": comment,
                            "post_id": post.id,
                            "user": { username: user.username }
                        }
                    }),
                })
                    .then(res => res.json()))
            .then(newComment => {
                const postToUpdate = postsArea.find(postArea => post.id === postArea.id)
                postToUpdate.comments = [...postToUpdate.comments, newComment]
                const updatedPostArea = postsArea.filter(postArea => postArea.id !== postToUpdate.id)
                setPostsArea([postToUpdate, ...updatedPostArea])
            })
            .then(setComment(" "))
    }

    return (
        <View style={styles.container}>
            <Card containerStyle={styles.card}>
                <View containerStyle={styles.commentArea}>
                    <Text h1 style={styles.title}>{post.user.username}</Text>
                    <Text h3 style={styles.title2}>{post.input}</Text>
                    <Text h5 style={styles.title3}>{post.date}</Text>
                    <Input
                        style={styles.input}
                        placeholder="Comment"
                        leftIcon={{ type: 'font-awesome', name: 'comment', color: 'white' }}
                        onChangeText={(e) => setComment(e)}
                    />
                    <Button
                        buttonStyle={{ borderRadius: 50, marginBottom: 20, marginRight: 0, backgroundColor: "#52BA30" }}
                        title='Post Comment'
                        onPress={(e) => saveComment(e)}
                    />
                    <ScrollView style={styles.commentArea}>
                        {post.comments.map(comment => {
                            return <View key={comment.id}>
                                <Text h4 style={styles.text}> {comment.user.username + ":" + " " + comment.input}</Text>
                                <Rating
                                    style={styles.rating}
                                    type='star'
                                    ratingCount={5}
                                    imageSize={20}
                                    showRating
                                    onFinishRating={rating => ratingCompleted(rating, comment)}
                                />
                            </View>
                        })}
                    </ScrollView>
                </View>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({


    button: {
        flex: 1,
        borderRadius: 40 / 2,
    },
    card: {
        flex: 1,
        margin: 10,
        padding: 10,
        shadowRadius: 10,
        backgroundColor: 'rgba(50,50,50,.85)',
        // borderRadius: 20,
    },
    text: {
        flex: 1,
        width: 290,
        color: "white",
        borderRadius: 10,
        padding: 5,
        margin: 5
    },
    commentArea: {
        flexDirection: 'row',
        backgroundColor: 'rgba(100,100,105,.45)',
        // borderRadius: 25

    },
    rating: {
        position: "relative",
        bottom: 30,
        left: 180,
        padding: 1,
    },
    input: {
        backgroundColor: "white",
        borderRadius: 30,
        padding: 2,
        marginLeft:10
    },
    title: {
        color: "white",
        padding: 2,
        margin: 10,
        fontWeight: "bold"
    },
    title2: {
        color: "#CECECE",
        padding: 2,
        margin: 10
    },
    title3: {
        color: "#9E9E9E",
        padding: 2,
        margin: 10
    },
});