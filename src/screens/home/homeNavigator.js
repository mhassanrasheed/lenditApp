import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserFeed from './userfeed';
import Home from './home';
import AddPost from './addPost';

export const UserContext = React.createContext();

function HomeNavigator({userId, token}) {
  const Stack = createStackNavigator();
  return (
    <UserContext.Provider value={{token: token, userId: userId}}>
      <Stack.Navigator initialRouteName="UserFeed">
        <Stack.Screen
          name="UserFeed"
          component={UserFeed}
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
      </Stack.Navigator>
    </UserContext.Provider>
  );
}

export default HomeNavigator;
