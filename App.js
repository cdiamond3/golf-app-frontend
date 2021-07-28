import * as React from 'react';
import { StyleSheet, SafeAreaView, View, Platform, Button } from 'react-native';
import PostCards from './components/PostCards';
import SubmitPostForm from './components/SubmitPostForm';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginForm from './components/LoginForm';
import { useState } from 'react';


export default function App() {
  const [user, setUser] = useState({})
  const [username, setUserName] = useState("")
  const [postsArea, setPostsArea] = useState([])
  
  function HomeScreen() {
    return (
      <SafeAreaView>
        <PostCards key="postCardsKey" postsArea={postsArea} setPostsArea={setPostsArea} />
      </SafeAreaView>
    );
  }
  function PostScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <SubmitPostForm key="postKey" user={username} postsArea={postsArea} setPostsArea={setPostsArea} />
      </View>
    );
  }

  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaView style={styles.main}>
      {user.token
        ?
        <NavigationContainer >
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Make A Post" component={PostScreen} />
          </Tab.Navigator>
        </NavigationContainer>
        :
        <SafeAreaView style={styles.container}>
          <LoginForm key="loginForm" setUser={setUser} setUserName={setUserName} username={username} />
        </SafeAreaView>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',


  },
  main: {
    flex: 1,
    position: "relative",
  }
});