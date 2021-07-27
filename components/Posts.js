import React, { useState, useEffect } from 'react'
import { Button, Input, Card, ListItem } from 'react-native-elements';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Posts({ post }) {
    const [comment, setComment] = useState("")

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
                            "post_id": post.id
                        }
                    }),
                })
                    .then(res => res.json())
                    .then(data => setPostComments([...post.comments, data.input])))
    }

    return (
        <Card style={styles.container}>
            <Text style={styles.title}>{post.input}</Text>
            <Text style={styles.age}>{post.user.username}</Text>
            <Text style={styles.age}>{post.date}</Text>
            <Input
                placeholder="Comment"
                leftIcon={{ type: 'font-awesome', name: 'comment' }}
                onChangeText={(e) => setComment(e)}
            />
            <ScrollView>
                <Text > {post.comments.map(comment => {
                    return <View>
                        <ListItem bottomDivider style={styles.comments}>
                            {/* <ListItem.Content> */}
                                {/* <ListItem.Title > */}
                                    <Text>{"user" + comment.user.username + ":" + comment.input}</Text>
                                {/* </ListItem.Title> */}
                            {/* </ListItem.Content > */}
                        </ListItem >
                    </View>
                })} </Text>
            </ScrollView>



            <Button
                buttonStyle={{ borderRadius: 50, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                title='Post Comment'
                onPress={() => saveComment()}
            />
        </Card>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection:"column",
        flexWrap: "wrap",
        justifyContent: "center",
        margin: 1,
        padding: 1,
        backgroundColor: "red"
    },
    comments: {
        flex: 1,
        width:325,
        height:1,
        flexWrap: "wrap",
        textAlign: "left",
        padding: 1,
        margin: 1,
        // backgroundColor: "pink"
    }
});