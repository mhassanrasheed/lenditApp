import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UserFeed from './userfeed';
import Home from './home';
import AddPost from './addPost';

export const UserContext = React.createContext();

function HomeNavigator({navigation, route}) {
  const Stack = createStackNavigator();
  const token = route?.params?.token;

  return (
    <UserContext.Provider value={{token: token}}>
      <Stack.Navigator initialRouteName="AddPost">
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
      </Stack.Navigator>
    </UserContext.Provider>
  );
}

export default HomeNavigator;
