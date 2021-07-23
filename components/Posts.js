import React, { useState, useEffect } from 'react'
import { Button, Input, Card } from 'react-native-elements';
import { StyleSheet, Text, SafeAreaView, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements/dist/list/ListItem';

export default function Posts({ post }) {
    const [comment, setComment] = useState("")
    const [postComments, setPostComments] = useState(post.comments)

    // useEffect(() => {
    //     fetch("http://localhost:3000/comments")
    //         .then(res => res.json())
    //         .then(data => {
    //             const filteredPostComments = data.filter(d => {
    //                 return d.post_id === post.id
    //             })
    //             const formattedPostComments = filteredPostComments.map(post => {
    //                 return post.input + ""
    //             })
    //             setPostComments(formattedPostComments)
    //         })
    // }, [])

    console.log("sting", postComments)

    const saveComment = () => {
        fetch('http://localhost:3000/comments', {
            method: 'POST',
            headers: {
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
            .then(data => setPostComments([...postComments, data.input]))
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
                onPress={(e) => saveComment(e)}
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