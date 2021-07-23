import React, { useState, useEffect } from 'react'
import { Button, Input, Card } from 'react-native-elements';
import { StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements/dist/list/ListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Posts({ post }) {
    const [comment, setComment] = useState("")
    const [postComments, setPostComments] = useState(post.comments)

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
                        "post": {
                            "comment": {
                                "input": comment,
                                "post_id": post.id
                            }
                        }
                    }),
                })
                    .then(res => res.json())
                    .then(data => setPostComments([...post.comments, data.input])))
    }

    return (
        <Card style={styles.postCard}>
            <Text style={styles.title}>{post.input}</Text>
            <Text style={styles.age}>{post.user}</Text>
            <Text style={styles.age}>{post.date}</Text>
            <Input
                placeholder="Comment"
                leftIcon={{ type: 'font-awesome', name: 'comment' }}
                onChangeText={(e) => setComment(e)}
            />
            <Card>
                <Text style={styles.comments}>{postComments.map(c => {
                    return <ListItem>
                        <Text> {c.input} </Text>
                    </ListItem>
                })}</Text>
            </Card>
            <Button
                buttonStyle={{ borderRadius: 50, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                title='Post Comment'
                onPress={() => saveComment()}
            />
        </Card>
    )
}

const styles = StyleSheet.create({

    comments: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        margin: 1,
        padding: 1,
    }
});