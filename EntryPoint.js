import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from './src/screens/registration/signUp';
import LogIn from './src/screens/registration/logIn';
import HomeNavigator from './src/screens/home/homeNavigator';

/**
 * The first component user is redirected to when they app launches
 *
 * @export
 * @param {*} isLogged true/false
 * @return {*} loginscreen|HomeNavigator
 */
export default function EntryPoint(isLogged) {
  console.log(isLogged);
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLogged ? 'HomeNavigator' : 'Login'}>
        <Stack.Screen
          name="LogIn"
          component={LogIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeNavigator"
          component={HomeNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
