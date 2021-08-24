import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UserFeed from './userfeed';
import Home from './home';
import AddPost from './addPost';
import Chat from './chats';
import Message from '../../components/chat';

export const UserContext = React.createContext();

function HomeNavigator({navigation, route}) {
  const Stack = createStackNavigator();
  const token = route?.params?.token;

  return (
    <UserContext.Provider value={{token: token, userId: userId}}>
      <Stack.Navigator initialRouteName="Chat">
        <Stack.Screen
          name="UserFeed"
          component={UserFeed}
          initialParams={{token: token}}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="AddPost"
          component={AddPost}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Message"
          component={Message}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </UserContext.Provider>
  );
}

export default HomeNavigator;
