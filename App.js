import * as React from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import PostCards from './components/PostCards';
import MakePost from './components/MakePost';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginForm from './components/LoginForm';
import { useState } from 'react';


export default function App() {
  const [user, setUser] = useState({})
  const [username, setUserName] = useState("")
 


  function HomeScreen() {
    return (
      <SafeAreaView>
        <PostCards key="postCardsKey" />
      </SafeAreaView>
    );
  }
  function PostScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <MakePost key="postKey" user={username}/>
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
          <LoginForm key="loginForm" setUser={setUser} setUserName={setUserName} username={username}/>
        </SafeAreaView>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    position: "relative"
  }
});