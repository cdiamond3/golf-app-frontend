import * as React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import PostCards from './components/PostCards';
import SubmitPostForm from './components/SubmitPostForm';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginForm from './components/LoginForm';
import { useState } from 'react';
import { Header } from 'react-native-elements';
import ApiKeys from './constants/ApiKeys';
import * as firebase from 'firebase'
import '@firebase/firestore';
import MyProfileArea from './components/MyProfileArea';
import { Appbar } from 'react-native-paper';


export default function App() {
  const [user, setUser] = useState({})
  const [username, setUserName] = useState("")
  const [postsArea, setPostsArea] = useState([])


  function HomeScreen() {
    return (
      <SafeAreaView>
        <PostCards key="postCardsKey" postsArea={postsArea} setPostsArea={setPostsArea} user={user} />
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
  function ProfileScreen() {
    return (
      <SafeAreaView>
        <MyProfileArea user={user} />
      </SafeAreaView>
    );
  }

  const _goBack = () => {
    {HomeScreen}
  }

  const _handleMore = () => console.log('Shown more');



  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaView style={styles.main}>
      {user.token
        ?
        <NavigationContainer >
          <Appbar.Header style={styles.bottom}>
            <Appbar.BackAction onPress={_goBack} />
            <Appbar.Content title="My Pocket Caddie" />
            <Appbar.Action icon="home" onPress={_handleMore} />
          </Appbar.Header>
          <Tab.Navigator style={styles.bottom1}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Make A Post" component={PostScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
        </NavigationContainer>
        :
        <View style={styles.container}>
          <LoginForm key="loginForm" setUser={setUser} setUserName={setUserName} username={username} />
        </View>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#437433"
  },
  bottom: {
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#52BA30"
  },
  bottom1: {
    position: 'relative',
    left: 0,
    right: 0,
    bottom: 0,
    color: "#52BA30"
  },

  main: {
    flex: 1,
    position: "relative",
  }
});