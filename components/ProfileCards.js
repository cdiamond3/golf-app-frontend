import React from 'react'
import { View } from 'react-native';
import { Card, Text, ListItem } from 'react-native-elements';
import { StyleSheet } from 'react-native';

export default function ProfileCards({ myProfile }) {

    const dateLabel = new Date()

    
return (
    <View style={styles.card}>
        <Card style={styles.card}>
            <Card.Title h2>User: {myProfile.username}</Card.Title>
            <Card.Divider />
            <Card style={styles.card}>
                <View>
                    <Text h4 style={styles.rating}>My Average Comment Rating: {myProfile.average_user_rating}</Text>
                </View>
            </Card>
        </Card>

        <Card style={styles.card}>
            <Card.Title h3 >My Instructor Ranking!</Card.Title>
            <Card.Divider />
            <Card style={styles.card}>
                <View>
                    <Text h4 style={styles.rank}>{myProfile.rating_name}</Text>
                </View>
            </Card>
        </Card>

        <Card>
            <Card.Title h4>My Comments</Card.Title>
            <Card.Divider />
            <Card>
                <View>
                    {myProfile.comments?.map(comment => {
                        return <Text key={comment.id} style={styles.myComments}> {comment.input + " " + dateLabel}</Text>
                    })}
                </View>
            </Card>
        </Card>

        <Card>
            <Card.Title h4>My Posts</Card.Title>
            <Card.Divider />
            <Card>
                <View>
                    {myProfile.posts?.map(post => {
                        return <Text key={post.id} style={styles.myPosts}>{post.input + " " + dateLabel}</Text>
                    })}
                </View>
            </Card>
        </Card>



    </View>
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
        justifyContent: "center",
        backgroundColor: "pink"
    },
    card: {
        flex: 1,
        borderRadius: 200
    },
    myComments: {
        flex: 1,
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        margin: 10,
        padding: 4,
        textAlign: "center"
        
    },
    rating: {
        flex: 1,
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        margin: 10,
        padding: 4,
        textAlign: "center"
        
    },
    rank: {
        flex: 1,
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        margin: 10,
        padding: 4,
        textAlign: "center"
        
    },
    myPosts: {
        flex: 1,
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        margin: 10,
        padding: 4,
        textAlign: "center"
    },
});
